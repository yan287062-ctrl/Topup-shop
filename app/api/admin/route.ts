import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: allOrders } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    const orders = (allOrders || []).filter(
      (o: any) => o.game_id !== 'wallet_topup' && !o.game_name?.toLowerCase().includes('wallet')
    );

    const legacyTopups = (allOrders || [])
      .filter((o: any) => o.game_id === 'wallet_topup' || o.game_name?.toLowerCase().includes('wallet'))
      .map((o: any) => ({
        id: o.id,
        email: o.player_id || o.email || 'customer@gmail.com',
        amount: Number(o.price || 0),
        note: o.zone_id || '-',
        slip_url: o.slip_url,
        status: o.status || 'pending'
      }));

    const { data: directTopups } = await supabase
      .from('wallet_topups')
      .select('*')
      .order('created_at', { ascending: false });

    return NextResponse.json({
      orders: orders || [],
      topups: [...(directTopups || []), ...legacyTopups]
    });
  } catch (err: any) {
    return NextResponse.json({ orders: [], topups: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, email, amount, status } = body;

    if (action === 'update_order' && id) {
      await supabase.from('orders').update({ status }).eq('id', id);
      return NextResponse.json({ success: true });
    }

    if (action === 'update_topup' && id) {
      // 1. Topup Table / Orders Table status update
      await supabase.from('wallet_topups').update({ status }).eq('id', id);
      await supabase.from('orders').update({ status }).eq('id', id);

      // 2. Approved ဖြစ်ပါက Balance တိုးပေးခြင်း
      if (status === 'approved' && email && amount) {
        const cleanEmail = email.trim().toLowerCase();
        const topupAmt = Number(amount);

        const { data: profile } = await supabase
          .from('profiles')
          .select('wallet_balance')
          .ilike('email', cleanEmail)
          .single();

        if (profile) {
          const newBal = Number(profile.wallet_balance || 0) + topupAmt;
          await supabase
            .from('profiles')
            .update({ wallet_balance: newBal })
            .ilike('email', cleanEmail);
        } else {
          await supabase
            .from('profiles')
            .insert([{ email: cleanEmail, wallet_balance: topupAmt }]);
        }
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

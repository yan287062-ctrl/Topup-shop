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
    const action = body.action;
    const targetId = body.topupId || body.orderId || body.id;
    const status = body.status;
    let targetEmail = body.email || '';
    let topupAmount = Number(body.amount || 0);

    if (!targetId || !status) {
      return NextResponse.json({ success: false, error: 'Missing id or status' }, { status: 400 });
    }

    // Orders သို့မဟုတ် Topups table status update လုပ်ခြင်း
    await supabase.from('wallet_topups').update({ status }).eq('id', targetId);
    await supabase.from('orders').update({ status }).eq('id', targetId);

    // Email နှင့် Amount မပါလာပါက Database မှ ရှာဖွေခြင်း
    if (status === 'approved' && (!targetEmail || topupAmount <= 0)) {
      const { data: tRow } = await supabase.from('wallet_topups').select('*').eq('id', targetId).single();
      if (tRow) {
        targetEmail = tRow.email;
        topupAmount = Number(tRow.amount || 0);
      } else {
        const { data: oRow } = await supabase.from('orders').select('*').eq('id', targetId).single();
        if (oRow) {
          targetEmail = oRow.player_id || oRow.email;
          topupAmount = Number(oRow.price || 0);
        }
      }
    }

    // Approved ဖြစ်ပါက User ၏ Profiles Table ထဲ Balance ပေါင်းထည့်ပေးခြင်း
    if (status === 'approved' && targetEmail && topupAmount > 0) {
      const cleanEmail = targetEmail.trim().toLowerCase();
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .ilike('email', cleanEmail)
        .single();

      if (profile) {
        const currentBal = Number(profile.wallet_balance || 0);
        const newBal = currentBal + topupAmount;
        await supabase
          .from('profiles')
          .update({ wallet_balance: newBal, updated_at: new Date().toISOString() })
          .ilike('email', cleanEmail);
      } else {
        await supabase
          .from('profiles')
          .insert([{ email: cleanEmail, wallet_balance: topupAmount }]);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

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
        amount: o.price,
        note: o.zone_id || '-',
        slip_url: o.slip_url,
        status: o.status || 'pending',
        is_legacy: true
      }));

    const { data: directTopups } = await supabase
      .from('wallet_topups')
      .select('*')
      .order('created_at', { ascending: false });

    const topups = [...(directTopups || []), ...legacyTopups];

    return NextResponse.json({ orders: orders || [], topups: topups || [] });
  } catch (err: any) {
    return NextResponse.json({ orders: [], topups: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, orderId, topupId, status } = body;

    if (action === 'update_order' && orderId) {
      await supabase.from('orders').update({ status }).eq('id', orderId);
      return NextResponse.json({ success: true });
    }

    if (action === 'topup_action' && topupId) {
      let targetEmail = '';
      let topupAmount = 0;

      const { data: topupRow } = await supabase
        .from('wallet_topups')
        .select('*')
        .eq('id', topupId)
        .single();

      if (topupRow) {
        targetEmail = topupRow.email;
        topupAmount = Number(topupRow.amount);
        await supabase.from('wallet_topups').update({ status }).eq('id', topupId);
      } else {
        const { data: orderRow } = await supabase
          .from('orders')
          .select('*')
          .eq('id', topupId)
          .single();

        if (orderRow) {
          targetEmail = orderRow.player_id || orderRow.email;
          topupAmount = Number(orderRow.price);
          await supabase.from('orders').update({ status }).eq('id', topupId);
        }
      }

      if (status === 'approved' && targetEmail && topupAmount > 0) {
        const cleanEmail = targetEmail.trim().toLowerCase();
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .ilike('email', cleanEmail)
          .single();

        if (profile) {
          const newBal = Number(profile.wallet_balance || 0) + topupAmount;
          await supabase
            .from('profiles')
            .update({ wallet_balance: newBal })
            .ilike('email', cleanEmail);
        } else {
          await supabase
            .from('profiles')
            .insert([{ email: cleanEmail, wallet_balance: topupAmount }]);
        }
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

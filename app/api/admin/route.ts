import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: allOrders } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    // ဂိမ်းအော်ဒါ သီးသန့်ခွဲထုတ်ခြင်း
    const orders = (allOrders || []).filter(
      (o: any) => o.game_id !== 'wallet_topup' && !o.game_name?.toLowerCase().includes('wallet')
    );

    // orders table ထဲ ရောက်နေခဲ့သော Wallet ငွေဖြည့်မှုဟောင်းများကို ထုတ်ယူခြင်း
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

    // wallet_topups table မှ အသစ်တင်ထားသော ဒေတာများ
    const { data: directTopups } = await supabase
      .from('wallet_topups')
      .select('*')
      .order('created_at', { ascending: false });

    const topups = [...(directTopups || []), ...legacyTopups];

    return NextResponse.json({
      orders: orders || [],
      topups: topups || []
    });
  } catch (err: any) {
    return NextResponse.json({ orders: [], topups: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, orderId, topupId, status } = body;

    // အော်ဒါ status ပြင်ဆင်ခြင်း
    if (action === 'update_order' && orderId) {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    }

    // Wallet ငွေဖြည့် Approve / Reject လုပ်ခြင်း + Balance ပေါင်းထည့်ခြင်း
    if (action === 'topup_action' && topupId) {
      let targetEmail = '';
      let topupAmount = 0;

      // 1. wallet_topups table ထဲ စစ်ဆေးခြင်း
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
        // 2. orders table (အဟောင်း) ထဲ စစ်ဆေးခြင်း
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

      // 3. Approved ဖြစ်ပါက User ၏ Balance ထဲသို့ ငွေပေါင်းထည့်ပေးခြင်း
      if (status === 'approved' && targetEmail && topupAmount > 0) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', targetEmail)
          .single();

        if (profile) {
          const newBal = Number(profile.wallet_balance || 0) + topupAmount;
          await supabase
            .from('profiles')
            .update({ wallet_balance: newBal })
            .eq('email', targetEmail);
        } else {
          await supabase
            .from('profiles')
            .insert([{ email: targetEmail, wallet_balance: topupAmount }]);
        }
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

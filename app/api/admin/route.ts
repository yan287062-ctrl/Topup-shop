import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Orders များကို ဆွဲထုတ်ခြင်း
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    // သီးသန့် wallet_topups များကို ဆွဲထုတ်ခြင်း
    const { data: topups } = await supabase
      .from('wallet_topups')
      .select('*')
      .order('created_at', { ascending: false });

    // wallet_topups များကို မူလ Admin Panel က နားလည်သော Order format အဖြစ် ပြောင်းလဲခြင်း
    const mappedTopups = (topups || []).map((t: any) => ({
      id: t.id,
      game_name: 'Wallet Balance Topup',
      package_name: 'ငွေဖြည့် ' + t.amount + ' Ks',
      player_id: t.email,
      zone_id: '-',
      price: t.amount,
      payment_method: 'Wallet',
      status: t.status,
      created_at: t.created_at,
      slip_url: t.slip_url
    }));

    // အားလုံးပေါင်းပြီး အချိန်အလိုက် စီပေးခြင်း
    const combinedOrders = [...(orders || []), ...mappedTopups].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ orders: combinedOrders });
  } catch (err: any) {
    return NextResponse.json({ orders: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const targetId = body.orderId || body.topupId || body.id;
    const status = body.status;

    if (!targetId || !status) {
      return NextResponse.json({ success: false, error: 'Missing id or status' });
    }

    // Order ဇယား နှင့် Topup ဇယား နှစ်ခုလုံးတွင် status ပြင်ဆင်ခြင်း
    await supabase.from('orders').update({ status }).eq('id', targetId);
    await supabase.from('wallet_topups').update({ status }).eq('id', targetId);

    // လက်ခံလိုက်ပါက ငွေတိုးပေးခြင်း Logic
    if (status === 'approved') {
      let targetEmail = '';
      let topupAmount = 0;

      // အရင်ဆုံး Order ဇယားတွင် ရှာမည်
      const { data: oRow } = await supabase.from('orders').select('*').eq('id', targetId).single();
      if (oRow && (oRow.game_name?.toLowerCase().includes('wallet') || oRow.game_id === 'wallet_topup')) {
        targetEmail = oRow.player_id || oRow.email;
        topupAmount = Number(oRow.price || 0);
      } else {
        // မတွေ့ပါက Topup ဇယားတွင် ရှာမည်
        const { data: tRow } = await supabase.from('wallet_topups').select('*').eq('id', targetId).single();
        if (tRow) {
          targetEmail = tRow.email;
          topupAmount = Number(tRow.amount || 0);
        }
      }

      // ငွေတိုးပေးခြင်း
      if (targetEmail && topupAmount > 0) {
        const cleanEmail = targetEmail.trim().toLowerCase();
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .ilike('email', cleanEmail)
          .single();

        if (profile) {
          const newBal = Number(profile.wallet_balance || 0) + topupAmount;
          await supabase.from('profiles').update({ wallet_balance: newBal }).ilike('email', cleanEmail);
        } else {
          await supabase.from('profiles').insert([{ email: cleanEmail, wallet_balance: topupAmount }]);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

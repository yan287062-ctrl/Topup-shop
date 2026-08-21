import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // ဂိမ်းအော်ဒါများ
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .neq('game_id', 'wallet_topup')
      .order('created_at', { ascending: false });

    // Wallet ငွေဖြည့် တောင်းဆိုမှုများ
    const { data: topups } = await supabase
      .from('wallet_topups')
      .select('*')
      .order('created_at', { ascending: false });

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

    // Wallet ငွေဖြည့် Approve / Reject လုပ်ခြင်း
    if (action === 'topup_action' && topupId) {
      const { data: topup, error: fetchErr } = await supabase
        .from('wallet_topups')
        .select('*')
        .eq('id', topupId)
        .single();

      if (fetchErr || !topup) {
        return NextResponse.json({ success: false, error: 'Topup record not found' }, { status: 404 });
      }

      // Status ပြောင်းလဲခြင်း
      const { error: updateErr } = await supabase
        .from('wallet_topups')
        .update({ status })
        .eq('id', topupId);

      if (updateErr) return NextResponse.json({ success: false, error: updateErr.message }, { status: 500 });

      // အကယ်၍ Approved ပေးပါက User ၏ Wallet Balance ထဲသို့ ငွေပေါင်းထည့်ပေးခြင်း
      if (status === 'approved' && topup.email) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', topup.email)
          .single();

        if (profile) {
          const newBal = Number(profile.wallet_balance || 0) + Number(topup.amount);
          await supabase
            .from('profiles')
            .update({ wallet_balance: newBal })
            .eq('email', topup.email);
        } else {
          await supabase
            .from('profiles')
            .insert([{ email: topup.email, wallet_balance: Number(topup.amount) }]);
        }
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

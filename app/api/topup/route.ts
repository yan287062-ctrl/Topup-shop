import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, user_id, amount, note, slip_url } = body;

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json({ success: false, error: 'ငွေပမာဏ ထည့်သွင်းပေးပါ' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('wallet_topups')
      .insert([
        {
          email: email || user_id || 'customer@gmail.com',
          user_id: user_id || null,
          amount: Number(amount),
          note: note || '',
          slip_url: slip_url || '',
          status: 'pending'
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

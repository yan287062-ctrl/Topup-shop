import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabase = createClient(
  'https://aasncvjvjftsyhywrueo.supabase.co',
  'sb_publishable_BWPJnQPpWwysRe84oYfgAw_GinZLV98'
);

export async function GET() {
  try {
    const { data: profiles } = await supabase.from('profiles').select('*');
    const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });

    return NextResponse.json({
      profiles: profiles || [],
      orders: orders || []
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'add_balance') {
      const { profileId, amount } = body;
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', profileId)
        .single();
      
      const currentBal = Number(userProfile?.balance || 0);
      const newBal = currentBal + Number(amount);

      const { error } = await supabase
        .from('profiles')
        .upsert({ id: profileId, balance: newBal });

      if (error) throw error;
      return NextResponse.json({ success: true, newBalance: newBal });
    }

    if (action === 'update_order') {
      const { orderId, status } = body;
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'လုပ်ဆောင်ချက် မမှန်ကန်ပါ' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

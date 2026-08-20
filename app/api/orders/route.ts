import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabase = createClient(
  'https://aasncvjvjftsyhywrueo.supabase.co',
  'sb_publishable_BWPJnQPpWwysRe84oYfgAw_GinZLV98'
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { game_id, game_name, package_name, price, player_id, zone_id, payment_method, user_id, slip_url } = body;

    // Wallet ဖြင့် ဝယ်ယူလျှင် လက်ကျန်ငွေ စစ်ပြီး နှုတ်ခြင်း
    if (payment_method === 'wallet') {
      const { data: profile } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', user_id)
        .single();

      const currentBal = Number(profile?.balance || 0);
      if (currentBal < Number(price)) {
        return NextResponse.json({ error: 'Wallet ထဲတွင် လက်ကျန်ငွေ မလုံလောက်ပါ' }, { status: 400 });
      }

      await supabase
        .from('profiles')
        .update({ balance: currentBal - Number(price) })
        .eq('id', user_id);
    }

    // Order အသစ် ထည့်သွင်းခြင်း
    const { data, error } = await supabase.from('orders').insert([
      {
        game_id,
        game_name,
        package_name,
        price: Number(price),
        player_id,
        zone_id: zone_id || null,
        slip_url: slip_url || (payment_method === 'wallet' ? 'Wallet Payment' : ''),
        status: payment_method === 'wallet' ? 'completed' : 'pending',
        created_at: new Date().toISOString()
      }
    ]);

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

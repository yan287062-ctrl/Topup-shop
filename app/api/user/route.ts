import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabase = createClient(
  'https://aasncvjvjftsyhywrueo.supabase.co',
  'sb_publishable_BWPJnQPpWwysRe84oYfgAw_GinZLV98'
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');
    const email = searchParams.get('email');

    if (!userId && !email) return NextResponse.json({ balance: 0 });

    let query = supabase.from('profiles').select('balance');
    if (userId) {
      query = query.eq('id', userId);
    } else if (email) {
      query = query.eq('email', email);
    }

    const { data } = await query.maybeSingle();
    return NextResponse.json({ balance: data?.balance || 0 });
  } catch (err: any) {
    return NextResponse.json({ balance: 0 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, userId, amount, note, slipUrl } = await req.json();

    const { error } = await supabase.from('orders').insert([
      {
        game_id: 'wallet_topup',
        game_name: 'Wallet Balance Topup',
        package_name: `ငွေဖြည့်: ${Number(amount).toLocaleString()} Ks`,
        price: Number(amount),
        player_id: email || userId || 'User',
        zone_id: note || '',
        slip_url: slipUrl || '',
        status: 'pending',
        created_at: new Date().toISOString()
      }
    ]);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

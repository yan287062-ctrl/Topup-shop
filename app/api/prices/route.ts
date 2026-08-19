import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://aasncvjvjftsyhywrueo.supabase.co', 'sb_publishable_BWPJnQPpWwysRe84oYfgAw_GinZLV98');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, game_id, package_name, price } = body;
    const { data, error } = await supabase.from('prices').upsert({ id, game_id, package_name, price: Number(price) }, { onConflict: 'id' });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

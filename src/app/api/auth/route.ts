import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  'https://aasncvjvjftsyhywrueo.supabase.co',
  'sb_publishable_BWPJnQPpWwysRe84oYfgAw_GinZLV98'
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, action } = body;

    if (action === 'signup') {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ success: true, data });
    } 
    
    if (action === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ error: 'လုပ်ဆောင်ချက် မမှန်ကန်ပါ' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ success: true, balance: 0 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const { data: profile } = await supabase
      .from('profiles')
      .select('wallet_balance')
      .ilike('email', cleanEmail)
      .single();

    return NextResponse.json({
      success: true,
      balance: profile ? Number(profile.wallet_balance || 0) : 0
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, balance: 0 });
  }
}

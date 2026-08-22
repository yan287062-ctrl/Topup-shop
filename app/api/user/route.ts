import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');
    const email = searchParams.get('email');

    if (!userId && !email) {
      return NextResponse.json({ balance: 0 });
    }

    let queryUserId = userId;

    if (!queryUserId && email) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .ilike('email', email.trim().toLowerCase())
        .maybeSingle();
      
      if (profile && profile.id) {
        queryUserId = profile.id;
      }
    }

    if (queryUserId) {
      const { data, error } = await supabaseAdmin
        .from('wallets')
        .select('balance')
        .eq('user_id', queryUserId)
        .maybeSingle();

      if (!error && data) {
        return NextResponse.json({ balance: Number(data.balance || 0) });
      }
    }

    return NextResponse.json({ balance: 0 });
  } catch (err: any) {
    console.error('USER GET ERROR:', err);
    return NextResponse.json({ balance: 0 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      email,
      userId,
      amount,
      note,
      slipUrl
    } = await req.json();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'ငွေပမာဏ ထည့်သွင်းပေးပါ'
        },
        { status: 400 }
      );
    }

    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanUserId = userId || null;

    if (!cleanEmail && !cleanUserId) {
      return NextResponse.json(
        {
          success: false,
          error: 'User information မရှိပါ'
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('wallet_topups')
      .insert([
        {
          email: cleanEmail || null,
          user_id: cleanUserId,
          amount: numericAmount,
          note: note || '',
          slip_url: slipUrl || '',
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('WALLET TOPUP INSERT ERROR:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (err: any) {
    console.error('USER POST ERROR:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Server error'
      },
      { status: 500 }
    );
  }
}

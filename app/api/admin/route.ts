import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '../../../lib/supabase-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordersError) throw ordersError;

    const { data: topups, error: topupsError } = await supabase
      .from('wallet_topups')
      .select('*')
      .order('created_at', { ascending: false });

    if (topupsError) throw topupsError;

    
    return NextResponse.json({
      orders: (orders || []).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
      topups: (topups || []).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    });

  } catch (err: any) {
    console.error('ADMIN POST ERROR:', err);
    // Vercel 500 မဖြစ်အောင် status 200 နဲ့ပဲ Error အတိအကျကို ပြန်ပို့ပေးမယ်
    return NextResponse.json({
      success: false,
      error: err?.message || err?.details || err?.hint || JSON.stringify(err) || 'Unknown Server error'
    });
  }

}

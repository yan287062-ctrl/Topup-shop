import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('prices')
      .select('*');

    if (error) {
      return NextResponse.json({ success: false, data: [] }, { status: 200 });
    }
    return NextResponse.json({ success: true, data: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { game_id, packages } = body;

    if (!packages || !Array.isArray(packages)) {
      return NextResponse.json({ error: 'Invalid packages data' }, { status: 400 });
    }

    const records = packages.map((pkg: any) => ({
      id: pkg.id,
      game_id: game_id,
      package_name: pkg.name,
      price: Number(pkg.price),
      updated_at: new Date().toISOString()
    }));

    const { data, error } = await supabase
      .from('prices')
      .upsert(records, { onConflict: 'id' });

    if (error) {
      console.error('Supabase Upsert Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

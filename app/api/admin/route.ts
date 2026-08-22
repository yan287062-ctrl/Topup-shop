import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '../../../lib/supabase-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: orders, error: ordersError } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (ordersError) throw ordersError;

    const { data: topups, error: topupsError } = await supabase.from('wallet_topups').select('*').order('created_at', { ascending: false });
    if (topupsError) throw topupsError;

    const mappedTopups = (topups || []).map((t: any) => ({
      id: t.id,
      game_name: 'Wallet Balance Topup',
      package_name: 'ငွေဖြည့် ' + Number(t.amount || 0).toLocaleString() + ' Ks',
      player_id: t.email || t.user_id || '',
      zone_id: '-',
      price: Number(t.amount || 0),
      amount: Number(t.amount || 0),
      payment_method: 'Wallet',
      status: t.status,
      created_at: t.created_at,
      slip_url: t.slip_url || '',
      user_id: t.user_id || '',
      email: t.email || ''
    }));

    return NextResponse.json({
      orders: (orders || []).sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
      topups: mappedTopups.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    });
  } catch (err: any) {
    console.error('ADMIN GET ERROR:', err);
    return NextResponse.json({ success: false, orders: [], topups: [], error: err.message || 'Admin data error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action;
    const targetId = body.topupId || body.orderId || body.id;
    const status = body.status;

    if (!targetId || !status) {
      return NextResponse.json({ success: false, error: 'Missing id or status' }, { status: 400 });
    }

    // =====================================================
    // WALLET TOPUP APPROVAL LOGIC
    // =====================================================
    if (action === 'topup_action') {
      const { data: topupRow, error: topupFindError } = await supabase.from('wallet_topups').select('*').eq('id', targetId).maybeSingle();
      if (topupFindError) throw topupFindError;

      if (topupRow) {
        const oldStatus = String(topupRow.status || '').toLowerCase();
        
        if (status === 'approved' && oldStatus === 'approved') {
          return NextResponse.json({ success: true, alreadyApproved: true, message: 'Already approved. Balance was not added again.' });
        }

        // 1. Update topup status to approved
        const { error: updateError } = await supabase.from('wallet_topups').update({ status }).eq('id', targetId);
        if (updateError) throw updateError;

        // 2. Add Balance to wallets table if approved
        if (status === 'approved' && oldStatus !== 'approved') {
          const amount = Number(topupRow.amount || 0);
          const userId = topupRow.user_id; // Get exact user_id

          if (!amount || amount <= 0) throw new Error('Invalid topup amount');
          if (!userId) throw new Error('Cannot add balance: User ID is missing for this topup.');

          // Check if wallet exists
          const { data: existingWallet, error: walletFindError } = await supabase.from('wallets').select('*').eq('user_id', userId).maybeSingle();
          if (walletFindError) throw walletFindError;

          if (existingWallet) {
            // Update existing wallet balance
            const newBalance = Number(existingWallet.balance || 0) + amount;
            const { error: balanceError } = await supabase.from('wallets').update({ balance: newBalance }).eq('user_id', userId);
            if (balanceError) throw balanceError;
          } else {
            // Create new wallet for user
            const { error: insertError } = await supabase.from('wallets').insert([{ user_id: userId, balance: amount }]);
            if (insertError) throw insertError;
          }

          return NextResponse.json({ success: true, message: 'Topup approved and balance updated successfully.' });
        }
        return NextResponse.json({ success: true, message: `Topup status changed to ${status}.` });
      }
      return NextResponse.json({ success: false, error: 'Topup record not found' }, { status: 404 });
    }

    // =====================================================
    // NORMAL ORDER LOGIC
    // =====================================================
    if (action === 'update_order') {
      const { error: updateError } = await supabase.from('orders').update({ status }).eq('id', targetId);
      if (updateError) throw updateError;
      return NextResponse.json({ success: true, message: `Order status changed to ${status}.` });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });

  } catch (err: any) {
    console.error('ADMIN POST ERROR:', err);
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

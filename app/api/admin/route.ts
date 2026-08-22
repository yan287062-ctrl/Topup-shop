import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Orders GET error:', ordersError);
    }

    const { data: topups, error: topupsError } = await supabase
      .from('wallet_topups')
      .select('*')
      .order('created_at', { ascending: false });

    if (topupsError) {
      console.error('Wallet topups GET error:', topupsError);
    }

    const mappedTopups = (topups || []).map((t: any) => ({
      id: t.id,
      game_id: 'wallet_topup',
      game_name: 'Wallet Balance Topup',
      package_name: 'ငွေဖြည့် ' + Number(t.amount || 0).toLocaleString() + ' Ks',
      player_id: t.email || t.user_id || '',
      zone_id: '-',
      price: Number(t.amount || 0),
      payment_method: 'Wallet',
      status: t.status || 'pending',
      created_at: t.created_at,
      slip_url: t.slip_url || '',
      email: t.email || '',
      user_id: t.user_id || ''
    }));

    const combinedOrders = [
      ...(orders || []),
      ...mappedTopups
    ].sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    );

    return NextResponse.json({
      orders: combinedOrders
    });
  } catch (err: any) {
    console.error('Admin GET error:', err);

    return NextResponse.json(
      {
        orders: [],
        error: err.message || 'Server error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const targetId = body.orderId || body.topupId || body.id;
    const status = body.status;

    if (!targetId || !status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing id or status'
        },
        { status: 400 }
      );
    }

    const { data: topupRow } = await supabase
      .from('wallet_topups')
      .select('*')
      .eq('id', targetId)
      .maybeSingle();

    const { data: orderRow } = await supabase
      .from('orders')
      .select('*')
      .eq('id', targetId)
      .maybeSingle();

    /*
     * WALLET TOPUP
     */
    if (topupRow) {
      const oldStatus = String(
        topupRow.status || ''
      ).toLowerCase();

      // Already approved = don't add balance again
      if (status === 'approved' && oldStatus === 'approved') {
        return NextResponse.json({
          success: true,
          message: 'Already approved. Balance was not added again.'
        });
      }

      const { error: updateError } = await supabase
        .from('wallet_topups')
        .update({ status })
        .eq('id', targetId);

      if (updateError) {
        throw updateError;
      }

      /*
       * Add balance only once when status becomes approved.
       */
      if (status === 'approved' && oldStatus !== 'approved') {
        const amount = Number(topupRow.amount || 0);

        if (!amount || amount <= 0) {
          throw new Error('Invalid topup amount');
        }

        const email = String(
          topupRow.email || ''
        ).trim().toLowerCase();

        const userId = topupRow.user_id || null;

        if (!email && !userId) {
          throw new Error('Topup user information is missing');
        }

        let profile: any = null;

        // Find by user ID first
        if (userId) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

          profile = data;
        }

        // If not found, find by email
        if (!profile && email) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .ilike('email', email)
            .maybeSingle();

          profile = data;
        }

        if (profile) {
          const currentBalance = Number(
            profile.balance || 0
          );

          const newBalance =
            currentBalance + amount;

          const { error: balanceError } = await supabase
            .from('profiles')
            .update({
              balance: newBalance
            })
            .eq('id', profile.id);

          if (balanceError) {
            throw balanceError;
          }

          console.log(
            `Wallet credited: ${profile.email || profile.id} +${amount} => ${newBalance}`
          );
        } else {
          const insertData: any = {
            balance: amount
          };

          if (userId) {
            insertData.id = userId;
          }

          if (email) {
            insertData.email = email;
          }

          const { error: insertError } = await supabase
            .from('profiles')
            .insert([insertData]);

          if (insertError) {
            throw insertError;
          }

          console.log(
            `New wallet profile created: ${email || userId} +${amount}`
          );
        }
      }

      return NextResponse.json({
        success: true,
        type: 'wallet_topup',
        message:
          status === 'approved'
            ? 'Topup approved and balance updated.'
            : `Topup status changed to ${status}.`
      });
    }

    /*
     * NORMAL ORDER
     */
    if (orderRow) {
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', targetId);

      if (updateError) {
        throw updateError;
      }

      return NextResponse.json({
        success: true,
        type: 'order',
        message: `Order status changed to ${status}.`
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Order or wallet topup not found'
      },
      { status: 404 }
    );

  } catch (err: any) {
    console.error('Admin POST error:', err);

    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Server error'
      },
      { status: 500 }
    );
  }
}

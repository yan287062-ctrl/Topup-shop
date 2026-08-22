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

    if (ordersError) throw ordersError;

    const { data: topups, error: topupsError } = await supabase
      .from('wallet_topups')
      .select('*')
      .order('created_at', { ascending: false });

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
    console.error('ADMIN GET ERROR:', err);

    return NextResponse.json(
      {
        success: false,
        orders: [],
        error: err.message || 'Admin data error'
      },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const action = body.action;
    const targetId = body.topupId || body.orderId || body.id;
    const status = body.status;

    console.log('ADMIN ACTION:', {
      action,
      targetId,
      status
    });

    if (!targetId || !status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing id or status'
        },
        { status: 400 }
      );
    }


    /*
     * =====================================================
     * WALLET TOPUP
     * =====================================================
     */

    const { data: topupRow, error: topupFindError } = await supabase
      .from('wallet_topups')
      .select('*')
      .eq('id', targetId)
      .maybeSingle();

    if (topupFindError) {
      throw topupFindError;
    }


    if (topupRow) {

      const oldStatus = String(
        topupRow.status || ''
      ).toLowerCase();

      console.log('TOPUP FOUND:', topupRow);


      /*
       * Already approved
       */

      if (
        status === 'approved' &&
        oldStatus === 'approved'
      ) {
        return NextResponse.json({
          success: true,
          alreadyApproved: true,
          message: 'Already approved. Balance was not added again.'
        });
      }


      /*
       * Update topup status
       */

      const { error: updateError } = await supabase
        .from('wallet_topups')
        .update({
          status
        })
        .eq('id', targetId);

      if (updateError) {
        throw updateError;
      }


      /*
       * Only add balance when APPROVED
       */

      if (
        status === 'approved' &&
        oldStatus !== 'approved'
      ) {

        const amount = Number(topupRow.amount || 0);

        if (!amount || amount <= 0) {
          throw new Error(
            'Invalid topup amount: ' + topupRow.amount
          );
        }


        const email = String(
          topupRow.email || ''
        ).trim().toLowerCase();

        const userId =
          topupRow.user_id || null;


        console.log('CREDIT USER:', {
          userId,
          email,
          amount
        });


        /*
         * Find profile by USER ID first
         */

        let profile: any = null;

        if (userId) {

          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

          if (error) {
            throw error;
          }

          profile = data;
        }


        /*
         * If not found, find by EMAIL
         */

        if (!profile && email) {

          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .ilike('email', email)
            .maybeSingle();

          if (error) {
            throw error;
          }

          profile = data;
        }


        /*
         * UPDATE EXISTING PROFILE
         */

        if (profile) {

          const currentBalance = Number(
            profile.balance || 0
          );

          const newBalance =
            currentBalance + amount;


          console.log('BALANCE UPDATE:', {
            profileId: profile.id,
            email: profile.email,
            oldBalance: currentBalance,
            addAmount: amount,
            newBalance
          });


          const { data: updatedProfile, error: balanceError } =
            await supabase
              .from('profiles')
              .update({
                balance: newBalance
              })
              .eq('id', profile.id)
              .select('*')
              .single();


          if (balanceError) {
            throw balanceError;
          }


          console.log(
            'BALANCE UPDATED SUCCESSFULLY:',
            updatedProfile
          );


          return NextResponse.json({
            success: true,
            type: 'wallet_topup',
            balance: Number(
              updatedProfile.balance || 0
            ),
            amount,
            message: 'Topup approved and balance updated.'
          });
        }


        /*
         * PROFILE DOES NOT EXIST
         */

        const insertData: any = {
          balance: amount
        };

        if (userId) {
          insertData.id = userId;
        }

        if (email) {
          insertData.email = email;
        }


        console.log(
          'CREATING NEW PROFILE:',
          insertData
        );


        const { data: newProfile, error: insertError } =
          await supabase
            .from('profiles')
            .insert([insertData])
            .select('*')
            .single();


        if (insertError) {
          throw insertError;
        }


        console.log(
          'NEW PROFILE CREATED:',
          newProfile
        );


        return NextResponse.json({
          success: true,
          type: 'wallet_topup',
          balance: Number(
            newProfile.balance || 0
          ),
          amount,
          message: 'Topup approved and new balance created.'
        });
      }


      return NextResponse.json({
        success: true,
        type: 'wallet_topup',
        message:
          status === 'approved'
            ? 'Topup approved.'
            : `Topup status changed to ${status}.`
      });
    }


    /*
     * =====================================================
     * NORMAL ORDER
     * =====================================================
     */

    const { data: orderRow, error: orderFindError } =
      await supabase
        .from('orders')
        .select('*')
        .eq('id', targetId)
        .maybeSingle();

    if (orderFindError) {
      throw orderFindError;
    }


    if (orderRow) {

      const { error: updateError } =
        await supabase
          .from('orders')
          .update({
            status
          })
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

    console.error(
      'ADMIN POST ERROR:',
      err
    );

    return NextResponse.json(
      {
        success: false,
        error:
          err?.message ||
          'Server error'
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category_id, offer_id, fields } = body;

    // .env.local ထဲက API Key ကို ခေါ်သုံးတာပါ
    const apiKey = process.env.FAZERCARDS_API_KEY;

    if (!apiKey) {
      console.error("API Key မရှိပါဘူး။ Environment Variables စစ်ပါ။");
      return NextResponse.json({ error: 'API Key မရှိပါဘူး' }, { status: 500 });
    }

    if (!category_id || !offer_id || !fields) {
      console.error("အချက်အလက် မပြည့်စုံပါ:", { category_id, offer_id, fields });
      return NextResponse.json({ error: 'အချက်အလက် မပြည့်စုံပါ' }, { status: 400 });
    }

    console.log("FazerCards သို့ Order ပို့နေပါသည်...", { category_id, offer_id, fields });

    // FazerCards သို့ Auto Order လှမ်းတင်ခြင်း
    const response = await fetch('https://api.fzr.cards/api/v2/topups/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        category_id: category_id,
        offer_id: offer_id,
        fields: fields 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("FazerCards API Error:", data);
      // data.error ကိုပါ ထည့်ရေးထားလို့ ဘာမှားလဲဆိုတာ ပိုသိသာသွားပါမယ်
      return NextResponse.json({ error: data.error || data.message || 'API Error အမှားအယွင်းဖြစ်နေပါသည်' }, { status: response.status });
    }

    console.log("Order အောင်မြင်ပါသည်:", data);
    return NextResponse.json({ success: true, data: data }, { status: 200 });

  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
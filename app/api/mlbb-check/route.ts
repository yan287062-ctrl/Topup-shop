import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const zoneId = searchParams.get('zoneId');

    if (!userId || !zoneId) {
      return NextResponse.json({ error: 'User ID နှင့် Zone ID ထည့်သွင်းပါ' }, { status: 400 });
    }

    // Smile.one Server သို့ MLBB In-Game Name လှမ်းစစ်ခြင်း
    const formData = new URLSearchParams();
    formData.append('user_id', userId);
    formData.append('zone_id', zoneId);
    formData.append('pid', '26');
    formData.append('checkrole', '1');

    const res = await fetch('https://www.smile.one/merchant/mobilelegends/checkrole', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      body: formData.toString(),
      cache: 'no-store'
    });

    const data = await res.json();

    if (data && (data.username || data.name)) {
      const username = decodeURIComponent(data.username || data.name);
      return NextResponse.json({
        success: true,
        name: username,
        doubleBonusEligible: true // First Recharge Bonus
      });
    }

    // Backup API ဖြင့် ထပ်မံစစ်ဆေးခြင်း
    const backupRes = await fetch(`https://api.isan.eu.org/api/game/ml?id=${userId}&zone=${zoneId}`, { cache: 'no-store' });
    const backupData = await backupRes.json();

    if (backupData && backupData.data && backupData.data.name) {
      return NextResponse.json({
        success: true,
        name: backupData.data.name,
        doubleBonusEligible: true
      });
    }

    return NextResponse.json({ error: 'User ID သို့မဟုတ် Zone ID မှားယွင်းနေပါသည်' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: 'အကောင့်စစ်ဆေး၍ မရပါ' }, { status: 500 });
  }
}

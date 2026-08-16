import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const gameName = formData.get('gameName');
    const userId = formData.get('userId');
    const zoneId = formData.get('zoneId') || 'N/A';
    const packageName = formData.get('packageName');
    const price = formData.get('price');
    const paymentMethod = formData.get('paymentMethod');
    const slipFile = formData.get('slip') as File;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ success: false, error: 'Telegram keys not found' }, { status: 500 });
    }

    const caption = `🔥 **အော်ဒါအသစ် ရောက်ရှိပါသည်။** 🔥\n\n` +
      `🎮 **Game:** ${gameName}\n` +
      `👤 **User ID:** \`${userId}\`\n` +
      `🌐 **Zone ID:** \`${zoneId}\`\n` +
      `💎 **Package:** ${packageName}\n` +
      `💰 **Price:** ${price} Ks\n` +
      `💳 **Payment:** ${paymentMethod}\n\n` +
      `⏰ **Time:** ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Yangon' })}`;

    const tgFormData = new FormData();
    tgFormData.append('chat_id', chatId);
    tgFormData.append('caption', caption);
    tgFormData.append('parse_mode', 'Markdown');
    if (slipFile) {
      tgFormData.append('photo', slipFile);
    }

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
      method: 'POST',
      body: tgFormData,
    });

    const data = await response.json();

    if (!data.ok) {
      return NextResponse.json({ success: false, error: data.description }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'အော်ဒါ အောင်မြင်စွာ ပို့ပြီးပါပြီ။' });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

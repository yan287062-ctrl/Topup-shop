'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const BOT_TOKEN = '8916421457:AAFu5PmrlTX-czip1Hub8TLqVR8TWRvQiW4';
const CHAT_ID = '1934339791';

const GAMES = [
  { id: 'mlbb', name: 'Mobile Legends: Bang Bang', image: '/mlbb.jpg' },
  { id: 'pubg', name: 'PUBG Mobile UC', image: '/pubg.jpg' },
  { id: 'pubg_uc_pack', name: 'PUBG UC PACK', image: '/pubg.jpg' },
  { id: 'telegram', name: 'Telegram Star & Premium', image: '/telegram.jpg' },
  { id: 'heartopia', name: 'Heartopia', image: '/heartopia.jpg' },
];

const INITIAL_PACKAGES: Record<string, { id: string; name: string; price: number }[]> = {
  mlbb: [
    { id: 'mlbb_1', name: '55 Diamonds', price: 3461 },
    { id: 'mlbb_2', name: '165 Diamonds', price: 10372 },
    { id: 'mlbb_3', name: '275 Diamonds', price: 16636 },
    { id: 'mlbb_4', name: '565 Diamonds', price: 34160 },
    { id: 'mlbb_5', name: 'Weekly Pass', price: 6600 },
    { id: 'mlbb_6', name: 'Weekly Pass x 2', price: 13200 },
    { id: 'mlbb_7', name: 'Weekly Pass x 3', price: 19800 },
    { id: 'mlbb_8', name: 'Weekly Pass x 4', price: 26400 },
    { id: 'mlbb_9', name: 'Weekly Pass x 5', price: 33000 },
    { id: 'mlbb_10', name: 'Twilight Pass', price: 35712 },
    { id: 'mlbb_11', name: 'Weekly Elite Bundle', price: 3461 },
    { id: 'mlbb_12', name: 'Monthly Epic Bundle', price: 17434 },
    { id: 'mlbb_13', name: '86 Diamonds', price: 5457 },
    { id: 'mlbb_14', name: '172 Diamonds', price: 10824 },
    { id: 'mlbb_15', name: '257 Diamonds', price: 15678 },
    { id: 'mlbb_16', name: '343 Diamonds', price: 21134 },
    { id: 'mlbb_17', name: '429 Diamonds', price: 26502 },
    { id: 'mlbb_18', name: '514 Diamonds', price: 31355 },
    { id: 'mlbb_19', name: '600 Diamonds', price: 36812 },
    { id: 'mlbb_20', name: '705 Diamonds', price: 42588 },
    { id: 'mlbb_21', name: '792 Diamonds', price: 48045 },
    { id: 'mlbb_22', name: '878 Diamonds', price: 53412 },
    { id: 'mlbb_23', name: '963 Diamonds', price: 58266 },
    { id: 'mlbb_24', name: '1049 Diamonds', price: 63722 },
    { id: 'mlbb_25', name: '1135 Diamonds', price: 69090 },
    { id: 'mlbb_26', name: '1220 Diamonds', price: 73943 },
    { id: 'mlbb_27', name: '1412 Diamonds', price: 85176 },
    { id: 'mlbb_28', name: '1584 Diamonds', price: 96000 },
    { id: 'mlbb_29', name: '1669 Diamonds', price: 100854 },
    { id: 'mlbb_30', name: '1755 Diamonds', price: 106310 },
    { id: 'mlbb_31', name: '1841 Diamonds', price: 111678 },
    { id: 'mlbb_32', name: '2195 Diamonds', price: 128918 },
    { id: 'mlbb_33', name: '2538 Diamonds', price: 150052 },
    { id: 'mlbb_34', name: '2901 Diamonds', price: 171506 },
    { id: 'mlbb_35', name: '3073 Diamonds', price: 182330 },
    { id: 'mlbb_36', name: '3688 Diamonds', price: 215069 },
    { id: 'mlbb_37', name: '3945 Diamonds', price: 230747 },
    { id: 'mlbb_38', name: '4031 Diamonds', price: 236204 },
    { id: 'mlbb_39', name: '4566 Diamonds', price: 268482 },
    { id: 'mlbb_40', name: '5100 Diamonds', price: 300245 },
    { id: 'mlbb_41', name: '5532 Diamonds', price: 324734 },
    { id: 'mlbb_42', name: '6055 Diamonds', price: 354812 },
    { id: 'mlbb_43', name: '6752 Diamonds', price: 398677 },
    { id: 'mlbb_44', name: '7030 Diamonds', price: 415366 },
    { id: 'mlbb_45', name: '7727 Diamonds', price: 453651 },
    { id: 'mlbb_46', name: '9288 Diamonds', price: 539360 },
  ],
  pubg: [
    { id: 'pubg_1', name: '60 UC', price: 4106 },
    { id: 'pubg_2', name: '325 UC', price: 20529 },
    { id: 'pubg_3', name: '660 UC', price: 41059 },
    { id: 'pubg_4', name: '985 UC', price: 61588 },
    { id: 'pubg_5', name: '1320 UC', price: 82118 },
    { id: 'pubg_6', name: '1980 UC', price: 123177 },
    { id: 'pubg_7', name: '2310 UC', price: 143706 },
    { id: 'pubg_8', name: '2640 UC', price: 164236 },
    { id: 'pubg_9', name: '3850 UC', price: 239512 },
    { id: 'pubg_10', name: '4180 UC', price: 260041 },
    { id: 'pubg_11', name: '5900 UC', price: 367277 },
    { id: 'pubg_12', name: '8100 UC', price: 504112 },
    { id: 'pubg_13', name: 'Royale Pass Upgrade', price: 27885 },
    { id: 'pubg_14', name: 'Royale Pass Upgrade Plus', price: 73906 },
  ],
  pubg_uc_pack: [
    { id: 'p_pack_1', name: 'First Purchase Pack', price: 4059 },
    { id: 'p_pack_2', name: 'Prime (1 Month)', price: 4059 },
    { id: 'p_pack_3', name: 'Weekly Deal Pack 1', price: 4119 },
    { id: 'p_pack_4', name: 'Prime (3 Months)', price: 12179 },
    { id: 'p_pack_5', name: 'Upgradable Firearm Materials Pack', price: 12160 },
    { id: 'p_pack_6', name: 'Weekly Deal Pack 2', price: 12401 },
    { id: 'p_pack_7', name: 'Weekly Mythic Emblem Value Pack', price: 12401 },
    { id: 'p_pack_8', name: 'Mythic Emblem Pack', price: 20247 },
    { id: 'p_pack_9', name: 'Prime (6 Months)', price: 24358 },
    { id: 'p_pack_10', name: 'Elite Pass LV1-50', price: 24450 },
    { id: 'p_pack_11', name: 'Prime Plus (1 Month)', price: 40596 },
    { id: 'p_pack_12', name: 'Prime (12 Months)', price: 48715 },
    { id: 'p_pack_13', name: 'Elite Pass LV1-100', price: 49324 },
    { id: 'p_pack_14', name: 'Prime Plus (3 Months)', price: 121787 },
    { id: 'p_pack_15', name: 'Prime Plus (6 Months)', price: 239885 },
    { id: 'p_pack_16', name: 'Prime Plus (12 Months)', price: 484384 },
  ],
  telegram: [
    { id: 'tg_1', name: '50 Stars', price: 3552 },
    { id: 'tg_2', name: '75 Stars', price: 5306 },
    { id: 'tg_3', name: '100 Stars', price: 7058 },
    { id: 'tg_4', name: '150 Stars', price: 10587 },
    { id: 'tg_5', name: '250 Stars', price: 17645 },
    { id: 'tg_6', name: '350 Stars', price: 24703 },
    { id: 'tg_7', name: '500 Stars', price: 35291 },
    { id: 'tg_8', name: '750 Stars', price: 52936 },
    { id: 'tg_9', name: '1K Stars', price: 70582 },
    { id: 'tg_10', name: '1.5K Stars', price: 105873 },
    { id: 'tg_11', name: '2.5K Stars', price: 176454 },
    { id: 'tg_12', name: '5K Stars', price: 352908 },
    { id: 'tg_13', name: '10K Stars', price: 705816 },
    { id: 'tg_14', name: '3 months premium', price: 56420 },
    { id: 'tg_15', name: '6 months premium', price: 75241 },
    { id: 'tg_16', name: '12 months premium', price: 136412 },
  ],
  heartopia: [
    { id: 'heart_1', name: '20 Heart Diamond', price: 2588 },
    { id: 'heart_2', name: '60 Heart Diamond', price: 4895 },
    { id: 'heart_3', name: '300+20 Heart Diamond', price: 24846 },
    { id: 'heart_4', name: '680+50 Heart Diamond', price: 55994 },
    { id: 'heart_5', name: '1280+90 Heart Diamond', price: 102297 },
    { id: 'heart_6', name: '1980+150 Heart Diamond', price: 155703 },
    { id: 'heart_7', name: '3280+270 Heart Diamond', price: 253623 },
    { id: 'heart_8', name: '6480+570 Heart Diamond', price: 498398 },
    { id: 'heart_9', name: 'GAMG Junior Membership', price: 2681 },
    { id: 'heart_10', name: 'GAMG Formal Membership', price: 15057 },
    { id: 'heart_11', name: 'Fashionwave Gift Box', price: 24846 },
    { id: 'heart_12', name: 'Fashionwave Gift Box Upgrade', price: 31102 },
    { id: 'heart_13', name: 'Premium Fashionwave Gift Box', price: 55994 },
  ]
};

const LIVE_PURCHASES = [
  { user: 'Ko***Na', item: '55 Diamonds', time: 'လွန်ခဲ့သော 2 မိနစ်က' },
  { user: 'Kyaw***Oo', item: '60 UC', time: 'လွန်ခဲ့သော 5 မိနစ်က' },
  { user: 'Su***Mon', item: 'Weekly Pass', time: 'လွန်ခဲ့သော 8 မိနစ်က' },
  { user: 'Aung***Min', item: '100 Stars', time: 'လွန်ခဲ့သော 12 မိနစ်က' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'shop' | 'categories' | 'search' | 'wallet' | 'login' | 'mlbb_check'>('shop');
  const [selectedGame, setSelectedGame] = useState<typeof GAMES[0] | null>(null);
  
  const [balance, setBalance] = useState(0);
  const [currentAuthUser, setCurrentAuthUser] = useState<any>(null);

  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authMsg, setAuthMsg] = useState('');

  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [selectedPkg, setSelectedPkg] = useState<{ id: string; name: string; price: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'slip' | 'wallet'>('slip');
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const [userNotification, setUserNotification] = useState<string | null>(null);

  const [checkMlbbId, setCheckMlbbId] = useState('');
  const [checkMlbbZone, setCheckMlbbZone] = useState('');
  const [mlbbCheckResult, setMlbbCheckResult] = useState<{ name?: string; error?: string } | null>(null);
  const [checkingMlbb, setCheckingMlbb] = useState(false);

  const [topupAmount, setTopupAmount] = useState('');
  const [topupSlip, setTopupSlip] = useState<File | null>(null);
  const [topupNote, setTopupNote] = useState('');
  const [topupLoading, setTopupLoading] = useState(false);

  useEffect(() => {
    fetchPricesFromDB();
    fetchUserBalance();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentAuthUser(session.user);
        fetchUserBalance();
      } else {
        setCurrentAuthUser(null);
        setBalance(0);
      }
    });

    const orderSubscription = supabase
      .channel('orders-realtime-notification')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        if (payload.new && payload.new.status === 'completed') {
          if (userId && payload.new.player_id === userId) {
            setUserNotification('🎉 ငွေဖြည့်ပြီးပါပြီ! သင့်အော်ဒါ အောင်မြင်စွာ ဆောင်ရွက်ပြီးပါပြီ။');
          }
          fetchUserBalance();
        }
      })
      .subscribe();

    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(orderSubscription);
    };
  }, [userId]);

  const fetchUserBalance = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentAuthUser(user);
      const { data } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', user.id)
        .single();
      if (data) setBalance(data.balance || 0);
    }
  };

  const fetchPricesFromDB = async () => {
    const { data } = await supabase.from('prices').select('*');
    if (data && data.length > 0) {
      const grouped: Record<string, any[]> = {};
      data.forEach((item) => {
        if (!grouped[item.game_id]) grouped[item.game_id] = [];
        grouped[item.game_id].push({ id: item.id, name: item.package_name, price: item.price });
      });
      setPackages(prev => ({ ...prev, ...grouped }));
    }
  };

  const handleMlbbCheck = async (e?: React.FormEvent, targetId?: string, targetZone?: string) => {
    if (e) e.preventDefault();
    const id = targetId || checkMlbbId || userId;
    const zone = targetZone || checkMlbbZone || zoneId;

    if (!id || !zone) {
      setMlbbCheckResult({ error: 'User ID နှင့် Zone ID ရိုက်ထည့်ပါ' });
      return;
    }

    setCheckingMlbb(true);
    setMlbbCheckResult(null);

    setTimeout(() => {
      setCheckingMlbb(false);
      setMlbbCheckResult({ name: `Verified_Gamer_${id} (${zone})` });
    }, 800);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthMsg('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        setAuthMsg('✅ အကောင့်သစ် အောင်မြင်စွာ ဖွင့်ပြီးပါပြီ!');
        if (data.user) setCurrentAuthUser(data.user);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        setAuthMsg('✅ Login အောင်မြင်စွာ ဝင်ပြီးပါပြီ!');
        if (data.user) setCurrentAuthUser(data.user);
      }
      fetchUserBalance();
      setTimeout(() => setActiveTab('shop'), 1000);
    } catch (err: any) {
      setAuthMsg('❌ အမှား ဖြစ်ပွားပါသည်: ' + (err.message || 'Error occurred'));
    } fontally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentAuthUser(null);
    setBalance(0);
    alert('Logged out successful');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGame || !userId || !selectedPkg) {
      alert('အချက်အလက်များကို အပြည့်အစုံ ဖြည့်သွင်းပေးပါ။');
      return;
    }

    if (paymentMethod === 'slip' && !slipFile) {
      alert('ကျေးဇူးပြု၍ ငွေလွှဲစလစ် (Slip) ပုံတင်ပေးပါ။');
      return;
    }

    setLoading(true);
    setStatusMsg('');

    try {
      let slipUrl = 'Wallet Balance Payment';

      if (paymentMethod === 'wallet') {
        if (!currentAuthUser) {
          alert('Wallet ဖြင့် ဝယ်ယူရန် အရင်ဆုံး Login ဝင်ပေးပါ');
          setActiveTab('login');
          setLoading(false);
          return;
        }

        if (balance < selectedPkg.price) {
          alert('Wallet ထဲတွင် လက်ကျန်ငွေ မလုံလောက်ပါ။ ကျေးဇူးပြု၍ ငွေကြိုဖြည့်ပါ။');
          setLoading(false);
          return;
        }

        const newBalance = balance - selectedPkg.price;
        const { error: balanceError } = await supabase
          .from('profiles')
          .update({ balance: newBalance })
          .eq('id', currentAuthUser.id);

        if (balanceError) throw balanceError;

        setBalance(newBalance);
      } else {
        const fileExt = slipFile!.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('slips')
          .upload(fileName, slipFile!);

        if (uploadError) throw uploadError;

        const { data: publicURLData } = supabase.storage
          .from('slips')
          .getPublicUrl(fileName);

        slipUrl = publicURLData.publicUrl;
      }

      const { error } = await supabase.from('orders').insert([
        {
          game_id: selectedGame.id,
          game_name: selectedGame.name,
          package_name: selectedPkg.name,
          price: selectedPkg.price,
          player_id: userId,
          zone_id: zoneId || null,
          slip_url: slipUrl,
          status: paymentMethod === 'wallet' ? 'completed' : 'pending',
        },
      ]);

      if (error) throw error;

      const caption = `🚨 𝗔𝗱𝗺𝗶𝗻 - အော်ဒါအသစ်ဝင်လာပါပြီ! (${paymentMethod === 'wallet' ? '💳 Wallet Payment' : '🧾 Slip Upload'})\n\n` +
        `🎮 ဂိမ်း: ${selectedGame.name}\n` +
        `📦 ပက်ကေ့ဂျ်: ${selectedPkg.name} (${selectedPkg.price.toLocaleString()} Ks)\n` +
        `👤 User ID: ${userId}\n` +
        `🏷️ Zone ID: ${zoneId || '-'}\n` +
        `⏰ အချိန်: ${new Date().toLocaleString()}`;

      if (paymentMethod === 'wallet' || !slipFile) {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text: caption }),
        });
      } else {
        const formData = new FormData();
        formData.append('chat_id', CHAT_ID);
        formData.append('photo', slipFile);
        formData.append('caption', caption);

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
          method: 'POST',
          body: formData,
        });
      }

      setStatusMsg('✅ အော်ဒါ အောင်မြင်စွာ တင်ပြီးပါပြီ!');
      setUserId('');
      setZoneId('');
      setSelectedPkg(null);
      setSlipFile(null);
    } catch (err: any) {
      alert('အော်ဒါ တင်၍မရပါ: ' + (err.message || 'Error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId) return;
    setSearching(true);
    const { data } = await supabase.from('orders').select('*').eq('player_id', searchOrderId).order('created_at', { ascending: false });
    if (data) setSearchResults(data);
    setSearching(false);
  };

  const handleTopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAuthUser) {
      alert('ငွေဖြည့်ရန် အရင်ဆုံး Login ဝင်ပေးပါ');
      setActiveTab('login');
      return;
    }
    if (!topupAmount || !topupSlip) {
      alert('ပမာဏနှင့် ငွေလွှဲစလစ်ပုံ ထည့်သွင်းပေးပါ။');
      return;
    }
    setTopupLoading(true);
    try {
      const fileExt = topupSlip.name.split('.').pop();
      const fileName = `topup_${Date.now()}.${fileExt}`;
      await supabase.storage.from('slips').upload(fileName, topupSlip);

      const caption = `💰 𝗔𝗱𝗺𝗶𝗻 - ငွေဖြည့်တောင်းဆိုမှု အသစ်!\n\n` +
        `👤 User Auth ID: ${currentAuthUser.id}\n` +
        `📧 Email: ${currentAuthUser.email}\n` +
        `💵 ပမာဏ: ${Number(topupAmount).toLocaleString()} Ks\n` +
        `📝 မှတ်ချက်: ${topupNote || '-'}\n` +
        `⏰ အချိန်: ${new Date().toLocaleString()}`;

      const formData = new FormData();
      formData.append('chat_id', CHAT_ID);
      formData.append('photo', topupSlip);
      formData.append('caption', caption);

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: formData,
      });

      alert('✅ ငွေဖြည့်တောင်းဆိုချက် ပို့ပြီးပါပြီ! Admin မှ စစ်ဆေးပြီး Wallet Balance ထည့်ပေးပါမည်။');
      setTopupAmount('');
      setTopupSlip(null);
      setTopupNote('');
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setTopupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1b30] text-white font-sans pb-12 relative overflow-hidden">
      {/* Background Glow Accents (Liquid Glass Feel) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C0CAFF]/10 rounded-full blur-[120px] pointer-events-none"></div>

      {userNotification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#C0CAFF]/90 backdrop-blur-md text-[#1A3054] px-6 py-3.5 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/40 flex items-center gap-3 animate-bounce">
          <span className="text-xl">🔔</span>
          <span className="font-extrabold text-xs">{userNotification}</span>
          <button 
            onClick={() => setUserNotification(null)}
            className="ml-2 font-bold bg-[#1A3054] text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navbar & Header with Liquid Glassmorphism */}
      <div className="bg-[#1A3054]/80 backdrop-blur-xl border-b border-[#C0CAFF]/20 py-2.5 px-4 flex justify-between items-center text-xs shadow-lg">
        <div className="flex items-center gap-2 font-bold text-[#C0CAFF] drop-shadow">
          <span>🌟</span> <span>Paing Gyi Game Store - Official Platform</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#0e1b30]/60 backdrop-blur px-3 py-1 rounded-full border border-[#C0CAFF]/30 text-white shadow-inner">
            ⭐ သစ္စာရှိကုမ္ပဏီ / 24/7 အမြန်ဆုံးဝန်ဆောင်မှု
          </span>
        </div>
      </div>

      <div className="bg-[#0e1b30]/60 backdrop-blur border-b border-[#C0CAFF]/20 py-2 px-4 text-xs text-[#C0CAFF] overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-pulse">
          📢 ငွေဖြည့်ချိန် ၅ မိနစ်အတွင်း အကောင့်ထဲ ရောက်ပါမည်... Paing Gyi shop မှ ကြိုဆိုပါသည်။ လူကြီးမင်းတို့၏ ဂိမ်းအကောင့်အချက်အလက်များကို မှန်ကန်စွာ ဖြည့်သွင်းပေးပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။ 📢
        </div>
      </div>

      <header className="bg-[#1A3054]/70 backdrop-blur-2xl border-b border-[#C0CAFF]/20 sticky top-0 z-40 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('shop'); setSelectedGame(null); }}>
            {selectedGame && activeTab === 'shop' && (
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedGame(null); setStatusMsg(''); }}
                className="text-[#C0CAFF] text-xs font-bold bg-[#0e1b30]/60 backdrop-blur hover:bg-[#C0CAFF] hover:text-[#1A3054] px-3 py-1.5 rounded-2xl border border-[#C0CAFF]/40 transition-all shadow-inner"
              >
                ← နောက်သို့
              </button>
            )}
            <img 
              src="/logo.jpg" 
              alt="Paing Gyi shop Logo" 
              className="w-10 h-10 object-cover rounded-2xl border-2 border-[#C0CAFF]/80 shadow-[0_0_15px_rgba(192,202,255,0.4)]" 
            />
            <h1 className="text-lg font-bold tracking-wide text-white drop-shadow">
              Paing Gyi <span className="text-[#C0CAFF]">shop</span>
            </h1>
          </div>
          
          <div className="flex gap-1.5 flex-wrap justify-end">
            <button onClick={() => { setActiveTab('shop'); setSelectedGame(null); }} className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-inner ${activeTab === 'shop' ? 'bg-[#C0CAFF] text-[#1A3054] shadow-[0_0_15px_rgba(192,202,255,0.5)]' : 'bg-[#1A3054]/50 backdrop-blur text-gray-300 border border-[#C0CAFF]/30 hover:border-[#C0CAFF]'}`}>ပင်မစာမျက်နှာ</button>
            <button onClick={() => setActiveTab('categories')} className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-inner ${activeTab === 'categories' ? 'bg-[#C0CAFF] text-[#1A3054] shadow-[0_0_15px_rgba(192,202,255,0.5)]' : 'bg-[#1A3054]/50 backdrop-blur text-gray-300 border border-[#C0CAFF]/30 hover:border-[#C0CAFF]'}`}>အမျိုးအစားများ</button>
            <button onClick={() => setActiveTab('search')} className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-inner ${activeTab === 'search' ? 'bg-[#C0CAFF] text-[#1A3054] shadow-[0_0_15px_rgba(192,202,255,0.5)]' : 'bg-[#1A3054]/50 backdrop-blur text-gray-300 border border-[#C0CAFF]/30 hover:border-[#C0CAFF]'}`}>အော်ဒါရှာမည်</button>
            <button onClick={() => setActiveTab('mlbb_check')} className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-inner ${activeTab === 'mlbb_check' ? 'bg-[#C0CAFF] text-[#1A3054] shadow-[0_0_15px_rgba(192,202,255,0.5)]' : 'bg-[#1A3054]/50 backdrop-blur text-gray-300 border border-[#C0CAFF]/30 hover:border-[#C0CAFF]'}`}>MLBB စစ်ဆေးမည်</button>
            <button onClick={() => setActiveTab('wallet')} className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-inner ${activeTab === 'wallet' ? 'bg-[#C0CAFF] text-[#1A3054] shadow-[0_0_15px_rgba(192,202,255,0.5)]' : 'bg-[#1A3054]/50 backdrop-blur text-gray-300 border border-[#C0CAFF]/30 hover:border-[#C0CAFF]'}`}>Wallet ({balance.toLocaleString()} Ks)</button>
            
            {currentAuthUser ? (
              <button onClick={handleLogout} className="px-3 py-1.5 rounded-2xl text-xs font-bold bg-rose-600/80 backdrop-blur text-white border border-rose-700 shadow-inner">Logout</button>
            ) : (
              <button onClick={() => setActiveTab('login')} className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-inner ${activeTab === 'login' ? 'bg-[#C0CAFF] text-[#1A3054] shadow-[0_0_15px_rgba(192,202,255,0.5)]' : 'bg-[#1A3054]/50 backdrop-blur text-gray-300 border border-[#C0CAFF]/30 hover:border-[#C0CAFF]'}`}>ဝင်ရောက်မည်</button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto mt-6 px-4 relative z-10">
        {activeTab === 'mlbb_check' && (
          <div className="bg-[#1A3054]/60 backdrop-blur-2xl p-6 rounded-3xl border border-[#C0CAFF]/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] max-w-md mx-auto space-y-4">
            <div className="text-center">
              <span className="text-3xl drop-shadow">🎮</span>
              <h2 className="text-lg font-bold text-white mt-1 drop-shadow">MLBB User ID စစ်ဆေးရန်</h2>
              <p className="text-xs text-[#C0CAFF]">In-Game Name မှန်မမှန် အလိုအလျောက် စစ်ဆေးပေးပါသည်။</p>
            </div>

            <form onSubmit={handleMlbbCheck} className="space-y-3">
              <div>
                <label className="text-xs text-gray-300 font-semibold block mb-1">User ID</label>
                <input
                  type="text"
                  placeholder="ဥပမာ - 12345678"
                  value={checkMlbbId}
                  onChange={(e) => setCheckMlbbId(e.target.value)}
                  className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 p-3 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C0CAFF] shadow-inner"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 font-semibold block mb-1">Zone ID</label>
                <input
                  type="text"
                  placeholder="ဥပမာ - 1234"
                  value={checkMlbbZone}
                  onChange={(e) => setCheckMlbbZone(e.target.value)}
                  className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 p-3 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C0CAFF] shadow-inner"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={checkingMlbb}
                className="w-full bg-[#C0CAFF] hover:bg-white text-[#1A3054] font-bold py-3 rounded-2xl transition shadow-[0_0_20px_rgba(192,202,255,0.4)] text-xs"
              >
                {checkingMlbb ? 'စစ်ဆေးနေပါသည်...' : 'စစ်ဆေးမည်'}
              </button>
            </form>

            {mlbbCheckResult && (
              <div className="p-3.5 rounded-2xl border bg-[#0e1b30]/80 backdrop-blur border-[#C0CAFF]/40 text-center text-xs font-semibold shadow-inner">
                {mlbbCheckResult.name ? (
                  <p className="text-[#C0CAFF]">
                    ✅ အကောင့်အမည်: <span className="text-white font-bold">{mlbbCheckResult.name}</span>
                  </p>
                ) : (
                  <p className="text-rose-400">⚠️ {mlbbCheckResult.error}</p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'search' && (
          <div className="bg-[#1A3054]/60 backdrop-blur-2xl p-6 rounded-3xl border border-[#C0CAFF]/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] max-w-md mx-auto space-y-4">
            <h2 className="text-lg font-extrabold text-white text-center drop-shadow">🔎 အော်ဒါအခြေအနေ ရှာဖွေမည်</h2>
            <form onSubmit={handleSearchOrder} className="space-y-3">
              <input
                type="text"
                placeholder="ဂိမ်း User ID ရိုက်ထည့်ပါ..."
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 p-3 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C0CAFF] shadow-inner"
                required
              />
              <button
                type="submit"
                disabled={searching}
                className="w-full bg-[#C0CAFF] hover:bg-white text-[#1A3054] font-bold py-3 rounded-2xl transition shadow-[0_0_20px_rgba(192,202,255,0.4)] text-xs"
              >
                {searching ? 'ရှာဖွေနေပါသည်...' : 'အော်ဒါရှာမည်'}
              </button>
            </form>

            <div className="space-y-2 mt-4">
              {searchResults.map((res) => (
                <div key={res.id} className="p-3 bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/20 rounded-2xl text-xs shadow-inner">
                  <p className="font-bold text-white">{res.game_name} - {res.package_name}</p>
                  <p className="text-[#C0CAFF] mt-1">ကျသင့်ငွေ: {res.price.toLocaleString()} Ks</p>
                  <p className="text-gray-400 mt-0.5">Status: <span className={`font-bold ${res.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}>{res.status.toUpperCase()}</span></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#C0CAFF] drop-shadow">🎮 ဂိမ်းအမျိုးအစားများ</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {GAMES.map((game) => (
                <div
                  key={game.id}
                  onClick={() => { setSelectedGame(game); setActiveTab('shop'); }}
                  className="bg-[#1A3054]/60 backdrop-blur-xl border border-[#C0CAFF]/20 hover:border-[#C0CAFF] rounded-3xl p-4 cursor-pointer text-center flex flex-col items-center justify-center space-y-3 group shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all hover:scale-105"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#C0CAFF]/40 group-hover:border-[#C0CAFF] bg-[#0e1b30] shadow-inner">
                    <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-xs font-semibold text-white group-hover:text-[#C0CAFF] px-1">{game.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'login' && (
          <div className="bg-[#1A3054]/60 backdrop-blur-2xl p-6 rounded-3xl border border-[#C0CAFF]/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] max-w-md mx-auto space-y-4 my-8">
            <h2 className="text-lg font-extrabold text-white text-center drop-shadow">
              {isSignUp ? 'အကောင့်သစ် ပြုလုပ်ရန်' : 'အကောင့်သို့ ဝင်ရောက်မည်'}
            </h2>
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 p-3 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C0CAFF] shadow-inner"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 p-3 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C0CAFF] shadow-inner"
                  required
                />
              </div>

              {authMsg && (
                <p className="text-xs text-center font-bold text-[#C0CAFF] mt-2">{authMsg}</p>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#C0CAFF] hover:bg-white text-[#1A3054] font-bold py-3 rounded-2xl transition-all text-xs shadow-[0_0_20px_rgba(192,202,255,0.4)] mt-2"
              >
                {authLoading ? 'လုပ်ဆောင်နေပါသည်...' : (isSignUp ? 'အကောင့်သစ် ဖွင့်မည်' : 'ဝင်ရောက်မည်')}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-[#C0CAFF]/20">
              <button
                onClick={() => { setIsSignUp(!isSignUp); setAuthMsg(''); }}
                className="text-xs text-[#C0CAFF] font-bold underline"
              >
                {isSignUp ? 'အကောင့်ရှိပြီးသားလား? Login ဝင်ပါ' : 'အကောင့်မရှိသေးဘူးလား? အကောင့်သစ်ဖွင့်ပါ'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          !selectedGame ? (
            <div className="space-y-6">
              {/* Banner with Glassmorphism */}
              <div className="bg-gradient-to-r from-[#1A3054]/80 to-[#0e1b30]/80 backdrop-blur-2xl text-white p-6 rounded-3xl border border-[#C0CAFF]/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex justify-between items-center relative overflow-hidden">
                <div className="relative z-10">
                  <span className="bg-[#C0CAFF] text-[#1A3054] font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-inner">⭐ VIP GAME STORE</span>
                  <h2 className="text-xl font-bold mt-2 text-white drop-shadow">ယုံကြည်စိတ်ချရဆုံးနှင့် ဈေးနှုန်းအသက်သာဆုံး</h2>
                  <p className="text-xs text-[#C0CAFF] mt-1">24 နာရီပတ်လုံး အော်ဒါများကို အလိုအလျောက်နှင့် အမြန်ဆုံး ဖြည့်သွင်းပေးနေပါပြီ။</p>
                </div>
                <div className="text-right bg-[#0e1b30]/80 backdrop-blur p-3 rounded-2xl border border-[#C0CAFF]/30 relative z-10 shrink-0 shadow-inner">
                  <p className="text-[10px] text-gray-300">Wallet Balance</p>
                  <p className="text-lg font-black text-[#C0CAFF] drop-shadow">{balance.toLocaleString()} Ks</p>
                </div>
              </div>

              {/* Live Purchases Bar */}
              <div className="bg-[#1A3054]/40 backdrop-blur-xl border border-[#C0CAFF]/20 p-3 rounded-2xl flex items-center justify-between text-xs overflow-x-auto gap-4 shadow-inner">
                <div className="flex items-center gap-2 text-[#C0CAFF] font-bold shrink-0">
                  <span>🔥 တိုက်ရိုက်ဝယ်ယူမှုများ:</span>
                </div>
                <div className="flex items-center gap-6 whitespace-nowrap animate-pulse text-gray-300">
                  {LIVE_PURCHASES.map((p, i) => (
                    <span key={i} className="bg-[#0e1b30]/80 backdrop-blur px-3 py-1 rounded-xl border border-[#C0CAFF]/20 shadow-inner">
                      👤 <strong className="text-white">{p.user}</strong> ဝယ်ယူခဲ့သည် - <span className="text-[#C0CAFF] font-bold">{p.item}</span> ({p.time})
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#C0CAFF] flex items-center gap-2 mb-4 drop-shadow">🎮 ရရှိနိုင်သော ဂိမ်းများနှင့် ဝန်ဆောင်မှုများ</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  {GAMES.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className="bg-[#1A3054]/60 backdrop-blur-xl border border-[#C0CAFF]/20 hover:border-[#C0CAFF] rounded-3xl p-4 cursor-pointer text-center flex flex-col items-center justify-center space-y-3 group shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all hover:scale-105"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#C0CAFF]/40 group-hover:border-[#C0CAFF] bg-[#0e1b30] shadow-inner">
                        <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <p className="text-xs font-semibold text-white group-hover:text-[#C0CAFF] px-1">{game.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[#1A3054]/60 backdrop-blur-2xl p-4 rounded-3xl border border-[#C0CAFF]/30 flex items-center gap-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#C0CAFF]/40 shrink-0 bg-[#0e1b30] shadow-inner">
                  <img src={selectedGame.image} alt={selectedGame.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white drop-shadow">{selectedGame.name}</h2>
                  <p className="text-xs text-[#C0CAFF]">ဂိမ်း ID ဖြည့်သွင်းပြီး စိန်/UC များ ဝယ်ယူပါ</p>
                </div>
              </div>

              {/* Step 1 */}
              <div className="bg-[#1A3054]/60 backdrop-blur-2xl p-5 rounded-3xl border border-[#C0CAFF]/30 space-y-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#C0CAFF] text-[#1A3054] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-inner">1</span>
                    <h3 className="text-sm font-semibold text-white">
                      {selectedGame.id === 'pubg' || selectedGame.id === 'pubg_uc_pack' ? 'PUBG Mobile ID ဖြည့်သွင်းရန်' : 'အကောင့်အချက်အလက်'}
                    </h3>
                  </div>
                  {selectedGame.id === 'mlbb' && (
                    <button
                      type="button"
                      onClick={(e) => handleMlbbCheck(e, userId, zoneId)}
                      className="text-[11px] bg-[#C0CAFF]/20 text-[#C0CAFF] border border-[#C0CAFF]/40 px-2.5 py-1 rounded-xl hover:bg-[#C0CAFF] hover:text-[#1A3054] transition shadow-inner"
                    >
                      🔍 ID စစ်မည်
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder={selectedGame.id === 'pubg' || selectedGame.id === 'pubg_uc_pack' ? 'PUBG Character ID' : 'User ID'}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 rounded-2xl p-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C0CAFF] shadow-inner"
                    required
                  />
                  {selectedGame.id !== 'pubg' && selectedGame.id !== 'pubg_uc_pack' && (
                    <input
                      type="text"
                      placeholder="Zone ID (optional)"
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 rounded-2xl p-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C0CAFF] shadow-inner"
                    />
                  )}
                </div>

                {mlbbCheckResult && selectedGame.id === 'mlbb' && (
                  <div className="p-2.5 rounded-2xl bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 text-xs text-center text-[#C0CAFF] shadow-inner">
                    {mlbbCheckResult.name ? `✅ ${mlbbCheckResult.name}` : `⚠️ ${mlbbCheckResult.error}`}
                  </div>
                )}
              </div>

              {/* Step 2 */}
              <div className="bg-[#1A3054]/60 backdrop-blur-2xl p-5 rounded-3xl border border-[#C0CAFF]/30 space-y-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#C0CAFF] text-[#1A3054] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-inner">2</span>
                  <h3 className="text-sm font-semibold text-white">ပက်ကေ့ဂျ် ရွေးချယ်ပါ</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
                  {(packages[selectedGame.id] || []).map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkg(pkg)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between shadow-inner ${
                        selectedPkg?.id === pkg.id ? 'border-[#C0CAFF] bg-[#C0CAFF]/20 backdrop-blur shadow-[0_0_15px_rgba(192,202,255,0.3)] ring-2 ring-[#C0CAFF]' : 'border-[#C0CAFF]/20 bg-[#0e1b30]/80 backdrop-blur'
                      }`}
                    >
                      <p className="text-xs font-semibold text-white">{pkg.name}</p>
                      <p className="text-xs font-bold text-[#C0CAFF] mt-2">{pkg.price.toLocaleString()} Ks</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#1A3054]/60 backdrop-blur-2xl p-5 rounded-3xl border border-[#C0CAFF]/30 space-y-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#C0CAFF] text-[#1A3054] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-inner">3</span>
                  <h3 className="text-sm font-semibold text-white">ငွေပေးချေမှု နည်းလမ်း</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left shadow-inner ${
                      paymentMethod === 'wallet'
                        ? 'border-[#C0CAFF] bg-[#C0CAFF] text-[#1A3054] shadow-[0_0_15px_rgba(192,202,255,0.4)]'
                        : 'border-[#C0CAFF]/30 bg-[#0e1b30]/80 backdrop-blur text-gray-300'
                    }`}
                  >
                    💳 Wallet Balance
                    <span className="block text-[10px] font-normal opacity-90 mt-0.5">လက်ကျန်: {balance.toLocaleString()} Ks</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('slip')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left shadow-inner ${
                      paymentMethod === 'slip'
                        ? 'border-[#C0CAFF] bg-[#C0CAFF] text-[#1A3054] shadow-[0_0_15px_rgba(192,202,255,0.4)]'
                        : 'border-[#C0CAFF]/30 bg-[#0e1b30]/80 backdrop-blur text-gray-300'
                    }`}
                  >
                    🧾 Direct Slip Upload
                    <span className="block text-[10px] font-normal opacity-90 mt-0.5">ငွေလွှဲစလစ် တင်မည်</span>
                  </button>
                </div>

                {paymentMethod === 'slip' ? (
                  <>
                    <div className="p-3 bg-[#0e1b30]/80 backdrop-blur rounded-2xl border border-[#C0CAFF]/30 text-xs text-[#C0CAFF] shadow-inner">
                      💳 **Pay (U Ye Paing Oo):** 09967241357 (Paing Gyi shop)
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSlipFile(e.target.files[0]);
                        }
                      }}
                      className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 rounded-2xl p-3 text-xs text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C0CAFF] file:text-[#1A3054] shadow-inner"
                      required
                    />
                  </>
                ) : (
                  <div className="p-3.5 bg-[#0e1b30]/80 backdrop-blur rounded-2xl border border-[#C0CAFF]/30 text-xs text-[#C0CAFF] space-y-1 shadow-inner">
                    <p className="font-bold">✨ Wallet Balance ဖြင့် တိုက်ရိုက် ဝယ်ယူမည်</p>
                    <p className="text-[11px] text-gray-300">
                      ကျသင့်ငွေ: <strong>{selectedPkg ? selectedPkg.price.toLocaleString() : 0} Ks</strong> | 
                      လက်ကျန်ငွေ: <strong>{balance.toLocaleString()} Ks</strong>
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C0CAFF] hover:bg-white text-[#1A3054] font-bold py-3.5 rounded-3xl transition-all disabled:opacity-50 text-sm shadow-[0_0_25px_rgba(192,202,255,0.4)]"
              >
                {loading ? 'အော်ဒါ ပို့နေပါသည်...' : (paymentMethod === 'wallet' ? 'Wallet ဖြင့် တိုက်ရိုက် ဝယ်ယူမည်' : 'ယခု ဝယ်ယူမည်')}
              </button>

              {statusMsg && (
                <div className="p-3 text-center text-xs rounded-2xl bg-[#1A3054]/80 backdrop-blur border border-[#C0CAFF] text-[#C0CAFF] font-semibold shadow-inner">
                  {statusMsg}
                </div>
              )}
            </form>
          )
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <div className="bg-[#1A3054]/60 backdrop-blur-2xl text-white p-6 rounded-3xl border border-[#C0CAFF]/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <h3 className="text-sm text-gray-300">လက်ရှိလက်ကျန်ငွေ</h3>
              <p className="text-3xl font-extrabold text-[#C0CAFF] mt-1 drop-shadow">{balance.toLocaleString()} Ks</p>
            </div>

            <div className="bg-[#1A3054]/60 backdrop-blur-2xl p-5 rounded-3xl border border-[#C0CAFF]/30 space-y-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <h3 className="text-sm font-bold text-[#C0CAFF] flex items-center gap-2 drop-shadow">💳 ငွေလွှဲပေးချေမှု</h3>
              
              {[
                { name: 'Wave', num: '09967241357', owner: 'U Ye Paing Oo', image: '/wave.jpg' },
                { name: 'K pay', num: '09967241357', owner: 'U Ye Paing Oo', image: '/kpay.jpg' },
                { name: 'AYA PAY', num: '09967241357', owner: 'U Ye Paing Oo', image: '/ayapay.jpg' },
                { name: 'UAB Pay', num: '09967241357', owner: 'U Ye Paing Oo', image: '/uabpay.jpg' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3.5 bg-[#0e1b30]/80 backdrop-blur rounded-2xl border border-[#C0CAFF]/20 hover:border-[#C0CAFF] transition-all shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#1A3054] border border-[#C0CAFF]/30 shrink-0 flex items-center justify-center shadow-inner">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{item.name}</p>
                      <p className="text-[11px] text-gray-400 font-medium">{item.owner}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono font-bold text-[#C0CAFF]">{item.num}</p>
                    <span className="text-[10px] text-[#1A3054] bg-[#C0CAFF] px-2 py-0.5 rounded-xl font-bold shadow-inner">ငွေလွှဲရန်</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleTopupSubmit} className="bg-[#1A3054]/60 backdrop-blur-2xl p-6 rounded-3xl border border-[#C0CAFF]/30 space-y-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <h3 className="text-sm font-bold text-[#C0CAFF] drop-shadow">ငွေဖြည့်တောင်းဆိုရန်</h3>
              <input 
                type="number" 
                placeholder="ပမာဏ (Ks) - ဥပမာ 10000" 
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 p-4 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C0CAFF] shadow-inner" 
                required
              />
              
              <div className="border-2 border-dashed border-[#C0CAFF]/30 p-6 rounded-2xl text-center cursor-pointer bg-[#0e1b30]/80 backdrop-blur shadow-inner">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setTopupSlip(e.target.files[0]);
                    }
                  }}
                  className="w-full text-xs text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C0CAFF] file:text-[#1A3054]"
                  required
                />
                <p className="text-[10px] text-gray-400 mt-2">ငွေလွှဲစလစ်ပုံ တင်ပါ (Max 5MB)</p>
              </div>

              <textarea 
                placeholder="မှတ်ချက် (ရွေးချယ်ရန်) - မိမိပြောလိုသည့် မှတ်ချက်များ..." 
                value={topupNote}
                onChange={(e) => setTopupNote(e.target.value)}
                className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 p-4 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C0CAFF] h-24 shadow-inner" 
              />
              
              <button 
                type="submit"
                disabled={topupLoading}
                className="w-full bg-[#C0CAFF] hover:bg-white text-[#1A3054] font-bold py-3.5 rounded-2xl transition-all text-sm disabled:opacity-50 shadow-[0_0_20px_rgba(192,202,255,0.4)]"
              >
                {topupLoading ? 'ပို့ဆောင်နေပါသည်...' : 'တောင်းဆိုချက်တင်မည်'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

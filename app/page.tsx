'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';

const INITIAL_PACKAGES: Record<string, { id: string; name: string; price: number }[]> = {
  mlbb: [
    { id: 'mlbb_1', name: '55 Diamonds', price: 3300 },
    { id: 'mlbb_2', name: '165 Diamonds', price: 10372 },
    { id: 'mlbb_3', name: '275 Diamonds', price: 16636 },
    { id: 'mlbb_4', name: '565 Diamonds', price: 34160 },
    { id: 'mlbb_5', name: 'Weekly Pass', price: 6350 },
    { id: 'mlbb_6', name: 'Weekly Pass x 2', price: 13200 },
    { id: 'mlbb_7', name: 'Weekly Pass x 3', price: 19800 },
    { id: 'mlbb_8', name: 'Weekly Pass x 4', price: 26400 },
    { id: 'mlbb_9', name: 'Weekly Pass x 5', price: 33000 },
    { id: 'mlbb_10', name: 'Twilight Pass', price: 35712 },
    { id: 'mlbb_11', name: 'Weekly Elite Bundle', price: 3461 },
    { id: 'mlbb_12', name: 'Monthly Epic Bundle', price: 17434 },
    { id: 'mlbb_13', name: '86 Diamonds', price: 5150 },
    { id: 'mlbb_14', name: '172 Diamonds', price: 10824 },
    { id: 'mlbb_15', name: '257 Diamonds', price: 14900 },
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
    { id: 'mlbb_46', name: '9288 Diamonds', price: 539360 }
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
    { id: 'pubg_14', name: 'Royale Pass Upgrade Plus', price: 73906 }
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
    { id: 'p_pack_16', name: 'Prime Plus (12 Months)', price: 484384 }
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
    { id: 'tg_16', name: '12 months premium', price: 136412 }
  ],
    smile_coin: [
    { id: 'sc_1', name: 'SC 300', price: 26500 },
    { id: 'sc_2', name: 'SC 1k', price: 82500 },
    { id: 'sc_3', name: 'SC 5k', price: 412500 },
    { id: 'sc_4', name: 'SC 10k', price: 820000 }
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
    { id: 'heart_13', name: 'Premium Fashionwave Gift Box', price: 55994 }
  ]
};

const GAMES = [
  { 
    id: 'mlbb', 
    name: 'Mobile Legends: Bang Bang', 
    category: 'Game Topup', 
    image: '/games/mlbb.png' 
  },
  { 
    id: 'pubg', 
    name: 'PUBG Mobile', 
    category: 'Game Topup', 
    image: '/games/pubg.png' 
  },
  { 
    id: 'pubg_uc_pack', 
    name: 'PUBG UC Pack & Pass', 
    category: 'Game Topup', 
    image: '/games/pubg_uc.png' 
  },
  { 
    id: 'telegram', 
    name: 'Telegram Stars & Premium', 
    category: 'Social App', 
    image: '/games/telegram.png' 
  },
    { 
    id: 'smile_coin', 
    name: 'Smile Coin', 
    category: 'Game Currency', 
    image: '/games/smile_coin.png' 
  },
  { 
    id: 'heartopia', 
    name: 'Heartopia', 
    category: 'Game Topup', 
    image: '/games/heartopia.png' 
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'shop' | 'search' | 'mlbb_check' | 'wallet' | 'login'>('shop');
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'slip'>('wallet');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // MLBB Checker
  const [checkMlbbId, setCheckMlbbId] = useState('');
  const [checkMlbbZone, setCheckMlbbZone] = useState('');
  const [checkingMlbb, setCheckingMlbb] = useState(false);
  const [mlbbCheckResult, setMlbbCheckResult] = useState<any>(null);

  // Auth & Balance
  const [currentAuthUser, setCurrentAuthUser] = useState<any>(null);
  const [balance, setBalance] = useState<number>(0);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authMsg, setAuthMsg] = useState('');

  // Search Orders
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  // Wallet Topup
  const [topupAmount, setTopupAmount] = useState('');
  const [topupNote, setTopupNote] = useState('');
  const [topupLoading, setTopupLoading] = useState(false);
  const [orderSlip, setOrderSlip] = useState('');
  const [walletSlip, setWalletSlip] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchPricesFromDB = async () => {
    try {
      const res = await fetch('/api/prices', { cache: 'no-store' });
      const data = await res.json();
      if (data && data.data && data.data.length > 0) {
        const grouped: Record<string, any[]> = {};
        data.data.forEach((item: any) => {
          if (!grouped[item.game_id]) grouped[item.game_id] = [];
          grouped[item.game_id].push({ id: item.id, name: item.package_name, price: item.price });
        });
        setPackages(prev => ({ ...prev, ...grouped }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUserBalance = async (userObj = currentAuthUser) => {
    if (!userObj) return;
    try {
      const res = await fetch('/api/user?id=' + userObj.id + '&email=' + (userObj.email || ''), { cache: 'no-store' });
      const json = await res.json();
      if (json && typeof json.balance === 'number') {
        setBalance(json.balance);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPricesFromDB();
    const savedUser = localStorage.getItem('pg_shop_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentAuthUser(user);
        fetchUserBalance(user);
      } catch (e) {}
    }
  }, []);

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

    try {
      const res = await fetch('/api/mlbb-check?userId=' + id + '&zoneId=' + zone);
      const result = await res.json();

      if (res.ok && result.success) {
        setMlbbCheckResult({
          name: result.name + ' (' + zone + ') - ✨ 2x Bonus ရရှိနိုင်',
        });
      } else {
        setMlbbCheckResult({ error: result.error || 'အကောင့် ရှာမတွေ့ပါ' });
      }
    } catch (err) {
      setMlbbCheckResult({ error: 'စစ်ဆေးမှု မအောင်မြင်ပါ' });
    } finally {
      setCheckingMlbb(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthMsg('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: authEmail,
          password: authPassword,
          action: isSignUp ? 'signup' : 'login',
        }),
      });

      const result = await res.json();
      if (!res.ok || result.error) {
        throw new Error(result.error || 'လုပ်ဆောင်မှု မအောင်မြင်ပါ');
      }

      const userData = result.data?.user || { id: authEmail, email: authEmail };
      setCurrentAuthUser(userData);
      localStorage.setItem('pg_shop_user', JSON.stringify(userData));

      if (isSignUp) {
        setAuthMsg('✅ အကောင့်သစ် အောင်မြင်စွာ ဖွင့်ပြီးပါပြီ!');
      } else {
        setAuthMsg('✅ Login အောင်မြင်စွာ ဝင်ပြီးပါပြီ!');
      }

      fetchUserBalance(userData);
      setTimeout(() => setActiveTab('shop'), 1000);
    } catch (err: any) {
      setAuthMsg('❌ အမှား ဖြစ်ပွားပါသည်: ' + (err.message || err));
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pg_shop_user');
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

    if (paymentMethod === 'wallet' && !currentAuthUser) {
      alert('Wallet ဖြင့် ဝယ်ယူရန် အရင်ဆုံး Login ဝင်ပေးပါ');
      setActiveTab('login');
      return;
    }

    setLoading(true);
    setStatusMsg('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: selectedGame.id,
          game_name: selectedGame.name,
          package_name: selectedPkg.name,
          price: selectedPkg.price,
          player_id: userId,
          zone_id: zoneId,
          payment_method: paymentMethod,
          user_id: currentAuthUser?.id || currentAuthUser?.email,
          slip_url: paymentMethod === 'wallet' ? 'Wallet Payment' : (orderSlip || 'Direct Slip Upload'),
        }),
      });

      const result = await res.json();
      if (!res.ok || result.error) {
        throw new Error(result.error || 'အော်ဒါတင်ခြင်း မအောင်မြင်ပါ');
      }

      setStatusMsg('✅ အော်ဒါ အောင်မြင်စွာ တင်ပြီးပါပြီ!');
      if (paymentMethod === 'wallet') {
        fetchUserBalance();
      }
    } catch (err: any) {
      setStatusMsg('❌ အမှားဖြစ်သွားပါသည်: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId) return;
    setSearching(true);
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      if (data.orders) {
        const found = data.orders.filter((o: any) => o.player_id === searchOrderId);
        setSearchResults(found);
      }
    } catch (e) {
      console.error(e);
    }
    setSearching(false);
  };

  const handleTopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAuthUser) {
      alert('ငွေဖြည့်ရန် အရင်ဆုံး Login ဝင်ပေးပါ');
      setActiveTab('login');
      return;
    }
    if (!topupAmount || Number(topupAmount) <= 0) {
      alert('ဖြည့်သွင်းမည့် ငွေပမာဏ ထည့်ပါ');
      return;
    }

    setTopupLoading(true);
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentAuthUser.id,
          email: currentAuthUser.email,
          amount: Number(topupAmount),
          note: topupNote,
          slipUrl: walletSlip || 'Slip Uploaded',
        }),
      });
      const result = await res.json();
      if (result.success) {
        alert('✅ ငွေဖြည့်တောင်းဆိုမှု အောင်မြင်ပါသည်။ Admin စစ်ဆေးပြီးပါက လက်ကျန်ငွေ တိုးပေးပါမည်။');
        setTopupAmount('');
        setTopupNote('');
      } else {
        alert('အမှားဖြစ်သွားပါသည်: ' + result.error);
      }
    } catch (err: any) {
      alert('အမှားဖြစ်သွားပါသည်: ' + err.message);
    } finally {
      setTopupLoading(false);
    }
  };

  return (
    <div className="glass-wrapper  min-h-screen     text-gray-100 font-sans pb-12">
      {/* Top Banner */}
      <div className="bg-[#111e33] border-b border-blue-900/40 px-6 py-3 text-sm flex justify-between items-center text-blue-200">
        <span className="font-semibold">🌟 Paing Gyi Game Store - Official Platform</span>
        <span className="text-yellow-400">⭐️ သစ္စာရှိကုမ္ပဏီ / 24/7 အမြန်ဆုံးဝန်ဆောင်မှု</span>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Navbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111e33]/90 backdrop-blur-md p-4 rounded-2xl border border-blue-900/50">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelectedGame(null); setActiveTab('shop'); }}>
            <div className=" w-11 h-11 rounded-full overflow-hidden bg-[#0a1220] border-2 border-blue-400/60 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="font-bold text-white text-base">Paing Gyi <span className="text-pink-400">shop</span></h1>
            </div>
          </div>

          <div className=" flex flex-wrap gap-2 text-sm">
            <button onClick={() => { setSelectedGame(null); setActiveTab('shop'); }} className={'px-5 py-2.5 rounded-xl border transition ' + (activeTab === 'shop' ? 'bg-pink-500 text-white border-blue-500' : 'bg-[#0a1220] border-gray-800 text-gray-300')}>ပင်မစာမျက်နှာ</button>
            <button onClick={() => setActiveTab('search')} className={'px-5 py-2.5 rounded-xl border transition ' + (activeTab === 'search' ? 'bg-pink-500 text-white border-blue-500' : 'bg-[#0a1220] border-gray-800 text-gray-300')}>ဘောက်ချာရှာမည်</button>
            <button onClick={() => setActiveTab('mlbb_check')} className={'px-5 py-2.5 rounded-xl border transition ' + (activeTab === 'mlbb_check' ? 'bg-pink-500 text-white border-blue-500' : 'bg-[#0a1220] border-gray-800 text-gray-300')}>MLBB စစ်ဆေးမည်</button>
            <button onClick={() => setActiveTab('wallet')} className={'px-5 py-2.5 rounded-xl border transition ' + (activeTab === 'wallet' ? 'bg-yellow-600 text-white border-yellow-500' : 'bg-[#0a1220] border-gray-800 text-yellow-400 font-bold')}>Wallet ({balance.toLocaleString()} Ks)</button>
            {currentAuthUser ? (
              <button onClick={handleLogout} className="bg-red-600/80 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl transition">Logout</button>
            ) : (
              <button onClick={() => setActiveTab('login')} className="bg-pink-500 hover:bg-pink-400 text-white px-5 py-2.5 rounded-xl transition font-medium">ဝင်ရောက်မည်</button>
            )}
          </div>
        </div>

        {/* Tab: Shop / Game Select */}
        {activeTab === 'shop' && !selectedGame && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">ရရှိနိုင်သော ဂိမ်းနှင့် ဝန်ဆောင်မှုများ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {GAMES.map(game => (
                <div
                  key={game.id}
                  onClick={() => { setSelectedGame(game); setSelectedPkg(null); setMlbbCheckResult(null); }}
                  className="bg-[#111e33] border border-blue-900/40 hover:border-blue-500/80 p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-blue-950/80 border border-blue-800/50 flex-shrink-0 flex items-center justify-center p-1 group-hover:border-blue-400 transition-colors">
                    {game.image ? (
                      <img src={game.image} alt={game.name} className="w-full h-full object-contain rounded-xl"  />
                    ) : (
                      <span className="text-2xl">🎮</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-pink-400 transition-colors">{game.name}</h3>
                    
            

<p className="text-[11px] text-gray-400">{game.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Game Detail / Purchase */}
        {activeTab === 'shop' && selectedGame && (
          <div className="space-y-6">
            <button onClick={() => setSelectedGame(null)} className="text-xs bg-[#111e33] border border-gray-800 text-gray-300 px-4 py-2 rounded-xl hover:bg-gray-800 transition">
              ← နောက်သို့
            </button>

            <div className="bg-[#111e33] p-4 rounded-2xl border border-blue-900/40 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-blue-950/80 border border-blue-800/50 flex-shrink-0 flex items-center justify-center p-1">
                {selectedGame.image ? (
                  <img src={selectedGame.image} alt={selectedGame.name} className="w-full h-full object-contain rounded-xl"  />
                ) : (
                  <span className="text-2xl">🎮</span>
                )}
              </div>
              <div>
                <h2 className="font-bold text-white text-base">{selectedGame.name}</h2>
                <p className="text-xs text-gray-400">ဂိမ်း ID ဖြည့်သွင်းပြီး စိန်/UC များ ဝယ်ယူပါ</p>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-[#111e33] p-5 rounded-2xl border border-blue-900/40 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-200">❶ အကောင့်အချက်အလက်</span>
                {selectedGame.id === 'mlbb' && (
                  <button
                    onClick={() => handleMlbbCheck(undefined, userId, zoneId)}
                    disabled={checkingMlbb}
                    className="text-[11px] bg-pink-500/80 hover:bg-pink-500 text-white px-3 py-1 rounded-lg transition"
                  >
                    {checkingMlbb ? 'စစ်နေသည်...' : '🔍 ID စစ်မည်'}
                  </button>
                )}
              </div>

              {selectedGame.id === 'smile_coin' ? (
                <div>
                  <input
                    type="text"
                    placeholder="Telegram name ထည့်ရန် (ဥပမာ - @username သို့မဟုတ် နာမည်)"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    className="w-full bg-[#0a1220] border border-blue-500/50 p-3.5 rounded-xl text-xs text-white outline-none focus:border-blue-400 placeholder:text-gray-400 shadow-inner"
                    required
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    className="bg-[#0a1220] border border-gray-700 p-3 rounded-xl text-xs text-white outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Zone ID (optional)"
                    value={zoneId}
                    onChange={e => setZoneId(e.target.value)}
                    className="bg-[#0a1220] border border-gray-700 p-3 rounded-xl text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {mlbbCheckResult && (
                <div className={'p-3 rounded-xl text-xs font-semibold ' + (mlbbCheckResult.error ? 'bg-red-900/40 text-red-400 border border-red-800' : 'bg-green-900/40 text-green-300 border border-green-800')}>
                  {mlbbCheckResult.error ? '❌ ' + mlbbCheckResult.error : '✅ အကောင့်အမည်: ' + mlbbCheckResult.name}
                </div>
              )}
            </div>

            {/* Packages */}
            <div className="bg-[#111e33] p-5 rounded-2xl border border-blue-900/40 space-y-3">
              <span className="text-xs font-bold text-gray-200">❷ ပက်ကေ့ဂျ် ရွေးချယ်ပါ</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(packages[selectedGame.id] || []).map((pkg: any) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg)}
                    className={'p-3 rounded-xl border cursor-pointer transition text-center ' + (selectedPkg?.id === pkg.id ? 'bg-pink-500/30 border-blue-400 shadow-md shadow-blue-500/20' : 'bg-[#0a1220] border-gray-800 hover:border-gray-700')}
                  >
                    <p className="text-xs font-bold text-white">{pkg.name}</p>
                    <p className="text-xs text-yellow-400 font-semibold mt-1">{pkg.price.toLocaleString()} Ks</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#111e33] p-5 rounded-2xl border border-blue-900/40 space-y-4">
              <span className="text-xs font-bold text-gray-200">❸ ငွေပေးချေမှု နည်းလမ်း</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={'p-3 rounded-xl border text-xs font-bold transition text-left ' + (paymentMethod === 'wallet' ? 'bg-pink-500/30 border-blue-400' : 'bg-[#0a1220] border-gray-800 text-gray-400')}
                >
                  💳 Wallet Balance
                  <p className="text-[10px] font-normal text-yellow-400 mt-1">လက်ကျန်: {balance.toLocaleString()} Ks</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('slip')}
                  className={'p-3 rounded-xl border text-xs font-bold transition text-left ' + (paymentMethod === 'slip' ? 'bg-pink-500/30 border-blue-400' : 'bg-[#0a1220] border-gray-800 text-gray-400')}
                >
                  🧾 Direct Slip Upload
                  <p className="text-[10px] font-normal text-gray-400 mt-1">ငွေလွှဲစလစ် တင်မည်</p>
                </button>
              </div>

              {paymentMethod === 'slip' && (
                <div className="p-3.5 bg-[#0a1220] border border-dashed border-blue-500/50 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300 font-semibold">🧾 ငွေလွှဲပြေစာ (Slip) ပုံတင်ပါ:</span>
                    {orderSlip && <span className="text-green-400 font-bold">✅ ပုံရွေးချယ်ပြီး</span>}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setOrderSlip)}
                    className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-blue-500 cursor-pointer"
                    required
                  />
                  {orderSlip && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-700 mt-2">
                      <img src={orderSlip} alt="Order Slip Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}

              {statusMsg && (
                <div className={'p-3 rounded-xl text-xs font-semibold ' + (statusMsg.includes('✅') ? 'bg-green-900/40 text-green-300 border border-green-800' : 'bg-red-900/40 text-red-400 border border-red-800')}>
                  {statusMsg}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-400 text-white font-bold py-3.5 rounded-xl transition disabled:opacity-50 text-sm shadow-lg shadow-blue-600/30"
              >
                {loading ? 'ဆောင်ရွက်နေပါသည်...' : 'ယခု ဝယ်ယူမည်'}
              </button>
            </div>
          </div>
        )}

        {/* Tab: MLBB Checker Tab */}
        {activeTab === 'mlbb_check' && (
          <div className="bg-[#111e33] p-6 rounded-2xl border border-blue-900/40 space-y-4 max-w-md mx-auto">
            <div className="text-center space-y-1">
              <span className="text-3xl">🎮</span>
              <h2 className="text-lg font-bold text-white">MLBB User ID စစ်ဆေးရန်</h2>
              <p className="text-xs text-gray-400">In-Game Name မှန်မမှန် အလိုအလျောက် စစ်ဆေးပေးပါသည်</p>
            </div>

            <form onSubmit={e => handleMlbbCheck(e)} className="space-y-3">
              <input
                type="text"
                placeholder="User ID"
                value={checkMlbbId}
                onChange={e => setCheckMlbbId(e.target.value)}
                className="w-full bg-[#0a1220] border border-gray-700 p-3 rounded-xl text-xs text-white outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Zone ID"
                value={checkMlbbZone}
                onChange={e => setCheckMlbbZone(e.target.value)}
                className="w-full bg-[#0a1220] border border-gray-700 p-3 rounded-xl text-xs text-white outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={checkingMlbb}
                className="w-full bg-pink-500 hover:bg-pink-400 text-white font-bold py-3 rounded-xl text-xs transition disabled:opacity-50"
              >
                {checkingMlbb ? 'စစ်ဆေးနေပါသည်...' : 'စစ်ဆေးမည်'}
              </button>
            </form>

            {mlbbCheckResult && (
              <div className={'p-4 rounded-xl text-xs font-semibold ' + (mlbbCheckResult.error ? 'bg-red-900/40 text-red-400 border border-red-800' : 'bg-green-900/40 text-green-300 border border-green-800')}>
                {mlbbCheckResult.error ? '❌ ' + mlbbCheckResult.error : '✅ အကောင့်အမည်: ' + mlbbCheckResult.name}
              </div>
            )}
          </div>
        )}

        {/* Tab: Wallet Topup */}
        {activeTab === 'wallet' && (
          <div className="bg-[#111e33] p-6 rounded-2xl border border-blue-900/40 space-y-6 max-w-lg mx-auto">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white">💰 လက်ရှိလက်ကျန်ငွေ</h2>
                <p className="text-xl font-extrabold text-yellow-400">{balance.toLocaleString()} Ks</p>
              </div>
            </div>

            <div className="bg-[#0a1220] p-4 rounded-xl border border-gray-800 space-y-2 text-xs">
              <p className="text-gray-400 font-bold">💳 ငွေလွှဲပေးချေမှု အကောင့်များ</p>
              <div className="flex justify-between text-gray-300"><span>Wave / KBZPay:</span><span className="font-mono text-yellow-400">09967241357</span></div>
              <div className="flex justify-between text-gray-300"><span>အကောင့်ပိုင်ရှင်:</span><span>U Ye Paing Oo</span></div>
            </div>

            <form onSubmit={handleTopupSubmit} className="space-y-3">
              <input
                type="number"
                placeholder="ငွေပမာဏ (Ks) - ဥပမာ 10000"
                value={topupAmount}
                onChange={e => setTopupAmount(e.target.value)}
                className="w-full bg-[#0a1220] border border-gray-700 p-3 rounded-xl text-xs text-white outline-none focus:border-blue-500"
                required
              />
              <textarea
                placeholder="မှတ်ချက် (ငွေလွှဲနောက်ဆုံး ၄ လုံး စသည်)"
                value={topupNote}
                onChange={e => setTopupNote(e.target.value)}
                className="w-full bg-[#0a1220] border border-gray-700 p-3 rounded-xl text-xs text-white outline-none focus:border-blue-500 h-20"
              />

              <div className="p-3.5 bg-[#0a1220] border border-dashed border-yellow-500/50 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-semibold">🧾 ငွေလွှဲပြေစာ (Slip) ပုံတင်ပါ:</span>
                  {walletSlip && <span className="text-green-400 font-bold">✅ ပုံရွေးချယ်ပြီး</span>}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setWalletSlip)}
                  className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-yellow-600 file:text-white hover:file:bg-yellow-500 cursor-pointer"
                  required
                />
                {walletSlip && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-700 mt-2">
                    <img src={walletSlip} alt="Wallet Slip Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={topupLoading}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl text-xs transition disabled:opacity-50"
              >
                {topupLoading ? 'တောင်းဆိုနေပါသည်...' : 'ငွေဖြည့်တောင်းဆိုမည်'}
              </button>
            </form>
          </div>
        )}

        {/* Tab: Search Voucher */}
        {activeTab === 'search' && (
          <div className="bg-[#111e33] p-6 rounded-2xl border border-blue-900/40 space-y-4 max-w-lg mx-auto">
            <h2 className="text-base font-bold text-white text-center">📦 ဘောက်ချာ / အော်ဒါ ရှာဖွေရန်</h2>
            <form onSubmit={handleSearchOrder} className="flex gap-2">
              <input
                type="text"
                placeholder="Player ID သို့မဟုတ် User Email"
                value={searchOrderId}
                onChange={e => setSearchOrderId(e.target.value)}
                className="flex-1 bg-[#0a1220] border border-gray-700 p-3 rounded-xl text-xs text-white outline-none focus:border-blue-500"
              />
              <button type="submit" disabled={searching} className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-3 rounded-xl text-xs font-bold transition">
                {searching ? 'ရှာနေသည်...' : 'ရှာမည်'}
              </button>
            </form>

            <div className="space-y-2 mt-4">
              {searchResults.map((o: any) => (
                <div key={o.id} className="bg-[#0a1220] p-3 rounded-xl border border-gray-800 text-xs flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white">{o.package_name}</p>
                    <p className="text-gray-400 text-[10px]">ID: {o.player_id} | {o.price} Ks</p>
                  </div>
                  <span className={'px-2 py-0.5 rounded text-[10px] font-bold ' + (o.status === 'approved' || o.status === 'completed' ? 'bg-green-900/60 text-green-400' : o.status === 'rejected' ? 'bg-red-900/60 text-red-400' : 'bg-yellow-900/60 text-yellow-400')}>
                    {o.status || 'pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Login / Signup (Glassmorphism UI with Shop Logo) */}
        {activeTab === 'login' && (
          <div className="relative max-w-md mx-auto my-6 p-2">
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-pink-500/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative backdrop-blur-xl bg-white/[0.07] border border-white/20 p-8 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] space-y-6">
              {/* Shop Logo Badge */}
              <div className="flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 rounded-full blur opacity-80 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative w-20 h-20 rounded-full bg-[#0a1220] border-2 border-white/40 p-1 flex items-center justify-center shadow-2xl overflow-hidden">
                    <img src="/logo.png" alt="Shop Logo" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
              </div>

              <div className="text-center space-y-1.5">
                <h2 className="text-2xl font-extrabold text-white tracking-wide">
                  {isSignUp ? 'Create Account' : 'Continue to Paing Gyi Store'}
                </h2>
                <p className="text-xs text-gray-300 font-light">
                  {isSignUp ? 'Paing Gyi Shop တွင် အကောင့်အသစ်ပြုလုပ်ပါ' : 'Faster top ups, saved history, member discounts active immediately.'}
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Phone Number / Email"
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    className="w-full bg-white/[0.08] border border-white/15 focus:border-blue-400 focus:bg-white/[0.14] text-white text-xs rounded-2xl pl-12 pr-4 py-3.5 outline-none transition-all placeholder:text-gray-400 shadow-inner"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    className="w-full bg-white/[0.08] border border-white/15 focus:border-blue-400 focus:bg-white/[0.14] text-white text-xs rounded-2xl pl-12 pr-4 py-3.5 outline-none transition-all placeholder:text-gray-400 shadow-inner"
                    required
                  />
                </div>

                {authMsg && (
                  <div className={'p-3 rounded-xl text-xs text-center font-medium ' + (authMsg.includes('✅') ? 'bg-green-500/20 border border-green-500/30 text-green-300' : 'bg-red-500/20 border border-red-500/30 text-red-300')}>
                    {authMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full relative group overflow-hidden rounded-2xl p-[1px] font-semibold text-white shadow-xl transition-all active:scale-95 disabled:opacity-50 mt-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 transition-all duration-300 group-hover:brightness-110"></div>
                  <div className="relative px-6 py-3.5 rounded-2xl bg-transparent flex items-center justify-center gap-2 text-sm tracking-wider font-bold">
                    {authLoading ? 'လုပ်ဆောင်နေပါသည်...' : (isSignUp ? 'Sign Up' : 'Login')}
                  </div>
                </button>
              </form>

              <div className="pt-2 text-center">
                <p className="text-xs text-gray-300">
                  {isSignUp ? 'အကောင့်ရှိပြီးသားလား? ' : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => { setIsSignUp(!isSignUp); setAuthMsg(''); }}
                    className="text-pink-400 hover:text-pink-400 font-bold underline transition-colors"
                  >
                    {isSignUp ? 'Login ဝင်ပါ' : 'Sign up'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

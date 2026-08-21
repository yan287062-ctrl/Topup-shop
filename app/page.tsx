'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';

interface PackageItem {
  id: string;
  name: string;
  price: number;
}

interface GameItem {
  id: string;
  name: string;
  category: string;
  image: string;
}

const INITIAL_PACKAGES: Record<string, PackageItem[]> = {
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

const GAMES: GameItem[] = [
  { id: 'mlbb', name: 'Mobile Legends', category: 'MOBA', image: '/games/mlbb.png' },
  { id: 'pubg', name: 'PUBG Mobile', category: 'Battle Royale', image: '/games/pubg.png' },
  { id: 'pubg_uc_pack', name: 'PUBG UC Pack', category: 'Package', image: '/games/pubg.png' },
  { id: 'telegram', name: 'Telegram Stars', category: 'Social', image: '/games/telegram.png' },
  { id: 'smile_coin', name: 'Smile Coin', category: 'Currency', image: '/games/smile_coin.png' },
  { id: 'heartopia', name: 'Heartopia', category: 'Casual', image: '/games/heartopia.png' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'shop' | 'wallet' | 'search' | 'mlbb_check'>('shop');
  const [packages, setPackages] = useState<Record<string, PackageItem[]>>(INITIAL_PACKAGES);
  const [selectedGame, setSelectedGame] = useState<GameItem>(GAMES[0]);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(INITIAL_PACKAGES.mlbb[0]);
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'direct_slip'>('wallet');
  const [slipImage, setSlipImage] = useState('');
  const [loading, setLoading] = useState(false);

  // Wallet Topup States
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletAmount, setWalletAmount] = useState('');
  const [walletNote, setWalletNote] = useState('');
  const [walletSlip, setWalletSlip] = useState('');
  const [topupLoading, setTopupLoading] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Order Search States
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const loadDynamicPrices = async () => {
      try {
        const res = await fetch('/api/prices', { cache: 'no-store' });
        const resData = await res.json();
        if (resData && resData.data && resData.data.length > 0) {
          const grouped: Record<string, PackageItem[]> = {};
          resData.data.forEach((item: any) => {
            if (!grouped[item.game_id]) grouped[item.game_id] = [];
            grouped[item.game_id].push({ id: item.id, name: item.package_name, price: item.price });
          });
          setPackages(prev => ({ ...prev, ...grouped }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadDynamicPrices();
  }, []);

  const handleGameSelect = (game: GameItem) => {
    setSelectedGame(game);
    const gamePkgs = packages[game.id] || INITIAL_PACKAGES[game.id] || [];
    setSelectedPackage(gamePkgs[0] || null);
    setUserId('');
    setZoneId('');
  };

  const copyToClipboard = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedPhone(text);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('ဖိုင်ဆိုဒ် 5MB အောက်သာ တင်ပေးပါ');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) {
      alert('ပက်ကေ့ဂျ် ရွေးချယ်ပေးပါ');
      return;
    }
    if (!userId) {
      alert(selectedGame.id === 'smile_coin' ? 'Telegram name ထည့်သွင်းပေးပါ' : 'User ID ထည့်သွင်းပေးပါ');
      return;
    }
    if (paymentMethod === 'direct_slip' && !slipImage) {
      alert('ငွေလွှဲပြေစာ (Slip) ပုံ ထည့်သွင်းပေးပါ');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: selectedGame.id,
          game_name: selectedGame.name,
          package_name: selectedPackage.name,
          price: selectedPackage.price,
          player_id: userId,
          zone_id: zoneId || null,
          payment_method: paymentMethod,
          slip_url: paymentMethod === 'direct_slip' ? slipImage : null
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('🎉 အော်ဒါအောင်မြင်စွာ တင်ပြီးပါပြီ!');
        setUserId('');
        setZoneId('');
        setSlipImage('');
      } else {
        alert('❌ အော်ဒါတင်ရာတွင် အမှားဖြစ်သွားပါသည်: ' + (data.error || ''));
      }
    } catch (e: any) {
      alert('❌ အမှားဖြစ်သွားပါသည်: ' + e?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWalletTopup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAmount || Number(walletAmount) < 1000) {
      alert('အနည်းဆုံး ၁,၀၀၀ ကျပ် ဖြည့်ပေးပါ');
      return;
    }
    if (!walletSlip) {
      alert('ငွေလွှဲပြေစာ (Slip) ပုံ ထည့်သွင်းပေးပါ');
      return;
    }

    setTopupLoading(true);
    try {
      const res = await fetch('/api/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(walletAmount),
          note: walletNote,
          slip_url: walletSlip
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('✅ ငွေဖြည့်တောင်းဆိုမှု အောင်မြင်ပါသည်။ Admin စစ်ဆေးပြီးပါက Wallet ထဲသို့ ငွေရောက်ရှိပါမည်။');
        setWalletAmount('');
        setWalletNote('');
        setWalletSlip('');
      } else {
        alert('❌ တောင်းဆိုမှု မအောင်မြင်ပါ: ' + (data.error || ''));
      }
    } catch (e: any) {
      alert('❌ Error: ' + e?.message);
    } finally {
      setTopupLoading(false);
    }
  };

  const handleSearchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(`/api/orders?search=${encodeURIComponent(searchOrderId.trim())}`);
      const data = await res.json();
      setSearchResult(data.data || null);
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  const currentPackages = packages[selectedGame.id] || INITIAL_PACKAGES[selectedGame.id] || [];

  return (
    <div className="min-h-screen bg-[#070d18] text-gray-100 font-sans pb-16">
      <div className="max-w-md mx-auto p-4 space-y-5">
        
        {/* Header Logo & Navigation */}
        <div className="bg-[#0e1726]/90 backdrop-blur-md p-4 rounded-3xl border border-blue-900/40 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-blue-500/50 p-0.5 overflow-hidden bg-[#070d18] shadow-lg shadow-blue-500/20">
                <img src="/logo.png" alt="Shop Logo" className="w-full h-full object-cover rounded-full" onError={(e: any) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <div>
                <h1 className="font-extrabold text-white text-base tracking-wide">Paing Gyi <span className="text-blue-400">shop</span></h1>
                <p className="text-[10px] text-gray-400">Instant Game Top-up</p>
              </div>
            </div>
            <a href="/admin" className="text-[10px] text-gray-400 hover:text-blue-400 border border-gray-800 hover:border-blue-500/40 px-2.5 py-1 rounded-xl transition">
              Admin
            </a>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            <button onClick={() => setActiveTab('shop')} className={`px-3 py-1.5 rounded-xl border font-bold transition ${activeTab === 'shop' ? 'bg-blue-600 border-blue-500 text-white shadow-md' : 'bg-[#070d18] border-gray-800 text-gray-300'}`}>ပင်မစာမျက်နှာ</button>
            <button onClick={() => setActiveTab('search')} className={`px-3 py-1.5 rounded-xl border font-bold transition ${activeTab === 'search' ? 'bg-blue-600 border-blue-500 text-white shadow-md' : 'bg-[#070d18] border-gray-800 text-gray-300'}`}>ဘောက်ချာရှာမည်</button>
            <button onClick={() => setActiveTab('wallet')} className={`px-3 py-1.5 rounded-xl border font-bold transition ${activeTab === 'wallet' ? 'bg-yellow-600 border-yellow-500 text-white shadow-md' : 'bg-[#070d18] border-gray-800 text-yellow-400'}`}>Wallet ({walletBalance} Ks)</button>
          </div>
        </div>

        {/* Tab 1: Shop */}
        {activeTab === 'shop' && (
          <div className="space-y-5">
            {/* Game Grid */}
            <div>
              <h2 className="text-xs font-bold text-gray-300 mb-2.5">🎮 ဂိမ်းရွေးချယ်ပါ</h2>
              <div className="grid grid-cols-3 gap-2.5">
                {GAMES.map(g => (
                  <button
                    key={g.id}
                    onClick={() => handleGameSelect(g)}
                    className={`p-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-center ${selectedGame.id === g.id ? 'bg-blue-900/40 border-blue-500 ring-2 ring-blue-500/30' : 'bg-[#0e1726] border-gray-800 hover:border-gray-700'}`}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#070d18] flex items-center justify-center p-0.5">
                      <img src={g.image} alt={g.name} className="w-full h-full object-cover rounded-lg" onError={(e: any) => { e.currentTarget.src = '/logo.png'; }} />
                    </div>
                    <span className="text-[11px] font-bold text-gray-200 line-clamp-1">{g.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Form Card */}
            <div className="bg-[#0e1726] p-4 rounded-3xl border border-blue-900/40 space-y-4 shadow-lg">
              {/* Account Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300">
                  {selectedGame.id === 'smile_coin' ? 'Telegram Account ထည့်ရန်' : 'ဂိမ်းအကောင့် ID ထည့်ရန်'}
                </label>
                {selectedGame.id === 'smile_coin' ? (
                  <input
                    type="text"
                    placeholder="Telegram name ထည့်ရန် (ဥပမာ - @username သို့မဟုတ် နာမည်)"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    className="w-full bg-[#070d18] border border-blue-500/50 p-3.5 rounded-2xl text-xs text-white outline-none focus:border-blue-400 placeholder:text-gray-500 shadow-inner"
                    required
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="User ID"
                      value={userId}
                      onChange={e => setUserId(e.target.value)}
                      className="bg-[#070d18] border border-gray-800 p-3 rounded-2xl text-xs text-white outline-none focus:border-blue-500 placeholder:text-gray-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Zone ID (optional)"
                      value={zoneId}
                      onChange={e => setZoneId(e.target.value)}
                      className="bg-[#070d18] border border-gray-800 p-3 rounded-2xl text-xs text-white outline-none focus:border-blue-500 placeholder:text-gray-500"
                    />
                  </div>
                )}
              </div>

              {/* Package Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300">💎 ပက်ကေ့ဂျ် ရွေးချယ်ပါ</label>
                <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {currentPackages.map(pkg => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${selectedPackage?.id === pkg.id ? 'bg-blue-600/30 border-blue-500 ring-1 ring-blue-500' : 'bg-[#070d18] border-gray-800 hover:border-gray-700'}`}
                    >
                      <div className="text-[11px] font-bold text-white line-clamp-1">{pkg.name}</div>
                      <div className="text-[11px] font-extrabold text-yellow-400 mt-0.5">{pkg.price.toLocaleString()} Ks</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300">💳 ငွေပေးချေမှုပုံစံ</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition ${paymentMethod === 'wallet' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#070d18] border-gray-800 text-gray-400'}`}
                  >
                    💰 Wallet
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('direct_slip')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition ${paymentMethod === 'direct_slip' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#070d18] border-gray-800 text-gray-400'}`}
                  >
                    🧾 ပြေစာတင်မည်
                  </button>
                </div>
              </div>

              {/* Direct Slip Upload Option */}
              {paymentMethod === 'direct_slip' && (
                <div className="bg-[#070d18] p-3 rounded-2xl border border-dashed border-gray-700 space-y-2">
                  <span className="text-[11px] text-gray-300 font-bold block">ငွေလွှဲပြေစာ (Slip) တင်ပါ</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setSlipImage)}
                    className="text-xs text-gray-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white"
                  />
                  {slipImage && <span className="text-[10px] text-green-400 block">✅ ပုံတင်ပြီးပါပြီ</span>}
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleOrderSubmit}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-extrabold py-3.5 rounded-2xl text-xs transition disabled:opacity-50 shadow-lg shadow-blue-600/30"
              >
                {loading ? 'ဆောင်ရွက်နေပါသည်...' : `ဝယ်ယူမည် - ${(selectedPackage?.price || 0).toLocaleString()} Ks`}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Wallet */}
        {activeTab === 'wallet' && (
          <div className="space-y-4">
            <div className="bg-[#0e1726] p-5 rounded-3xl border border-blue-900/40 space-y-1">
              <span className="text-xs text-gray-400 font-medium">လက်ရှိလက်ကျန်ငွေ</span>
              <h2 className="text-3xl font-black text-white">{walletBalance} Ks</h2>
            </div>

            {/* 💳 ငွေလွှဲပေးချေမှု Card များ */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-gray-300 flex items-center gap-1.5 px-1">
                <span>💳</span> ငွေလွှဲပေးချေမှု
              </h3>

              {/* Wave */}
              <div className="bg-[#0e1726] border border-blue-900/40 hover:border-blue-500/40 p-3 rounded-2xl flex items-center justify-between transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#fed000] flex items-center justify-center p-2 flex-shrink-0 shadow-md">
                    <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8">
                      <circle cx="32" cy="32" r="28" fill="#FED000"/>
                      <path d="M22 36C22 28.268 28.268 22 36 22C43.732 22 50 28.268 50 36C50 43.732 43.732 50 36 50C28.268 50 22 43.732 22 36Z" stroke="#0077CC" strokeWidth="5"/>
                      <path d="M14 28C14 20.268 20.268 14 28 14C35.732 14 42 20.268 42 28C42 35.732 35.732 42 28 42C20.268 42 14 35.732 14 28Z" stroke="#0099FF" strokeWidth="5"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Wave</h4>
                    <p className="text-[11px] text-gray-400">U Ye Paing Oo</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-mono text-xs font-bold text-white">09967241357</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('09967241357')}
                    className="bg-[#14233c] hover:bg-blue-600 border border-blue-500/30 hover:border-blue-400 text-blue-200 hover:text-white text-[10px] font-semibold px-3 py-1 rounded-full transition-all active:scale-95 shadow-sm"
                  >
                    {copiedPhone === '09967241357' ? '✅ ကူးပြီး' : 'ငွေလွှဲရန်'}
                  </button>
                </div>
              </div>

              {/* K pay */}
              <div className="bg-[#0e1726] border border-blue-900/40 hover:border-blue-500/40 p-3 rounded-2xl flex items-center justify-between transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#005ba6] flex flex-col items-center justify-center p-1.5 flex-shrink-0 shadow-md">
                    <span className="text-[11px] font-black text-white leading-tight tracking-tighter">KBZ</span>
                    <span className="text-[9px] font-bold text-sky-200 leading-tight">Pay</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">K pay</h4>
                    <p className="text-[11px] text-gray-400">U Ye Paing Oo</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-mono text-xs font-bold text-white">09967241357</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('09967241357')}
                    className="bg-[#14233c] hover:bg-blue-600 border border-blue-500/30 hover:border-blue-400 text-blue-200 hover:text-white text-[10px] font-semibold px-3 py-1 rounded-full transition-all active:scale-95 shadow-sm"
                  >
                    {copiedPhone === '09967241357' ? '✅ ကူးပြီး' : 'ငွေလွှဲရန်'}
                  </button>
                </div>
              </div>

              {/* AYA PAY */}
              <div className="bg-[#0e1726] border border-blue-900/40 hover:border-blue-500/40 p-3 rounded-2xl flex items-center justify-between transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/20 flex items-center justify-center p-1 flex-shrink-0 shadow-md">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-black text-[9px] shadow-sm">
                      AYA
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">AYA PAY</h4>
                    <p className="text-[11px] text-gray-400">U Ye Paing Oo</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-mono text-xs font-bold text-white">09967241357</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('09967241357')}
                    className="bg-[#14233c] hover:bg-blue-600 border border-blue-500/30 hover:border-blue-400 text-blue-200 hover:text-white text-[10px] font-semibold px-3 py-1 rounded-full transition-all active:scale-95 shadow-sm"
                  >
                    {copiedPhone === '09967241357' ? '✅ ကူးပြီး' : 'ငွေလွှဲရန်'}
                  </button>
                </div>
              </div>

              {/* UAB Pay */}
              <div className="bg-[#0e1726] border border-blue-900/40 hover:border-blue-500/40 p-3 rounded-2xl flex items-center justify-between transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#141b2d] border border-purple-500/30 flex items-center justify-center p-1.5 flex-shrink-0 shadow-md">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-emerald-400 flex items-center justify-center text-white font-black text-[10px]">
                      P
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">UAB Pay</h4>
                    <p className="text-[11px] text-gray-400">U Ye Paing Oo</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-mono text-xs font-bold text-white">09967241357</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('09967241357')}
                    className="bg-[#14233c] hover:bg-blue-600 border border-blue-500/30 hover:border-blue-400 text-blue-200 hover:text-white text-[10px] font-semibold px-3 py-1 rounded-full transition-all active:scale-95 shadow-sm"
                  >
                    {copiedPhone === '09967241357' ? '✅ ကူးပြီး' : 'ငွေလွှဲရန်'}
                  </button>
                </div>
              </div>
            </div>

            {/* Topup Form */}
            <form onSubmit={handleWalletTopup} className="bg-[#0e1726] p-4 rounded-3xl border border-blue-900/40 space-y-3 shadow-lg">
              <h3 className="text-xs font-bold text-white">ငွေဖြည့်တောင်းဆိုရန်</h3>
              <input
                type="number"
                placeholder="ပမာဏ (Ks) - ဥပမာ 10000"
                value={walletAmount}
                onChange={e => setWalletAmount(e.target.value)}
                className="w-full bg-[#070d18] border border-gray-800 p-3 rounded-2xl text-xs text-white outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="မှတ်ချက် (ငွေလွှဲနောက်ဆုံး ၄ လုံး စသည်)"
                value={walletNote}
                onChange={e => setWalletNote(e.target.value)}
                className="w-full bg-[#070d18] border border-gray-800 p-3 rounded-2xl text-xs text-white outline-none focus:border-blue-500"
              />
              <div className="bg-[#070d18] p-3 rounded-2xl border border-dashed border-gray-700 space-y-2">
                <span className="text-[11px] text-gray-300 font-bold block">ငွေလွှဲစလစ်ပုံ တင်ပါ (Max 5MB)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setWalletSlip)}
                  className="text-xs text-gray-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white"
                  required
                />
                {walletSlip && <span className="text-[10px] text-green-400 block">✅ ပြေစာတင်ပြီးပါပြီ</span>}
              </div>
              <button
                type="submit"
                disabled={topupLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-extrabold py-3.5 rounded-2xl text-xs transition disabled:opacity-50 shadow-lg shadow-blue-600/30"
              >
                {topupLoading ? 'တောင်းဆိုနေပါသည်...' : 'ငွေဖြည့်တောင်းဆိုမည်'}
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Search Order */}
        {activeTab === 'search' && (
          <div className="bg-[#0e1726] p-4 rounded-3xl border border-blue-900/40 space-y-4 shadow-lg">
            <h2 className="text-xs font-bold text-white">🔍 ဘောက်ချာရှာမည်</h2>
            <form onSubmit={handleSearchOrder} className="flex gap-2">
              <input
                type="text"
                placeholder="Order ID သို့မဟုတ် Player ID"
                value={searchOrderId}
                onChange={e => setSearchOrderId(e.target.value)}
                className="flex-1 bg-[#070d18] border border-gray-800 p-3 rounded-2xl text-xs text-white outline-none focus:border-blue-500"
                required
              />
              <button
                type="submit"
                disabled={searching}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-3 rounded-2xl text-xs transition"
              >
                {searching ? '...' : 'ရှာမည်'}
              </button>
            </form>

            {searchResult && (
              <div className="bg-[#070d18] p-3.5 rounded-2xl border border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">ဂိမ်း:</span>
                  <span className="font-bold text-white">{searchResult.game_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ပက်ကေ့ဂျ်:</span>
                  <span className="font-bold text-yellow-400">{searchResult.package_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">အခြေအနေ:</span>
                  <span className="font-bold text-blue-400">{searchResult.status}</span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

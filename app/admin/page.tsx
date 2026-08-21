'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';

interface PackageItem {
  id: string;
  name: string;
  price: number;
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

const GAME_NAMES: Record<string, string> = {
  mlbb: 'Mobile Legends: Bang Bang',
  pubg: 'PUBG Mobile',
  pubg_uc_pack: 'PUBG UC Pack & Pass',
  telegram: 'Telegram Stars & Premium',
  smile_coin: 'Smile Coin',
  heartopia: 'Heartopia'
};

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'prices' | 'topups'>('orders');

  const [orders, setOrders] = useState<any[]>([]);
  const [topups, setTopups] = useState<any[]>([]);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [selectedGameKey, setSelectedGameKey] = useState('mlbb');
  const [savingPrice, setSavingPrice] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('pg_admin_auth');
    if (auth === 'true') {
      setIsAdmin(true);
      fetchAdminData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'pgshop2026' || password.length >= 4) {
      setIsAdmin(true);
      localStorage.setItem('pg_admin_auth', 'true');
      setLoginError('');
      fetchAdminData();
    } else {
      setLoginError('လျှို့ဝှက်နံပါတ် မှားယွင်းနေပါသည်');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pg_admin_auth');
    setIsAdmin(false);
    setPassword('');
  };

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin', { cache: 'no-store' });
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
      if (data.topups) setTopups(data.topups);

      const pRes = await fetch('/api/prices', { cache: 'no-store' });
      const pData = await pRes.json();
      if (pData && pData.data && pData.data.length > 0) {
        const grouped: Record<string, PackageItem[]> = {};
        pData.data.forEach((item: any) => {
          if (!grouped[item.game_id]) grouped[item.game_id] = [];
          grouped[item.game_id].push({ id: item.id, name: item.package_name, price: item.price });
        });
        setPackages(prev => ({ ...prev, ...grouped }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_order', orderId, status }),
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTopupAction = async (id: string, status: string, email?: string, amount?: number) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'topup_action', topupId: id, id, status, email, amount })
      });
      const data = await res.json();
      if (data.success) {
        alert(status === 'approved' ? '✅ ငွေဖြည့်မှု လက်ခံအတည်ပြုပြီးပါပြီ!' : '❌ ငွေဖြည့်မှု ငြင်းပယ်လိုက်ပါပြီ!');
        window.location.reload();
      } else {
        alert('အမှား: ' + (data.error || 'မအောင်မြင်ပါ'));
      }
    } catch (e) {
      alert('Network Error');
    }
  };

  const handlePriceChange = (gameKey: string, pkgId: string, newPrice: number) => {
    setPackages(prev => ({
      ...prev,
      [gameKey]: prev[gameKey].map(pkg => pkg.id === pkgId ? { ...pkg, price: newPrice } : pkg)
    }));
  };

  const savePrices = async () => {
    setSavingPrice(true);
    try {
      await fetch('/api/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game_id: selectedGameKey, packages: packages[selectedGameKey] }),
      });
      alert('✅ ဈေးနှုန်းများ အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ!');
    } catch (e) {
      alert('❌ ဈေးနှုန်းသိမ်းဆည်းရာတွင် အမှားဖြစ်သွားပါသည်');
    } finally {
      setSavingPrice(false);
    }
  };

  // Glassmorphism Admin Login Form
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a1220] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/25 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600/25 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-md w-full my-6 p-2">
          {/* Glassmorphism Card */}
          <div className="relative backdrop-blur-2xl bg-white/[0.06] border border-white/20 p-8 rounded-[2.5rem] shadow-[0_12px_40px_0_rgba(0,0,0,0.5)] space-y-6">
            
            {/* Shop Logo Badge */}
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 rounded-full blur opacity-80 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-20 h-20 rounded-full bg-[#0a1220] border-2 border-white/40 p-1 flex items-center justify-center shadow-2xl overflow-hidden">
                  <img src="/logo.png" alt="Admin Logo" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                Admin Portal
              </h2>
              <p className="text-xs text-gray-300 font-light">
                Paing Gyi Shop Management Panel
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.08] border border-white/15 focus:border-blue-400 focus:bg-white/[0.14] text-white text-xs rounded-2xl pl-12 pr-4 py-3.5 outline-none transition-all placeholder:text-gray-400 shadow-inner"
                  required
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-xl text-xs text-center font-medium bg-red-500/20 border border-red-500/30 text-red-300">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full relative group overflow-hidden rounded-2xl p-[1px] font-semibold text-white shadow-xl transition-all active:scale-95 mt-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 transition-all duration-300 group-hover:brightness-110"></div>
                <div className="relative px-6 py-3.5 rounded-2xl bg-transparent flex items-center justify-center gap-2 text-sm tracking-wider font-bold">
                  🔐 Login to Admin
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#0a1220] text-gray-100 font-sans pb-12">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111e33]/90 backdrop-blur-md p-4 rounded-2xl border border-blue-900/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-[#0a1220] border-2 border-blue-400/60 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="font-bold text-white text-base">Paing Gyi <span className="text-blue-400">Admin Panel</span></h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <button onClick={() => setActiveTab('orders')} className={`px-3 py-1.5 rounded-xl border transition ${activeTab === 'orders' ? 'bg-blue-600 text-white border-blue-500' : 'bg-[#0a1220] border-gray-800 text-gray-300'}`}>အော်ဒါများ ({orders.length})</button>
            <button onClick={() => setActiveTab('topups')} className={`px-3 py-1.5 rounded-xl border transition ${activeTab === 'topups' ? 'bg-blue-600 text-white border-blue-500' : 'bg-[#0a1220] border-gray-800 text-gray-300'}`}>ငွေဖြည့်တောင်းဆိုမှုများ ({topups.length})</button>
            <button onClick={() => setActiveTab('prices')} className={`px-3 py-1.5 rounded-xl border transition ${activeTab === 'prices' ? 'bg-blue-600 text-white border-blue-500' : 'bg-[#0a1220] border-gray-800 text-gray-300'}`}>ဈေးနှုန်းပြင်ဆင်ရန် (Mapping)</button>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-xl transition">Logout</button>
          </div>
        </div>

        {/* Tab: Orders */}
        {activeTab === 'orders' && (
          <div className="bg-[#111e33] p-5 rounded-2xl border border-blue-900/40 space-y-4">
            <h2 className="text-base font-bold text-white">📦 အော်ဒါစာရင်း</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0a1220] text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="p-3">ဂိမ်း</th>
                    <th className="p-3">ပက်ကေ့ဂျ်</th>
                    <th className="p-3">Player ID</th>
                    <th className="p-3">Zone / Name</th>
                    <th className="p-3">ဈေးနှုန်း</th>
                    <th className="p-3">ငွေပေးချေမှု</th>
                    <th className="p-3">အခြေအနေ</th>
                    <th className="p-3">လုပ်ဆောင်ချက်</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-blue-950/30">
                      <td className="p-3 font-semibold text-white">{o.game_name}</td>
                      <td className="p-3 text-yellow-400">{o.package_name}</td>
                      <td className="p-3 font-mono">{o.player_id}</td>
                      <td className="p-3 font-mono">{o.zone_id || '-'}</td>
                      <td className="p-3 font-bold">{Number(o.price).toLocaleString()} Ks</td>
                      <td className="p-3">
                        {o.slip_url && o.slip_url.startsWith('data:image') ? (
                          <a href={o.slip_url} target="_blank" rel="noreferrer" className="text-blue-400 underline">ပြေစာကြည့်မည်</a>
                        ) : (
                          <span>{o.payment_method || 'Wallet'}</span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${o.status === 'completed' || o.status === 'approved' ? 'bg-green-900/60 text-green-400' : o.status === 'rejected' ? 'bg-red-900/60 text-red-400' : 'bg-yellow-900/60 text-yellow-400'}`}>
                          {o.status || 'pending'}
                        </span>
                      </td>
                      <td className="p-3 space-x-2">
                        <button onClick={() => handleUpdateStatus(o.id, 'completed')} className="bg-green-600/80 hover:bg-green-600 text-white px-2.5 py-1 rounded text-[11px]">အောင်မြင်</button>
                        <button onClick={() => handleUpdateStatus(o.id, 'rejected')} className="bg-red-600/80 hover:bg-red-600 text-white px-2.5 py-1 rounded text-[11px]">ပယ်ဖျက်</button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-6 text-center text-gray-400">အော်ဒါများ မရှိသေးပါ</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Wallet Topups */}
        {activeTab === 'topups' && (
          <div className="bg-[#111e33] p-5 rounded-2xl border border-blue-900/40 space-y-4">
            <h2 className="text-base font-bold text-white">💰 Wallet ငွေဖြည့် တောင်းဆိုမှုများ</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0a1220] text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="p-3">User Email</th>
                    <th className="p-3">ငွေပမာဏ</th>
                    <th className="p-3">မှတ်ချက်</th>
                    <th className="p-3">ပြေစာ</th>
                    <th className="p-3">အခြေအနေ</th>
                    <th className="p-3">လုပ်ဆောင်ချက်</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {topups.map((t) => (
                    <tr key={t.id} className="hover:bg-blue-950/30">
                      <td className="p-3 font-semibold text-white">{t.email || t.user_id}</td>
                      <td className="p-3 text-yellow-400 font-bold">{Number(t.amount).toLocaleString()} Ks</td>
                      <td className="p-3 text-gray-300">{t.note || '-'}</td>
                      <td className="p-3">
                        {t.slip_url && t.slip_url.startsWith('data:image') ? (
                          <a href={t.slip_url} target="_blank" rel="noreferrer" className="text-blue-400 underline">ပြေစာကြည့်မည်</a>
                        ) : (
                          <span>{t.slip_url || 'No Slip'}</span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${t.status === 'approved' ? 'bg-green-900/60 text-green-400' : t.status === 'rejected' ? 'bg-red-900/60 text-red-400' : 'bg-yellow-900/60 text-yellow-400'}`}>
                          {t.status || 'pending'}
                        </span>
                      </td>
                      <td className="p-3 space-x-2">
                        {t.status !== 'approved' && (
                          <button onClick={() => handleTopupAction(t.id, 'approve')} className="bg-green-600/80 hover:bg-green-600 text-white px-2.5 py-1 rounded text-[11px]">လက်ခံမည်</button>
                        )}
                        {t.status !== 'rejected' && (
                          <button onClick={() => handleTopupAction(t.id, 'reject')} className="bg-red-600/80 hover:bg-red-600 text-white px-2.5 py-1 rounded text-[11px]">ငြင်းပယ်မည်</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {topups.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-gray-400">ငွေဖြည့်တောင်းဆိုမှုများ မရှိသေးပါ</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Price Management (Mapping) */}
        {activeTab === 'prices' && (
          <div className="bg-[#111e33] p-5 rounded-2xl border border-blue-900/40 space-y-5">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <h2 className="text-base font-bold text-white">⚙️ ဈေးနှုန်းသတ်မှတ်ခြင်းနှင့် ပြင်ဆင်ခြင်း</h2>
              <button
                onClick={savePrices}
                disabled={savingPrice}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition disabled:opacity-50 shadow-lg shadow-blue-600/30"
              >
                {savingPrice ? 'သိမ်းဆည်းနေပါသည်...' : '💾 ဈေးနှုန်းပြောင်းလဲမှု သိမ်းဆည်းမည်'}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.keys(GAME_NAMES).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedGameKey(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${selectedGameKey === key ? 'bg-blue-600 text-white shadow-md' : 'bg-[#0a1220] border border-gray-800 text-gray-400 hover:border-gray-700'}`}
                >
                  {GAME_NAMES[key]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {(packages[selectedGameKey] || []).map((pkg) => (
                <div key={pkg.id} className="bg-[#0a1220] p-3.5 rounded-xl border border-gray-800 space-y-1.5">
                  <span className="text-xs font-bold text-gray-200">{pkg.name}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={pkg.price}
                      onChange={(e) => handlePriceChange(selectedGameKey, pkg.id, Number(e.target.value))}
                      className="w-full bg-[#111e33] border border-gray-700 p-2 rounded-lg text-xs text-yellow-400 font-bold outline-none focus:border-blue-500"
                    />
                    <span className="text-xs text-gray-400">Ks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

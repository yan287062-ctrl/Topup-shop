'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';

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

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [addBalanceInputs, setAddBalanceInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const fetchAdminData = async () => {
    try {
      // ဈေးနှုန်းများ ရယူခြင်း
      const priceRes = await fetch('/api/prices', { cache: 'no-store' });
      const priceData = await priceRes.json();
      if (priceData.data && priceData.data.length > 0) {
        setPackages(prev => {
          const updated = JSON.parse(JSON.stringify(prev));
          priceData.data.forEach((item: any) => {
            if (updated[item.game_id]) {
              updated[item.game_id] = updated[item.game_id].map((p: any) =>
                p.id === item.id ? { ...p, price: item.price } : p
              );
            }
          });
          return updated;
        });
      }

      // User Profiles & Orders ရယူခြင်း
      const adminRes = await fetch('/api/admin', { cache: 'no-store' });
      const adminData = await adminRes.json();
      if (adminData.profiles) setProfiles(adminData.profiles);
      if (adminData.orders) setOrders(adminData.orders);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'painggyi123') {
      setIsAdmin(true);
    } else {
      alert('Password မှားယွင်းနေပါသည်');
    }
  };

  const handleAddBalance = async (profileId: string) => {
    const amount = addBalanceInputs[profileId];
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('ငွေပမာဏ မှန်ကန်စွာ ထည့်သွင်းပါ');
      return;
    }

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_balance',
          profileId,
          amount: Number(amount)
        })
      });
      const result = await res.json();
      if (result.success) {
        alert('✅ လက်ကျန်ငွေ ဖြည့်သွင်းပြီးပါပြီ');
        setAddBalanceInputs(prev => ({ ...prev, [profileId]: '' }));
        fetchAdminData();
      } else {
        alert('အမှားဖြစ်သွားပါသည်: ' + result.error);
      }
    } catch (err: any) {
      alert('အမှားဖြစ်သွားပါသည်: ' + err.message);
    }
  };

  const handleOrderStatus = async (orderId: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_order',
          orderId,
          status
        })
      });
      const result = await res.json();
      if (result.success) {
        alert(`✅ Order ${status === 'approved' ? 'ခွင့်ပြုပြီးပါပြီ' : 'ပယ်ဖျက်ပြီးပါပြီ'}`);
        fetchAdminData();
      } else {
        alert('အမှားဖြစ်သွားပါသည်: ' + result.error);
      }
    } catch (err: any) {
      alert('အမှားဖြစ်သွားပါသည်: ' + err.message);
    }
  };

  const handlePriceChange = async (gameId: string, pkgId: string, newPrice: number) => {
    try {
      const currentPkg = packages[gameId]?.find(p => p.id === pkgId);
      const res = await fetch('/api/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pkgId,
          game_id: gameId,
          package_name: currentPkg?.name || pkgId,
          price: Number(newPrice),
        }),
      });

      const result = await res.json();
      if (!res.ok || result.error) throw new Error(result.error || 'Update failed');

      setPackages(prev => {
        const gamePkgs = prev[gameId] || [];
        const updated = gamePkgs.map(p => p.id === pkgId ? { ...p, price: Number(newPrice) } : p);
        return { ...prev, [gameId]: updated };
      });
      alert('✅ ဈေးနှုန်း အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ');
    } catch (err: any) {
      alert('ဈေးနှုန်းပြင်ရန် အမှားဖြစ်နေသည်: ' + (err.message || err));
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a1220] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-[#111e33] border border-blue-900/50 p-6 rounded-2xl max-w-sm w-full space-y-4">
          <h2 className="text-xl font-bold text-center text-white">Admin Control Login</h2>
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-[#0a1220] border border-gray-700 p-3 rounded-xl text-white outline-none focus:border-blue-500"
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1220] text-gray-100 p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#111e33] p-4 rounded-xl border border-blue-900/40">
        <h1 className="text-xl font-bold text-blue-400">Paing Gyi Shop Admin Control</h1>
        <div className="flex gap-3">
          <button onClick={fetchAdminData} className="bg-blue-600 hover:bg-blue-500 text-xs px-3 py-1.5 rounded-lg text-white font-medium">
            🔄 Refresh Data
          </button>
          <button onClick={() => setIsAdmin(false)} className="bg-red-600/80 hover:bg-red-600 text-xs px-3 py-1.5 rounded-lg text-white font-medium">
            Admin Logout
          </button>
        </div>
      </div>

      {/* User Balance Management */}
      <div className="bg-[#111e33] p-6 rounded-2xl border border-blue-900/30 space-y-4">
        <h2 className="text-lg font-bold text-yellow-400">💰 User Balance စီမံရန် (ငွေဖြည့်ပေးရန်)</h2>
        {profiles.length === 0 ? (
          <p className="text-xs text-gray-400">User မရှိသေးပါ</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profiles.map(p => (
              <div key={p.id} className="bg-[#0a1220] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-semibold text-white text-xs break-all">{p.email || p.id}</p>
                  <p className="text-yellow-400 text-xs font-bold">လက်ကျန်: {p.balance || 0} Ks</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="Ks"
                    value={addBalanceInputs[p.id] || ''}
                    onChange={e => setAddBalanceInputs({ ...addBalanceInputs, [p.id]: e.target.value })}
                    className="w-20 bg-[#111e33] border border-gray-700 px-2 py-1 rounded text-xs text-white outline-none focus:border-yellow-400"
                  />
                  <button
                    onClick={() => handleAddBalance(p.id)}
                    className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1.5 rounded font-bold transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Voucher / Order Management */}
      <div className="bg-[#111e33] p-6 rounded-2xl border border-blue-900/30 space-y-4">
        <h2 className="text-lg font-bold text-yellow-400">📦 ဘောက်ချာ စီမံခန့်ခွဲမှု (Approve / Reject)</h2>
        {orders.length === 0 ? (
          <p className="text-xs text-gray-400">ဘောက်ချာ မရှိသေးပါ</p>
        ) : (
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="bg-[#0a1220] p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row justify-between md:items-center gap-3">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{o.package_name}</span>
                    <span className="text-yellow-400 font-semibold">({o.price} Ks)</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      o.status === 'approved' ? 'bg-green-900/60 text-green-400' :
                      o.status === 'rejected' ? 'bg-red-900/60 text-red-400' : 'bg-yellow-900/60 text-yellow-400'
                    }`}>
                      {o.status || 'pending'}
                    </span>
                  </div>
                  <p className="text-gray-400">
                    Game: <span className="text-gray-200">{o.game_name || o.game_id}</span> | Player ID: <span className="text-blue-400 font-mono">{o.player_id} {o.zone_id ? `(${o.zone_id})` : ''}</span>
                  </p>
                  {o.slip_url && (
                    <a href={o.slip_url} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300 block">
                      📎 ငွေလွှဲပြေစာ (Slip) ကြည့်ရန်
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOrderStatus(o.id, 'approved')}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded font-medium transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleOrderStatus(o.id, 'rejected')}
                    className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded font-medium transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game Price Management */}
      <div className="bg-[#111e33] p-6 rounded-2xl border border-blue-900/30 space-y-6">
        <h2 className="text-lg font-bold text-yellow-400">⚙️ ဂိမ်းပစ္စည်းဈေးနှုန်းများ ပြင်ဆင်ရန်</h2>
        {Object.entries(packages).map(([gameId, pkgs]) => (
          <div key={gameId} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 border-b border-blue-900/40 pb-1">
              {gameId.replace(/_/g, ' ')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {pkgs.map(pkg => (
                <div key={pkg.id} className="bg-[#0a1220] p-3 rounded-xl border border-gray-800 flex justify-between items-center gap-3">
                  <span className="text-xs text-gray-300 font-medium">{pkg.name}</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      defaultValue={pkg.price}
                      onBlur={e => handlePriceChange(gameId, pkg.id, Number(e.target.value))}
                      className="w-24 bg-[#111e33] border border-blue-900/60 rounded px-2 py-1 text-right text-xs text-yellow-400 outline-none focus:border-yellow-400"
                    />
                    <span className="text-[10px] text-gray-400">Ks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

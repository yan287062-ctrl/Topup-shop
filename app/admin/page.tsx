'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

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

export default function AdminPage() {
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  const [orders, setOrders] = useState<any[]>([]);
  const [profilesList, setProfilesList] = useState<any[]>([]);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [addBalanceInputs, setAddBalanceInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchOrders();
      fetchProfiles();
      fetchPricesFromDB();
    }
  }, [isAdminLoggedIn]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === 'admin' && adminPass === 'admin12345') {
      setIsAdminLoggedIn(true);
    } else {
      alert('Username သို့မဟုတ် Password မှားယွင်းနေပါသည်။');
    }
  };

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  const fetchProfiles = async () => {
    const { data } = await supabase.from('profiles').select('*');
    if (data) setProfilesList(data);
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

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    fetchOrders();
    if (status === 'completed') {
      alert('✅ အော်ဒါကို Approve ပြုလုပ်လိုက်ပါပြီ။');
    }
  };

  const handleAddBalanceToUser = async (profileId: string, currentBal: number) => {
    const amountStr = addBalanceInputs[profileId];
    if (!amountStr || isNaN(Number(amountStr)) || Number(amountStr) <= 0) {
      alert('ဖြည့်လိုသော ပမာဏကို မှန်ကန်စွာ ရိုက်ထည့်ပါ');
      return;
    }

    const newBal = (currentBal || 0) + Number(amountStr);
    const { error } = await supabase
      .from('profiles')
      .update({ balance: newBal })
      .eq('id', profileId);

    if (error) {
      alert('Balance ဖြည့်ရာတွင် အမှားဖြစ်ပါသည်: ' + error.message);
    } else {
      alert(`✅ User ထံသို့ Balance ${Number(amountStr).toLocaleString()} Ks ထည့်ပေးလိုက်ပါပြီ!`);
      setAddBalanceInputs(prev => ({ ...prev, [profileId]: '' }));
      fetchProfiles();
    }
  };

  const handlePriceChange = async (gameId: string, pkgId: string, newPrice: number) => {
    const { error } = await supabase
      .from('prices')
      .update({ price: newPrice })
      .eq('game_id', gameId)
      .eq('id', pkgId);

    if (error) {
      alert('ဈေးနှုန်းပြင်ရန် အမှားဖြစ်နေသည်: ' + error.message);
    } else {
      setPackages(prev => {
        const gamePkgs = prev[gameId] || [];
        const updated = gamePkgs.map(p => p.id === pkgId ? { ...p, price: newPrice } : p);
        return { ...prev, [gameId]: updated };
      });
      alert('ဈေးနှုန်း အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1220] text-gray-100 font-sans p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-[#1A3054]/60 backdrop-blur-2xl p-4 rounded-3xl border border-[#C0CAFF]/30">
          <h1 className="text-lg font-bold text-white tracking-wide">Paing Gyi Shop <span className="text-[#C0CAFF]">Admin Control</span></h1>
          {isAdminLoggedIn && (
            <button onClick={() => setIsAdminLoggedIn(false)} className="px-3 py-1.5 bg-rose-600/80 rounded-xl text-xs font-bold text-white hover:bg-rose-700">
              Admin Logout
            </button>
          )}
        </div>

        {!isAdminLoggedIn ? (
          <div className="bg-[#1A3054]/60 backdrop-blur-2xl p-6 rounded-3xl border border-[#C0CAFF]/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] max-w-sm mx-auto">
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <h3 className="text-sm font-bold text-[#C0CAFF] text-center">🔐 Admin Login</h3>
              <input
                type="text"
                placeholder="Username"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 p-3 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C0CAFF]"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 p-3 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C0CAFF]"
                required
              />
              <button type="submit" className="w-full bg-[#C0CAFF] hover:bg-white font-bold py-3 rounded-2xl text-xs text-[#1A3054] shadow-[0_0_15px_rgba(192,202,255,0.4)]">
                Admin Dashboard ဝင်မည်
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {/* User Balance Section */}
            <div className="p-4 bg-[#0e1b30]/80 backdrop-blur rounded-2xl border border-[#C0CAFF]/30 space-y-3 shadow-inner">
              <h3 className="text-sm font-bold text-[#C0CAFF]">💰 User Balance စီမံရန် (ငွေဖြည့်ပေးရန်)</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {profilesList.length === 0 ? (
                  <p className="text-xs text-gray-400">User မရှိသေးပါ။</p>
                ) : (
                  profilesList.map((prof) => (
                    <div key={prof.id} className="p-3 bg-[#1A3054]/80 backdrop-blur rounded-2xl border border-[#C0CAFF]/30 text-xs flex justify-between items-center">
                      <div>
                        <p className="font-mono text-white font-semibold text-[11px]">User ID: {prof.id.slice(0, 8)}...</p>
                        <p className="text-[#C0CAFF] font-bold mt-0.5">Balance: {(prof.balance || 0).toLocaleString()} Ks</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          placeholder="+ Ks"
                          value={addBalanceInputs[prof.id] || ''}
                          onChange={(e) => setAddBalanceInputs({ ...addBalanceInputs, [prof.id]: e.target.value })}
                          className="w-20 bg-[#0e1b30]/80 backdrop-blur border border-[#C0CAFF]/30 p-1.5 rounded-xl text-xs text-white"
                        />
                        <button
                          onClick={() => handleAddBalanceToUser(prof.id, prof.balance || 0)}
                          className="bg-[#C0CAFF] text-[#1A3054] hover:bg-white px-2.5 py-1.5 rounded-xl text-[11px] font-bold"
                        >
                          + ဖြည့်မည်
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Orders Section */}
            <div className="p-4 bg-[#0e1b30]/80 backdrop-blur rounded-2xl border border-[#C0CAFF]/30 space-y-3 shadow-inner">
              <h3 className="text-sm font-bold text-[#C0CAFF]">📦 အော်ဒါ စီမံခန့်ခွဲမှု (Approve / Reject)</h3>
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {orders.length === 0 ? (
                  <p className="text-xs text-gray-400">အော်ဒါ မရှိသေးပါ။</p>
                ) : (
                  orders.map((ord) => (
                    <div key={ord.id} className="p-3.5 bg-[#1A3054]/80 backdrop-blur rounded-2xl border border-[#C0CAFF]/30 text-xs flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <p className="font-bold text-white text-xs">{ord.game_name} - {ord.package_name}</p>
                        <p className="text-[#C0CAFF] text-[11px] mt-0.5">ID: {ord.player_id} ({ord.zone_id || '-'}) | {ord.price.toLocaleString()} Ks</p>
                        {ord.slip_url && ord.slip_url !== 'Wallet Balance Payment' && ord.slip_url !== 'No Slip' && (
                          <a href={ord.slip_url} target="_blank" rel="noreferrer" className="text-[#C0CAFF] font-bold underline block mt-1">📷 Slip ကြည့်ရန်</a>
                        )}
                        {ord.slip_url === 'Wallet Balance Payment' && (
                          <span className="text-emerald-400 font-bold block mt-1">💳 Paid with Wallet</span>
                        )}
                        <p className="text-[10px] text-gray-300 mt-1">
                          Status: <span className={`font-bold ${ord.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}>{ord.status.toUpperCase()}</span>
                        </p>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => updateStatus(ord.id, 'completed')} className="bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-xl text-[10px] font-bold text-white">Approve</button>
                        <button onClick={() => updateStatus(ord.id, 'rejected')} className="bg-rose-600 hover:bg-rose-500 px-3 py-1.5 rounded-xl text-[10px] font-bold text-white">Reject</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Price Edit Section */}
            <div className="p-4 bg-[#0e1b30]/80 backdrop-blur rounded-2xl border border-[#C0CAFF]/30 space-y-3 shadow-inner">
              <h3 className="text-sm font-bold text-[#C0CAFF]">⚙️ ဂိမ်းပစ္စည်းဈေးနှုန်းများ ပြင်ဆင်ရန်</h3>
              {Object.entries(packages).map(([gameId, pkgs]) => (
                <div key={gameId} className="space-y-2 border-t border-[#C0CAFF]/20 pt-2">
                  <p className="text-xs font-bold text-[#C0CAFF] uppercase">{gameId}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pkgs.map((pkg) => (
                      <div key={pkg.id} className="flex justify-between items-center text-xs gap-2 p-2 bg-[#1A3054]/40 rounded-xl">
                        <span className="text-gray-300">{pkg.name}</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            defaultValue={pkg.price}
                            onBlur={(e) => handlePriceChange(gameId, pkg.id, Number(e.target.value))}
                            className="w-24 bg-[#1A3054]/80 backdrop-blur border border-[#C0CAFF]/30 p-1.5 rounded-xl text-right text-white text-xs"
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
        )}
      </div>
    </div>
  );
}

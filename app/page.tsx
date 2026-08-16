'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const BOT_TOKEN = '8916421457:AAFu5PmrlTX-czip1Hub8TLqVR8TWRvQiW4';
const CHAT_ID = '1934339791';

const GAMES = [
  { id: 'mlbb', name: 'Mobile Legends: Bang Bang', image: '/mlbb.jpg' },
  { id: 'pubg', name: 'PUBG Mobile UC', image: '/pubg.jpg' },
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

export default function Home() {
  const [activeTab, setActiveTab] = useState<'shop' | 'wallet' | 'admin'>('shop');
  const [selectedGame, setSelectedGame] = useState<typeof GAMES[0] | null>(null);
  
  const [balance, setBalance] = useState(0);
  const [currentAuthUser, setCurrentAuthUser] = useState<any>(null);

  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [selectedPkg, setSelectedPkg] = useState<{ id: string; name: string; price: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'slip' | 'wallet'>('slip');
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Wallet states
  const [topupAmount, setTopupAmount] = useState('');
  const [topupSlip, setTopupSlip] = useState<File | null>(null);
  const [topupNote, setTopupNote] = useState('');
  const [topupLoading, setTopupLoading] = useState(false);

  // Admin states
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [profilesList, setProfilesList] = useState<any[]>([]);
  const [addBalanceInputs, setAddBalanceInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchPricesFromDB();
    fetchUserBalance();
  }, []);

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
      setPackages(grouped);
    }
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
        if (balance < selectedPkg.price) {
          alert('Wallet ထဲတွင် လက်ကျန်ငွေ မလုံလောက်ပါ။ ကျေးဇူးပြု၍ ငွေကြိုဖြည့်ပါ။');
          setLoading(false);
          return;
        }

        const newBalance = balance - selectedPkg.price;
        if (currentAuthUser) {
          const { error: balanceError } = await supabase
            .from('profiles')
            .update({ balance: newBalance })
            .eq('id', currentAuthUser.id);

          if (balanceError) throw balanceError;
        }

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

  const handleTopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        `👤 User Auth ID: ${currentAuthUser ? currentAuthUser.id : 'Guest'}\n` +
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

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === 'admin' && adminPass === 'admin12345') {
      setIsAdminLoggedIn(true);
      fetchOrders();
      fetchProfiles();
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

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    fetchOrders();
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
      fetchUserBalance();
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
    <div className="min-h-screen bg-[#FDF1E2] text-[#655A7C] p-4 font-sans pb-12">
      <header className="flex justify-between items-center max-w-3xl mx-auto py-3 border-b border-[#655A7C]/20">
        <div className="flex items-center gap-3">
          {selectedGame && activeTab === 'shop' && (
            <button 
              onClick={() => { setSelectedGame(null); setStatusMsg(''); }}
              className="text-[#655A7C] text-xs font-bold bg-white hover:bg-[#AB92BF]/20 px-3 py-1.5 rounded-xl border border-[#AB92BF]/40 transition-all"
            >
              ← နောက်သို့
            </button>
          )}
          <img 
            src="/logo.jpg" 
            alt="Paing Gyi shop Logo" 
            className="w-10 h-10 object-cover rounded-xl border-2 border-[#AB92BF]" 
          />
          <h1 className="text-xl font-extrabold tracking-wide text-[#655A7C]">
            Paing Gyi shop
          </h1>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('shop')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'shop' ? 'bg-[#AB92BF] text-white' : 'bg-white text-[#655A7C] border border-[#AB92BF]/30'}`}>Shop</button>
          <button onClick={() => setActiveTab('wallet')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'wallet' ? 'bg-[#AB92BF] text-white' : 'bg-white text-[#655A7C] border border-[#AB92BF]/30'}`}>Wallet ({balance.toLocaleString()} Ks)</button>
          <button onClick={() => setActiveTab('admin')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'admin' ? 'bg-[#AB92BF] text-white' : 'bg-white text-[#655A7C] border border-[#AB92BF]/30'}`}>Admin</button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto mt-6">
        {activeTab === 'shop' && (
          !selectedGame ? (
            <div className="space-y-6">
              <div className="bg-[#655A7C] text-[#FDF1E2] p-6 rounded-2xl border border-[#655A7C] shadow-xl flex justify-between items-center">
                <div>
                  <span className="bg-[#AB92BF] text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full">24 HOURS</span>
                  <h2 className="text-xl font-bold mt-2 text-white">ငွေဖြည့်ထားရုံနဲ့ 24 hr စိတ်ကြိုက်</h2>
                  <p className="text-xs text-[#FDF1E2]/80 mt-1">Game Item ပေါင်းများစွာကို တစ်နေရာတည်းမှာ လွယ်ကူစွာ ဝယ်ယူနိုင်ပြီ</p>
                </div>
                <div className="text-right bg-[#AB92BF]/20 p-3 rounded-xl border border-[#AB92BF]/40">
                  <p className="text-[10px] text-[#FDF1E2]/80">Wallet Balance</p>
                  <p className="text-lg font-black text-white">{balance.toLocaleString()} Ks</p>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#655A7C] flex items-center gap-2 mb-4">🔥 ယခုခေတ်စားနေသော</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
                  {GAMES.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className="bg-white border border-[#AB92BF]/30 hover:border-[#AB92BF] rounded-2xl p-4 cursor-pointer text-center flex flex-col items-center justify-center space-y-3 group shadow-md transition-all"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#AB92BF]/40 group-hover:border-[#AB92BF] bg-[#FDF1E2]">
                        <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs font-semibold text-[#655A7C] group-hover:text-[#AB92BF] px-1">{game.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white p-4 rounded-2xl border border-[#AB92BF]/30 flex items-center gap-3.5 shadow-md">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#AB92BF]/40 shrink-0 bg-[#FDF1E2]">
                  <img src={selectedGame.image} alt={selectedGame.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#655A7C]">{selectedGame.name}</h2>
                  <p className="text-xs text-[#655A7C]/70">ဂိမ်း ID ဖြည့်သွင်းပြီး စိန်/UC များ ဝယ်ယူပါ</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#AB92BF]/30 space-y-3 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#AB92BF] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <h3 className="text-sm font-semibold text-[#655A7C]">အကောင့်အချက်အလက်</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full bg-[#FDF1E2]/40 border border-[#AB92BF]/40 rounded-xl p-3 text-xs text-[#655A7C] placeholder-[#655A7C]/50 focus:outline-none focus:border-[#655A7C]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Zone ID (optional)"
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    className="w-full bg-[#FDF1E2]/40 border border-[#AB92BF]/40 rounded-xl p-3 text-xs text-[#655A7C] placeholder-[#655A7C]/50 focus:outline-none focus:border-[#655A7C]"
                  />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#AB92BF]/30 space-y-3 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#AB92BF] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <h3 className="text-sm font-semibold text-[#655A7C]">ပက်ကေ့ဂျ် ရွေးချယ်ပါ</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                  {(packages[selectedGame.id] || []).map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkg(pkg)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedPkg?.id === pkg.id ? 'border-[#AB92BF] bg-[#AB92BF]/15 shadow-md' : 'border-[#AB92BF]/20 bg-[#FDF1E2]/30'
                      }`}
                    >
                      <p className="text-xs font-semibold text-[#655A7C]">{pkg.name}</p>
                      <p className="text-xs font-bold text-[#655A7C] mt-1">{pkg.price.toLocaleString()} Ks</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#AB92BF]/30 space-y-3 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#AB92BF] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <h3 className="text-sm font-semibold text-[#655A7C]">ငွေပေးချေမှု နည်းလမ်း</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                      paymentMethod === 'wallet'
                        ? 'border-[#AB92BF] bg-[#AB92BF] text-white shadow-md'
                        : 'border-[#AB92BF]/30 bg-[#FDF1E2]/40 text-[#655A7C]'
                    }`}
                  >
                    💳 Wallet Balance
                    <span className="block text-[10px] font-normal opacity-90 mt-0.5">လက်ကျန်: {balance.toLocaleString()} Ks</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('slip')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                      paymentMethod === 'slip'
                        ? 'border-[#AB92BF] bg-[#AB92BF] text-white shadow-md'
                        : 'border-[#AB92BF]/30 bg-[#FDF1E2]/40 text-[#655A7C]'
                    }`}
                  >
                    🧾 Direct Slip Upload
                    <span className="block text-[10px] font-normal opacity-90 mt-0.5">ငွေလွှဲစလစ် တင်မည်</span>
                  </button>
                </div>

                {paymentMethod === 'slip' ? (
                  <>
                    <div className="p-3 bg-[#FDF1E2] rounded-xl border border-[#AB92BF]/40 text-xs text-[#655A7C]">
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
                      className="w-full bg-[#FDF1E2]/40 border border-[#AB92BF]/40 rounded-xl p-3 text-xs text-[#655A7C] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#AB92BF] file:text-white hover:file:bg-[#655A7C]"
                      required
                    />
                  </>
                ) : (
                  <div className="p-3.5 bg-[#FDF1E2] rounded-xl border border-[#AB92BF]/40 text-xs text-[#655A7C] space-y-1">
                    <p className="font-bold">✨ Wallet Balance ဖြင့် တိုက်ရိုက် ဝယ်ယူမည်</p>
                    <p className="text-[11px] text-[#655A7C]/80">
                      ကျသင့်ငွေ: <strong>{selectedPkg ? selectedPkg.price.toLocaleString() : 0} Ks</strong> | 
                      လက်ကျန်ငွေ: <strong>{balance.toLocaleString()} Ks</strong>
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#AB92BF] hover:bg-[#655A7C] text-white font-bold py-3.5 rounded-2xl transition-all disabled:opacity-50 text-sm shadow-md"
              >
                {loading ? 'အော်ဒါ ပို့နေပါသည်...' : (paymentMethod === 'wallet' ? 'Wallet ဖြင့် တိုက်ရိုက် ဝယ်ယူမည်' : 'ယခု ဝယ်ယူမည်')}
              </button>

              {statusMsg && (
                <div className="p-3 text-center text-xs rounded-xl bg-white border border-[#AB92BF] text-[#655A7C] font-semibold">
                  {statusMsg}
                </div>
              )}
            </form>
          )
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <div className="bg-[#655A7C] text-[#FDF1E2] p-6 rounded-2xl border border-[#655A7C] shadow-xl">
              <h3 className="text-sm text-[#FDF1E2]/80">လက်ရှိလက်ကျန်ငွေ</h3>
              <p className="text-3xl font-extrabold text-white mt-1">{balance.toLocaleString()} Ks</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#AB92BF]/30 space-y-3.5 shadow-md">
              <h3 className="text-sm font-bold text-[#655A7C] flex items-center gap-2">💳 ငွေလွှဲပေးချေမှု</h3>
              
              {[
                { name: 'Wave', num: '09967241357', owner: 'U Ye Paing Oo', image: '/wave.jpg' },
                { name: 'K pay', num: '09967241357', owner: 'U Ye Paing Oo', image: '/kpay.jpg' },
                { name: 'AYA PAY', num: '09967241357', owner: 'U Ye Paing Oo', image: '/ayapay.jpg' },
                { name: 'UAB Pay', num: '09967241357', owner: 'U Ye Paing Oo', image: '/uabpay.jpg' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3.5 bg-[#FDF1E2]/30 rounded-xl border border-[#AB92BF]/20 hover:border-[#AB92BF] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-white border border-[#AB92BF]/30 shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#655A7C]">{item.name}</p>
                      <p className="text-[11px] text-[#655A7C]/70 font-medium">{item.owner}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono font-bold text-[#655A7C]">{item.num}</p>
                    <span className="text-[10px] text-white bg-[#AB92BF] px-2 py-0.5 rounded-md">ငွေလွှဲရန်</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleTopupSubmit} className="bg-white p-6 rounded-2xl border border-[#AB92BF]/30 space-y-4 shadow-md">
              <h3 className="text-sm font-bold text-[#655A7C]">ငွေဖြည့်တောင်းဆိုရန်</h3>
              <input 
                type="number" 
                placeholder="ပမာဏ (Ks) - ဥပမာ 10000" 
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                className="w-full bg-[#FDF1E2]/40 border border-[#AB92BF]/40 p-4 rounded-xl text-xs text-[#655A7C] placeholder-[#655A7C]/50 focus:outline-none focus:border-[#655A7C]" 
                required
              />
              
              <div className="border-2 border-dashed border-[#AB92BF]/40 p-6 rounded-xl text-center cursor-pointer hover:border-[#AB92BF] bg-[#FDF1E2]/20">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setTopupSlip(e.target.files[0]);
                    }
                  }}
                  className="w-full text-xs text-[#655A7C] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#AB92BF] file:text-white"
                  required
                />
                <p className="text-[10px] text-[#655A7C]/60 mt-2">ငွေလွှဲစလစ်ပုံ တင်ပါ (Max 5MB)</p>
              </div>

              <textarea 
                placeholder="မှတ်ချက် (ရွေးချယ်ရန်) - မိမိပြောလိုသည့် မှတ်ချက်များ..." 
                value={topupNote}
                onChange={(e) => setTopupNote(e.target.value)}
                className="w-full bg-[#FDF1E2]/40 border border-[#AB92BF]/40 p-4 rounded-xl text-xs text-[#655A7C] placeholder-[#655A7C]/50 focus:outline-none focus:border-[#655A7C] h-24" 
              />
              
              <button 
                type="submit"
                disabled={topupLoading}
                className="w-full bg-[#AB92BF] hover:bg-[#655A7C] text-white font-bold py-3.5 rounded-xl transition-all text-sm disabled:opacity-50 shadow-md"
              >
                {topupLoading ? 'ပို့ဆောင်နေပါသည်...' : 'တောင်းဆိုချက်တင်မည်'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="bg-white p-6 rounded-2xl border border-[#AB92BF]/30 shadow-md">
            {!isAdminLoggedIn ? (
              <form onSubmit={handleAdminLogin} className="space-y-3">
                <h3 className="text-sm font-bold text-[#655A7C]">Admin Login</h3>
                <input type="text" placeholder="Username" value={adminUser} onChange={(e) => setAdminUser(e.target.value)} className="w-full bg-[#FDF1E2]/40 border border-[#AB92BF]/40 p-3 rounded-xl text-xs text-[#655A7C] placeholder-[#655A7C]/50 focus:outline-none focus:border-[#655A7C]" />
                <input type="password" placeholder="Password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} className="w-full bg-[#FDF1E2]/40 border border-[#AB92BF]/40 p-3 rounded-xl text-xs text-[#655A7C] placeholder-[#655A7C]/50 focus:outline-none focus:border-[#655A7C]" />
                <button type="submit" className="w-full bg-[#AB92BF] hover:bg-[#655A7C] font-bold py-3 rounded-xl text-xs text-white">Admin Dashboard ဝင်မည်</button>
              </form>
            ) : (
              <div className="space-y-6">
                {/* 1. User Balance Manager */}
                <div className="p-4 bg-[#FDF1E2]/40 rounded-xl border border-[#AB92BF]/30 space-y-3">
                  <h3 className="text-sm font-bold text-[#655A7C]">💰 User Balance စီမံရန် (ငွေဖြည့်ပေးရန်)</h3>
                  <div className="space-y-2">
                    {profilesList.length === 0 ? (
                      <p className="text-xs text-[#655A7C]/70">User မရှိသေးပါ သို့မဟုတ် profiles table ကင်းလွတ်နေပါသည်။</p>
                    ) : (
                      profilesList.map((prof) => (
                        <div key={prof.id} className="p-3 bg-white rounded-xl border border-[#AB92BF]/30 text-xs flex justify-between items-center">
                          <div>
                            <p className="font-mono text-[#655A7C] font-semibold text-[11px]">User ID: {prof.id.slice(0, 8)}...</p>
                            <p className="text-emerald-700 font-bold mt-0.5">Balance: {(prof.balance || 0).toLocaleString()} Ks</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <input 
                              type="number"
                              placeholder="+ Ks"
                              value={addBalanceInputs[prof.id] || ''}
                              onChange={(e) => setAddBalanceInputs({ ...addBalanceInputs, [prof.id]: e.target.value })}
                              className="w-20 bg-[#FDF1E2]/50 border border-[#AB92BF]/40 p-1.5 rounded text-xs text-[#655A7C]"
                            />
                            <button 
                              onClick={() => handleAddBalanceToUser(prof.id, prof.balance || 0)}
                              className="bg-[#AB92BF] hover:bg-[#655A7C] text-white px-2.5 py-1.5 rounded text-[11px] font-bold"
                            >
                              + ဖြည့်မည်
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 2. Order Approval Manager */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#655A7C]">📦 အော်ဒါ စီမံခန့်ခွဲမှု (Approve / Reject)</h3>
                  <div className="space-y-2">
                    {orders.map((ord) => (
                      <div key={ord.id} className="p-3 bg-[#FDF1E2]/30 rounded-xl border border-[#AB92BF]/30 text-xs flex justify-between items-center">
                        <div>
                          <p className="font-bold text-[#655A7C]">{ord.game_name} - {ord.package_name}</p>
                          <p className="text-[#655A7C]/80">ID: {ord.player_id} ({ord.zone_id || '-'}) | {ord.price} Ks</p>
                          {ord.slip_url && ord.slip_url !== 'Wallet Balance Payment' && ord.slip_url !== 'No Slip' && (
                            <a href={ord.slip_url} target="_blank" rel="noreferrer" className="text-[#AB92BF] font-bold underline block mt-1">📷 Slip ကြည့်ရန်</a>
                          )}
                          {ord.slip_url === 'Wallet Balance Payment' && (
                            <span className="text-emerald-600 font-bold block mt-1">💳 Paid with Wallet</span>
                          )}
                          <p className="text-[10px] text-[#655A7C] mt-1 font-semibold">Status: <span className="uppercase">{ord.status}</span></p>
                        </div>
                        <div className="flex gap-1 flex-col">
                          <button onClick={() => updateStatus(ord.id, 'completed')} className="bg-emerald-600 px-3 py-1.5 rounded text-[10px] font-bold text-white shadow-sm">Approve</button>
                          <button onClick={() => updateStatus(ord.id, 'rejected')} className="bg-rose-600 px-3 py-1.5 rounded text-[10px] font-bold text-white shadow-sm">Reject</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Price Manager */}
                <div className="p-4 bg-[#FDF1E2]/40 rounded-xl border border-[#AB92BF]/30 space-y-3">
                  <h3 className="text-sm font-bold text-[#655A7C]">⚙️ ဂိမ်းပစ္စည်းဈေးနှုန်းများ ပြင်ဆင်ရန်</h3>
                  {Object.entries(packages).map(([gameId, pkgs]) => (
                    <div key={gameId} className="space-y-2 border-t border-[#AB92BF]/20 pt-2">
                      <p className="text-xs font-bold text-[#655A7C] uppercase">{gameId}</p>
                      {pkgs.map((pkg) => (
                        <div key={pkg.id} className="flex justify-between items-center text-xs gap-2">
                          <span className="text-[#655A7C]">{pkg.name}</span>
                          <div className="flex items-center gap-2">
                            <input 
                              type="number"
                              defaultValue={pkg.price}
                              onBlur={(e) => handlePriceChange(gameId, pkg.id, Number(e.target.value))}
                              className="w-24 bg-white border border-[#AB92BF]/40 p-1 rounded text-right text-[#655A7C]"
                            />
                            <span className="text-[10px] text-[#655A7C]/70">Ks</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

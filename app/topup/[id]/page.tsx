'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import BottomNav from '../../../components/BottomNav';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase'; 

export default function TopupPage() {
  const params = useParams();
  const rawId = (params?.id as string) || '';
  const id = rawId.toLowerCase();

  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [aid, setAid] = useState('');
  const [serverField, setServerField] = useState('Global');
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [orderCount, setOrderCount] = useState(0);

  // 🌟 Auto Check အတွက် State များ 🌟
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [idCheckResult, setIdCheckResult] = useState<{ status: 'idle' | 'success' | 'error', name: string, region: string, flag: string }>({ status: 'idle', name: '', region: '', flag: '' });
  
  // Timer for debouncing auto-check
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    };
    fetchUser();
  }, []);

  const adminAccounts: Record<string, {name: string, phone: string}> = {
    kpay: { name: 'Paing Gyi', phone: '09755008854' },
    wave: { name: 'Paing Gyi', phone: '09967241375' },
    ayapay: { name: 'Paing Gyi', phone: '09967241375' },
    uabpay: { name: 'Paing Gyi', phone: '09967241375' }
  };

  const mlbbPackages = [
    { id: 'mlbb_1', name: '55 Diamonds', price: 3461 }, { id: 'mlbb_2', name: '165 Diamonds', price: 10372 },
    { id: 'mlbb_3', name: '275 Diamonds', price: 16636 }, { id: 'mlbb_4', name: '565 Diamonds', price: 34160 },
    { id: 'mlbb_5', name: 'Weekly Pass', price: 6600 }, { id: 'mlbb_6', name: 'Weekly Pass x 2', price: 13200 },
    { id: 'mlbb_7', name: 'Weekly Pass x 3', price: 19800 }, { id: 'mlbb_8', name: 'Weekly Pass x 4', price: 26400 },
    { id: 'mlbb_9', name: 'Weekly Pass x 5', price: 33000 }, { id: 'mlbb_10', name: 'Twilight Pass', price: 35712 },
    { id: 'mlbb_11', name: 'Weekly Elite Bundle', price: 3461 }, { id: 'mlbb_12', name: 'Monthly Epic Bundle', price: 17434 },
    { id: 'mlbb_13', name: '86 Diamonds', price: 5457 }, { id: 'mlbb_14', name: '172 Diamonds', price: 10824 },
    { id: 'mlbb_15', name: '257 Diamonds', price: 15678 }, { id: 'mlbb_16', name: '343 Diamonds', price: 21134 },
    { id: 'mlbb_17', name: '429 Diamonds', price: 26502 }, { id: 'mlbb_18', name: '514 Diamonds', price: 31355 },
    { id: 'mlbb_19', name: '600 Diamonds', price: 36812 }, { id: 'mlbb_20', name: '705 Diamonds', price: 42588 },
    { id: 'mlbb_21', name: '792 Diamonds', price: 48045 }, { id: 'mlbb_22', name: '878 Diamonds', price: 53412 },
    { id: 'mlbb_23', name: '963 Diamonds', price: 58266 }, { id: 'mlbb_24', name: '1049 Diamonds', price: 63722 },
    { id: 'mlbb_25', name: '1135 Diamonds', price: 69090 }, { id: 'mlbb_26', name: '1220 Diamonds', price: 73943 },
    { id: 'mlbb_27', name: '1412 Diamonds', price: 85176 }, { id: 'mlbb_28', name: '1584 Diamonds', price: 96000 },
    { id: 'mlbb_29', name: '1669 Diamonds', price: 100854 }, { id: 'mlbb_30', name: '1755 Diamonds', price: 106310 },
    { id: 'mlbb_31', name: '1841 Diamonds', price: 111678 }, { id: 'mlbb_32', name: '2195 Diamonds', price: 128918 },
    { id: 'mlbb_33', name: '2538 Diamonds', price: 150052 }, { id: 'mlbb_34', name: '2901 Diamonds', price: 171506 },
    { id: 'mlbb_35', name: '3073 Diamonds', price: 182330 }, { id: 'mlbb_36', name: '3688 Diamonds', price: 215069 },
    { id: 'mlbb_37', name: '3945 Diamonds', price: 230747 }, { id: 'mlbb_38', name: '4031 Diamonds', price: 236204 },
    { id: 'mlbb_39', name: '4566 Diamonds', price: 268482 }, { id: 'mlbb_40', name: '5100 Diamonds', price: 300245 },
    { id: 'mlbb_41', name: '5532 Diamonds', price: 324734 }, { id: 'mlbb_42', name: '6055 Diamonds', price: 354812 },
    { id: 'mlbb_43', name: '6752 Diamonds', price: 398677 }, { id: 'mlbb_44', name: '7030 Diamonds', price: 415366 },
    { id: 'mlbb_45', name: '7727 Diamonds', price: 453651 }, { id: 'mlbb_46', name: '9288 Diamonds', price: 539360 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  const mcggPackages = [
    { id: 'mcgg_1', name: '10', bonus: '+ 1 Diamonds', price: 900 },
    { id: 'mcgg_2', name: '20', bonus: '+ 2 Diamonds', price: 1700 },
    { id: 'mcgg_3', name: '51', bonus: '+ 5 Diamonds', price: 4200 },
    { id: 'mcgg_4', name: 'Double Dia(50+50)or 55', bonus: 'No bonus', price: 4400 },
    { id: 'mcgg_5', name: '102', bonus: '+ 10 Diamonds', price: 8300 },
    { id: 'mcgg_6', name: 'Weekly Card', bonus: 'No bonus', price: 8800 },
    { id: 'mcgg_7', name: 'Double Dia(150+150)or 165', bonus: 'No bonus', price: 13000 },
    { id: 'mcgg_8', name: '203', bonus: '+ 20 Diamonds', price: 16600 },
    { id: 'mcgg_9', name: 'Double Dia(250+250) or 275', bonus: 'No bonus', price: 21500 },
    { id: 'mcgg_10', name: '303', bonus: '+ 33 Diamonds', price: 24900 },
    { id: 'mcgg_11', name: '504', bonus: '+ 66 Diamonds', price: 41400 },
    { id: 'mcgg_12', name: 'Double Dia(500+500)or 565', bonus: 'No bonus', price: 43400 },
    { id: 'mcgg_13', name: '1007', bonus: '+ 156 Diamonds', price: 82900 },
    { id: 'mcgg_14', name: '2015', bonus: '+ 383 Diamonds', price: 165700 },
    { id: 'mcgg_15', name: '5035', bonus: '+ 1007 Diamonds', price: 414100 }
  ];

  const pubgPackages = [
    { id: 'pubg_1', name: '60 UC', price: 4106 }, { id: 'pubg_2', name: '325 UC', price: 20529 },
    { id: 'pubg_3', name: '660 UC', price: 41059 }, { id: 'pubg_4', name: '985 UC', price: 61588 },
    { id: 'pubg_5', name: '1320 UC', price: 82118 }, { id: 'pubg_6', name: '1980 UC', price: 123177 },
    { id: 'pubg_7', name: '2310 UC', price: 143706 }, { id: 'pubg_8', name: '2640 UC', price: 164236 },
    { id: 'pubg_9', name: '3850 UC', price: 239512 }, { id: 'pubg_10', name: '4180 UC', price: 260041 },
    { id: 'pubg_11', name: '5900 UC', price: 367277 }, { id: 'pubg_12', name: '8100 UC', price: 504112 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  const ucPackPackages = [
    { id: 'ucp_1', name: 'First Purchase Pack', price: 4100 }, { id: 'ucp_2', name: 'Prime (1 Month)', price: 4100 },
    { id: 'ucp_3', name: 'Weekly Deal Pack 1', price: 4200 }, { id: 'ucp_4', name: 'Upgradable Firearm Materials Pack', price: 12300 },
    { id: 'ucp_5', name: 'Prime (3 Months)', price: 12300 }, { id: 'ucp_6', name: 'Weekly Mythic Emblem Value Pack', price: 12400 },
    { id: 'ucp_7', name: 'Weekly Deal Pack 2', price: 12400 }, { id: 'ucp_8', name: 'Mythic Emblem Pack', price: 20400 },
    { id: 'ucp_9', name: 'Prime (6 Months)', price: 24400 }, { id: 'ucp_10', name: 'Elite Pass LV1-50', price: 24800 },
    { id: 'ucp_11', name: 'Prime Plus (1 Month)', price: 40700 }, { id: 'ucp_12', name: 'Prime (12 Months)', price: 48800 },
    { id: 'ucp_13', name: 'Elite Pass LV1-100', price: 49700 }, { id: 'ucp_14', name: 'Prime Plus (3 Months)', price: 122000 },
    { id: 'ucp_15', name: 'Elite Pass Plus LV1-100', price: 123100 }, { id: 'ucp_16', name: 'Prime Plus (6 Months)', price: 243900 },
    { id: 'ucp_17', name: 'Prime Plus (12 Months)', price: 487800 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  const telegramPackages = [
    { id: 'tg_1', name: '50 Stars', price: 3552 }, { id: 'tg_2', name: '75 Stars', price: 5306 },
    { id: 'tg_3', name: '100 Stars', price: 7058 }, { id: 'tg_4', name: '150 Stars', price: 10587 },
    { id: 'tg_5', name: '250 Stars', price: 17645 }, { id: 'tg_6', name: '350 Stars', price: 24703 },
    { id: 'tg_7', name: '500 Stars', price: 35291 }, { id: 'tg_8', name: '750 Stars', price: 52936 },
    { id: 'tg_9', name: '1K Stars', price: 70582 }, { id: 'tg_10', name: '1.5K Stars', price: 105873 },
    { id: 'tg_11', name: '2.5K Stars', price: 176454 }, { id: 'tg_12', name: '5K Stars', price: 352908 },
    { id: 'tg_13', name: '10K Stars', price: 705816 }, { id: 'tg_14', name: '3 months premium', price: 56420 },
    { id: 'tg_15', name: '6 months premium', price: 75241 }, { id: 'tg_16', name: '12 months premium', price: 136412 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  const heartopiaPackages = [
    { id: 'heart_1', name: '20 Heart Diamond', price: 2588 }, { id: 'heart_2', name: '60 Heart Diamond', price: 4895 },
    { id: 'heart_3', name: '300+20 Heart Diamond', price: 24846 }, { id: 'heart_4', name: '680+50 Heart Diamond', price: 55994 },
    { id: 'heart_5', name: '1280+90 Heart Diamond', price: 102297 }, { id: 'heart_6', name: '1980+150 Heart Diamond', price: 155703 },
    { id: 'heart_7', name: '3280+270 Heart Diamond', price: 253623 }, { id: 'heart_8', name: '6480+570 Heart Diamond', price: 498398 },
    { id: 'heart_9', name: 'GAMG Junior Membership', price: 2681 }, { id: 'heart_10', name: 'GAMG Formal Membership', price: 15057 },
    { id: 'heart_11', name: 'Fashionwave Gift Box', price: 24846 }, { id: 'heart_12', name: 'Fashionwave Gift Box Upgrade', price: 31102 },
    { id: 'heart_13', name: 'Premium Fashionwave Gift Box', price: 55994 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  const smileCoinPackages = [
    { id: 'smile_1', name: 'Brl 300', price: 25800 },
    { id: 'smile_2', name: 'Brl 1000', price: 83800 },
    { id: 'smile_3', name: 'Brl 5000', price: 419000 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  const gameConfigs: Record<string, any> = {
    'mobile-legends': { name: 'Mobile Legends', sub: 'All Server', img: '/mlbb.png', packages: mlbbPackages, inputType: 'mlbb', dbCat: 'mlbb' },
    'mobile-legends-(mlbb)': { name: 'Mobile Legends', sub: 'All Server', img: '/mlbb.png', packages: mlbbPackages, inputType: 'mlbb', dbCat: 'mlbb' },
    'mlbb': { name: 'Mobile Legends', sub: 'All Server', img: '/mlbb.png', packages: mlbbPackages, inputType: 'mlbb', dbCat: 'mlbb' },
    'magic-chess': { name: 'Magic Chess Go Go', sub: 'All Server', img: '/MCGG.png', packages: mcggPackages, inputType: 'mlbb', dbCat: 'mcgg' },
    'mcgg': { name: 'Magic Chess Go Go', sub: 'All Server', img: '/MCGG.png', packages: mcggPackages, inputType: 'mlbb', dbCat: 'mcgg' },
    'pubg-mobile': { name: 'PUBG UC', sub: 'Global', img: '/pubg.png', packages: pubgPackages, inputType: 'pubg', dbCat: 'pubg' },
    'pubg': { name: 'PUBG UC', sub: 'Global', img: '/pubg.png', packages: pubgPackages, inputType: 'pubg', dbCat: 'pubg' },
    'pubg-uc': { name: 'PUBG UC', sub: 'Global', img: '/pubg.png', packages: pubgPackages, inputType: 'pubg', dbCat: 'pubg' },
    'uc-packs': { name: 'UC Pack', sub: 'Global', img: '/Pubgucpack.png', packages: ucPackPackages, inputType: 'pubg', dbCat: 'ucPack' },
    'uc-pack': { name: 'UC Pack', sub: 'Global', img: '/Pubgucpack.png', packages: ucPackPackages, inputType: 'pubg', dbCat: 'ucPack' },
    'ucpack': { name: 'UC Pack', sub: 'Global', img: '/Pubgucpack.png', packages: ucPackPackages, inputType: 'pubg', dbCat: 'ucPack' },
    'telegram-premium': { name: 'Telegram Premium', sub: 'Social App', img: '/telegram.png', packages: telegramPackages, inputType: 'username', dbCat: 'telegram' },
    'telegram': { name: 'Telegram Premium', sub: 'Social App', img: '/telegram.png', packages: telegramPackages, inputType: 'username', dbCat: 'telegram' },
    'heartopia': { name: 'Heartopia', sub: 'Game Topup', img: '/heartopia.png', packages: heartopiaPackages, inputType: 'heartopia', dbCat: 'heartopia' },
    'smile-coin': { name: 'Smile coin', sub: 'Game Currency', img: '/smile_coin.png', packages: smileCoinPackages, inputType: 'username', dbCat: 'smileCoin' },
    'smilecoin': { name: 'Smile coin', sub: 'Game Currency', img: '/smile_coin.png', packages: smileCoinPackages, inputType: 'username', dbCat: 'smileCoin' }
  };

  const game = gameConfigs[id] || Object.values(gameConfigs).find(g => id.includes(g.dbCat.toLowerCase()));
  const [displayPackages, setDisplayPackages] = useState<any[]>(game ? game.packages : []);

  useEffect(() => {
    if (!game) return;
    const fetchRealPrices = async () => {
      try {
        const { data, error } = await supabase.from('game_prices').select('*').eq('category', game.dbCat);
        if (error) throw error;
        if (data && data.length > 0) {
          setDisplayPackages(data.sort((a, b) => Number(a.price) - Number(b.price)));
        } else {
          setDisplayPackages(game.packages || []);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
        setDisplayPackages(game.packages || []);
      } finally {
        setIsLoadingPrices(false);
      }
    };

    const fetchRealOrderCount = async () => {
      try {
        const { count, error } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('game_name', game.name); 
        if (!error && count !== null) {
          setOrderCount(count);
        }
      } catch (err) {
        console.error("Error fetching order count:", err);
      }
    };

    fetchRealPrices();
    fetchRealOrderCount();
  }, [game]);

  // 🌟 Auto Check Logic (User ID နဲ့ Zone ID နှစ်ခုလုံးပြည့်ရင် အလိုလိုစစ်မယ်) 🌟
  useEffect(() => {
    if (game?.inputType !== 'mlbb') return;

    // Reset result whenever input changes
    setIdCheckResult({ status: 'idle', name: '', region: '', flag: '' });

    if (userId.trim() && zoneId.trim()) {
      // Clear previous timeout
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);

      setIsCheckingId(true);

      // Debounce: Wait 1 second after user stops typing before making API call
      checkTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await fetch(`https://api.isan.eu.org/nickname/ml?id=${userId}&zone=${zoneId}`);
          if (!response.ok) throw new Error('API Error');
          
          const data = await response.json();
          
          if (!data.name || data.name === "User not found" || data.error) {
            setIdCheckResult({ status: 'error', name: '', region: '', flag: '' });
          } else {
            const flagMap: Record<string, string> = { "MM": "🇲🇲", "ID": "🇮🇩", "PH": "🇵🇭", "MY": "🇲🇾", "SG": "🇸🇬", "TH": "🇹🇭", "VN": "🇻🇳", "GLOBAL": "🌐" };
            const regionCode = data.region?.toUpperCase() || "GLOBAL";
            const emoji = flagMap[regionCode] || "🌐";
            
            setIdCheckResult({ 
              status: 'success', 
              name: data.name, 
              region: regionCode,
              flag: emoji
            });
          }
        } catch (error) {
          setIdCheckResult({ status: 'error', name: '', region: '', flag: '' });
        } finally {
          setIsCheckingId(false);
        }
      }, 1000); // 1000ms (1 second) delay
    } else {
      setIsCheckingId(false);
    }

    return () => {
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    };
  }, [userId, zoneId, game?.inputType]);


  const paymentMethods = [
    { id: 'kpay', name: 'KBZ Pay', img: '/kpay.png' },
    { id: 'wave', name: 'Wave Pay', img: '/wave.png' },
    { id: 'ayapay', name: 'AYA Pay', img: '/ayapay.png' },
    { id: 'uabpay', name: 'UAB Pay', img: '/uabpay.png' },
    { id: 'wallet', name: 'Wallet', img: '/wallet.png' }
  ];

  if (!game) {
    return (
      <main className="min-h-screen bg-[#CAF0F8] flex flex-col items-center justify-center p-4">
        <h1 className="text-[#023E8A] text-2xl font-bold mb-2">Game Not Found</h1>
        <p className="text-[#023E8A]/70 text-xs mb-6">Requested ID: {id}</p>
        <Link href="/" className="bg-[#023E8A] text-[#CAF0F8] px-6 py-2.5 rounded-full font-bold text-sm shadow-lg">Go Back Home</Link>
      </main>
    );
  }

  const isFormValid = (() => {
    if (!selectedPkg || !paymentMethod) return false;
    if (game.inputType === 'mlbb') return userId && zoneId && idCheckResult.status === 'success';
    if (game.inputType === 'pubg') return userId;
    if (game.inputType === 'username') return userId;
    if (game.inputType === 'heartopia') return userId && aid;
    return false;
  })();

  const getTargetAccountText = () => {
    if (!userId) return 'Not filled';
    if (game.inputType === 'mlbb') return idCheckResult.name ? `${idCheckResult.name} (${userId} | ${zoneId})` : zoneId ? `${userId} (${zoneId})` : userId;
    if (game.inputType === 'heartopia') return aid ? `UID: ${userId}, AID: ${aid} (${serverField})` : `UID: ${userId}`;
    return userId;
  };

  const openPaymentModal = () => {
    if (!isFormValid) return;
    setShowPaymentModal(true);
  };

  // 🌟 [ပြောင်းလဲထားသော အပိုင်း] Telegram သို့ Order လှမ်းပို့မည့် Logic အသစ် 🌟
  const confirmOrder = async () => {
    setIsUploading(true);
    
    try {
      let publicUrl = null;

      const BOT_TOKEN = "8916421457:AAHfALcMnORdMSoGc0gpEXEKzNqqLmPWvN0"; 
      const CHAT_ID = "1934339791"; 

      if (paymentMethod === 'wallet') {
        if (!userEmail) {
          alert("Wallet ဖြင့်ဝယ်ရန် အကောင့်ဝင် (Login) ထားရန် လိုအပ်ပါသည်။");
          setIsUploading(false);
          return;
        }

        const cleanEmail = userEmail.trim();

        const { data: walletList, error: walletError } = await supabase
          .from('users_wallet')
          .select('balance')
          .ilike('email', cleanEmail);
        
        if (walletError) {
          alert("Database Error (ခဏစောင့်ပြီး ပြန်ဝယ်ကြည့်ပါ): " + walletError.message);
          setIsUploading(false);
          return;
        }

        if (!walletList || walletList.length === 0) {
          alert("Wallet အကောင့် မတွေ့ပါ သို့မဟုတ် ငွေဖြည့်သွင်းထားခြင်း မရှိသေးပါ။");
          setIsUploading(false);
          return;
        }

        const walletData = walletList[0];

        if (Number(walletData.balance) < Number(selectedPkg.price)) {
          alert("သင့် Wallet တွင် ငွေလုံလောက်မှု မရှိပါ။ ကျေးဇူးပြု၍ ငွေအရင်ဖြည့်ပါ။");
          setIsUploading(false);
          return;
        }

        const newBalance = Number(walletData.balance) - Number(selectedPkg.price);
        const { error: updateError } = await supabase
          .from('users_wallet')
          .update({ balance: newBalance })
          .ilike('email', cleanEmail);

        if (updateError) {
          alert("ငွေဖြတ်ရာတွင် အမှားအယွင်းဖြစ်နေပါသည်: " + updateError.message);
          setIsUploading(false);
          return;
        }
      } 
      else {
        if (!slipFile) {
          alert("ကျေးဇူးပြု၍ ငွေလွှဲပြေစာ (Screenshot) အရင်တင်ပေးပါ။");
          setIsUploading(false);
          return;
        }
        const fileExt = slipFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from('receipts').upload(fileName, slipFile);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('receipts').getPublicUrl(fileName);
        publicUrl = data.publicUrl;
      }

      const { data: insertData, error: insertError } = await supabase.from('orders').insert([{
        game_name: game.name,
        player_id: userId,
        zone_id: zoneId || null,
        item_name: selectedPkg.name,
        price: selectedPkg.price,
        payment_method: paymentMethod,
        slip_url: publicUrl,
        status: 'pending',
        user_email: userEmail || null,
      }]).select(); 

      if (insertError) throw insertError;
      
      const newOrderId = insertData && insertData[0] ? insertData[0].id : 'N/A';
      
      const targetAcc = getTargetAccountText();
      const tgCaption = `🚨 <b>အော်ဒါအသစ် ဝင်လာပါပြီ (Order #${newOrderId})</b>\n\n`
                      + `🎮 <b>ဂိမ်း :</b> ${game.name}\n`
                      + `👤 <b>အကောင့် :</b> <code>${targetAcc}</code>\n`
                      + `📦 <b>ပစ္စည်း :</b> ${selectedPkg.name}\n`
                      + `💰 <b>ဈေးနှုန်း :</b> ${selectedPkg.price.toLocaleString()} Ks\n`
                      + `💳 <b>ပေးချေမှု :</b> ${paymentMethod === 'wallet' ? 'Wallet' : paymentMethod.toUpperCase()}\n`
                      + `📧 <b>Email :</b> ${userEmail || 'Guest'}\n\n`
                      + `⏳ <i>Admin မှ 'Done' နှိပ်ပါက Bot မှ Auto ဖြည့်ပေးပါမည်။</i>`;

      try {
        if (paymentMethod === 'wallet' || !slipFile) {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CHAT_ID, text: tgCaption, parse_mode: 'HTML' })
            });
        } else {
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('photo', slipFile);
            formData.append('caption', tgCaption);
            formData.append('parse_mode', 'HTML');

            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                method: 'POST',
                body: formData
            });
        }
      } catch (tgError) {
          console.error("Telegram Notification Error:", tgError);
      }
      
      setShowPaymentModal(false);
      setOrderSuccess(true);
    } catch (error: any) {
      alert("Error processing order: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen pb-28 relative bg-[#CAF0F8] font-sans">
      
      <div className="relative z-10">
        <Navbar />

        <div className="max-w-5xl mx-auto px-4 mt-2">
          
          <div className="relative w-full bg-[#023E8A] border border-[#00B4D8]/30 rounded-[2rem] p-6 md:p-8 overflow-hidden flex flex-col md:flex-row items-center md:items-start shadow-[0_10px_30px_rgba(2,62,138,0.2)] mb-8 mt-2">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B4D8]/20 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="absolute right-[-10px] md:right-8 top-1/2 -translate-y-1/2 w-32 h-32 md:w-[280px] md:h-[280px] opacity-30 md:opacity-100 pointer-events-none flex items-center justify-center transition-all">
               <img 
                 src="/painggyi-logo-clear.png" 
                 alt="Paing Gyi Logo" 
                 className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]" 
               />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 w-full md:w-[70%]">
              
              <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-[1rem] md:rounded-[1.25rem] overflow-hidden border-2 md:border-4 border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                <img src={game.img} alt={game.name} className="w-full h-full object-cover" />
              </div>

              <div className="text-center md:text-left flex flex-col justify-center pt-2">
                <h1 className="text-xl md:text-[28px] font-black text-white tracking-tight leading-tight">{game.name}</h1>
                <p className="text-xs md:text-sm text-[#CAF0F8]/80 font-medium mt-1">{game.sub}</p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 text-[10px] md:text-xs font-bold text-[#CAF0F8] mt-3">
                  <span className="flex items-center gap-1 whitespace-nowrap"><span className="text-[#FBB02D] text-sm">★</span> Verified Service</span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <span className="text-[#00B4D8] text-sm">👥</span> 
                    {orderCount > 0 ? `${orderCount} players` : 'Active players'}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1 whitespace-nowrap"><span className="text-green-400 text-sm">⚡</span> Fast process</span>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4">
                  <span className="px-2.5 py-1.5 md:px-3 md:py-1.5 bg-[#CAF0F8]/10 border border-[#00B4D8]/30 text-white text-[9px] md:text-[10px] font-bold rounded-full backdrop-blur-sm flex items-center gap-1.5 whitespace-nowrap">
                    <svg className="w-3 h-3 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    CS 24/7
                  </span>
                  <span className="px-2.5 py-1.5 md:px-3 md:py-1.5 bg-[#CAF0F8]/10 border border-[#00B4D8]/30 text-white text-[9px] md:text-[10px] font-bold rounded-full backdrop-blur-sm flex items-center gap-1.5 whitespace-nowrap">
                    <svg className="w-3 h-3 text-[#FBB02D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Instant Process
                  </span>
                  <span className="px-2.5 py-1.5 md:px-3 md:py-1.5 bg-[#CAF0F8]/10 border border-[#00B4D8]/30 text-white text-[9px] md:text-[10px] font-bold rounded-full backdrop-blur-sm flex items-center gap-1.5 whitespace-nowrap">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    100% Safe
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              
              <section>
                <div className="flex items-end gap-2 md:gap-3 mb-4">
                  <span className="text-3xl md:text-4xl italic font-black text-[#023E8A]/20">01</span>
                  <div className="mb-0.5 md:mb-1">
                    <h2 className="text-base md:text-lg font-bold text-[#023E8A]">Choose Nominal Amount</h2>
                    <p className="text-[#023E8A]/70 text-[9px] md:text-[11px]">Pick the {game.name} amount you want to top up</p>
                  </div>
                </div>

                {isLoadingPrices ? (
                  <div className="text-center text-[#023E8A]/50 py-10 font-medium animate-pulse text-sm">
                    Loading packages...
                  </div>
                ) : displayPackages.length === 0 ? (
                  <div className="text-center text-[#023E8A]/50 py-10 text-sm">No items available yet.</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 md:gap-3">
                    {displayPackages.map((pkg: any) => (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPkg(pkg)}
                        className={`relative p-2.5 md:p-3.5 rounded-[1rem] md:rounded-2xl text-left transition-all duration-200 overflow-hidden shadow-sm ${
                          selectedPkg?.id === pkg.id
                          ? 'bg-[#023E8A] border-2 border-[#00B4D8] shadow-[0_5px_15px_rgba(2,62,138,0.3)]'
                          : 'bg-white border-2 border-transparent hover:border-[#00B4D8]/30'
                        }`}
                      >
                        {selectedPkg?.id === pkg.id && (
                          <div className="absolute top-0 right-0 bg-[#00B4D8] rounded-bl-lg md:rounded-bl-xl p-1 md:p-1.5 shadow-md">
                            <svg className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          </div>
                        )}
                        <div className={`text-xs md:text-sm mb-1 line-clamp-2 ${selectedPkg?.id === pkg.id ? 'text-white font-bold' : 'text-[#023E8A] font-bold'}`}>{pkg.name}</div>
                        <div className={`text-[9px] md:text-[10px] mb-2 md:mb-3 ${selectedPkg?.id === pkg.id ? 'text-[#CAF0F8]/70' : 'text-[#023E8A]/60'}`}>{pkg.bonus || 'No bonus'}</div>
                        <div className={`text-xs md:text-sm font-extrabold ${selectedPkg?.id === pkg.id ? 'text-[#00B4D8]' : 'text-[#00B4D8]'}`}>{pkg.price.toLocaleString()} Ks</div>
                      </button>
                    ))}
                  </div>
                )}
              </section>

              <section>
                <div className="flex items-end gap-2 md:gap-3 mb-4">
                  <span className="text-3xl md:text-4xl italic font-black text-[#023E8A]/20">02</span>
                  <div className="mb-0.5 md:mb-1">
                    <h2 className="text-base md:text-lg font-bold text-[#023E8A]">Game Account Data</h2>
                    <p className="text-[#023E8A]/70 text-[9px] md:text-[11px]">Make sure your account details are correct</p>
                  </div>
                </div>
                
                <div className="bg-[#023E8A] p-4 md:p-5 rounded-[1.25rem] md:rounded-3xl shadow-lg space-y-4">
                  {game.inputType === 'mlbb' && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <div className="w-full sm:w-1/2 relative">
                          <label className="text-[9px] md:text-[10px] font-bold text-[#CAF0F8] mb-1.5 md:mb-2 block uppercase tracking-wider">User ID <span className="text-[#FBB02D]">*</span></label>
                          <input type="text" placeholder="Enter User ID" className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white text-xs md:text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" value={userId} onChange={(e) => setUserId(e.target.value)} />
                        </div>
                        <div className="w-full sm:w-1/2 relative">
                          <label className="text-[9px] md:text-[10px] font-bold text-[#CAF0F8] mb-1.5 md:mb-2 block uppercase tracking-wider">Server (Zone) ID <span className="text-[#FBB02D]">*</span></label>
                          <input type="text" placeholder="Enter Zone ID" className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white text-xs md:text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" value={zoneId} onChange={(e) => setZoneId(e.target.value)} />
                        </div>
                      </div>

                      {/* 🌟 Auto Checking Indicator 🌟 */}
                      {isCheckingId && (
                        <div className="flex items-center justify-center gap-2 text-[#00B4D8] text-xs font-bold py-2">
                           <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                           Checking Account...
                        </div>
                      )}

                      {/* 🌟 Result Box (Appears automatically) 🌟 */}
                      {!isCheckingId && idCheckResult.status !== 'idle' && (
                        <div className={`w-full p-4 rounded-xl border ${idCheckResult.status === 'success' ? 'bg-[#10b981]/10 border-[#10b981]/30' : 'bg-red-500/10 border-red-500/30'}`}>
                          {idCheckResult.status === 'success' ? (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{idCheckResult.flag}</span>
                                <div className="flex flex-col">
                                  <span className="text-white font-bold text-sm">{idCheckResult.name}</span>
                                  <span className="text-[#10b981] text-[10px] font-bold uppercase">{idCheckResult.region}</span>
                                </div>
                              </div>
                              <span className="bg-[#10b981] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> VALID
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">❌</span>
                                <span className="text-red-400 font-bold text-sm">Account not found</span>
                              </div>
                              <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                INVALID
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                             <div className="flex flex-col">
                               <span className="text-white/50 text-[9px] uppercase">User ID</span>
                               <span className="text-white/80 text-xs font-medium">{userId || '-'}</span>
                             </div>
                             <div className="flex flex-col text-right">
                               <span className="text-white/50 text-[9px] uppercase">Server (Zone) ID</span>
                               <span className="text-white/80 text-xs font-medium">{zoneId || '-'}</span>
                             </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {game.inputType === 'pubg' && (
                    <div>
                      <label className="text-[9px] md:text-[10px] font-bold text-[#CAF0F8] mb-1.5 md:mb-2 block uppercase tracking-wider">Player ID <span className="text-[#FBB02D]">*</span></label>
                      <input type="text" placeholder="Enter Player ID" className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white text-xs md:text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" value={userId} onChange={(e) => setUserId(e.target.value)} />
                    </div>
                  )}

                  {game.inputType === 'username' && (
                    <div>
                      <label className="text-[9px] md:text-[10px] font-bold text-[#CAF0F8] mb-1.5 md:mb-2 block uppercase tracking-wider">Telegram Username <span className="text-[#FBB02D]">*</span></label>
                      <input type="text" placeholder="ဥပမာ: @username သို့မဟုတ် phone number" className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white text-xs md:text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" value={userId} onChange={(e) => setUserId(e.target.value)} />
                    </div>
                  )}

                  {game.inputType === 'heartopia' && (
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <div className="w-full sm:w-1/2">
                          <label className="text-[9px] md:text-[10px] font-bold text-[#CAF0F8] mb-1.5 md:mb-2 block uppercase tracking-wider">UID <span className="text-[#FBB02D]">*</span></label>
                          <input type="text" placeholder="UID" className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white text-xs md:text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" value={userId} onChange={(e) => setUserId(e.target.value)} />
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label className="text-[9px] md:text-[10px] font-bold text-[#CAF0F8] mb-1.5 md:mb-2 block uppercase tracking-wider">FIELD <span className="text-[#FBB02D]">*</span></label>
                          <select className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white text-xs md:text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" value={serverField} onChange={(e) => setServerField(e.target.value)}>
                            <option value="Global">Global</option>
                            <option value="Asia">Asia</option>
                            <option value="America">America</option>
                            <option value="Europe">Europe</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] md:text-[10px] font-bold text-[#CAF0F8] mb-1.5 md:mb-2 block uppercase tracking-wider">AID <span className="text-[#FBB02D]">*</span></label>
                        <input type="text" placeholder="AID" className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white text-xs md:text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" value={aid} onChange={(e) => setAid(e.target.value)} />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-end gap-2 md:gap-3 mb-4">
                  <span className="text-3xl md:text-4xl italic font-black text-[#023E8A]/20">03</span>
                  <div className="mb-0.5 md:mb-1">
                    <h2 className="text-base md:text-lg font-bold text-[#023E8A]">Choose Payment Method</h2>
                    <p className="text-[#023E8A]/70 text-[9px] md:text-[11px]">Various payment methods available</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 md:gap-3">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`relative p-2.5 md:p-3 rounded-xl md:rounded-2xl flex flex-col items-center justify-center gap-1.5 md:gap-2 transition-all duration-200 shadow-sm ${
                        paymentMethod === pm.id
                        ? 'bg-[#023E8A] border-2 border-[#00B4D8] shadow-[0_5px_15px_rgba(2,62,138,0.3)]'
                        : 'bg-white border-2 border-transparent hover:border-[#00B4D8]/30'
                      }`}
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gray-100 flex items-center justify-center p-1 overflow-hidden shadow-inner mb-0.5 md:mb-1">
                        <img src={pm.img} alt={pm.name} className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = `<span class="text-[#023E8A] font-bold text-xs">${pm.name.charAt(0)}</span>`;
                          }}
                        />
                      </div>
                      <span className={`text-[9px] md:text-[10px] font-bold text-center ${paymentMethod === pm.id ? 'text-[#CAF0F8]' : 'text-[#023E8A]'}`}>{pm.name}</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20 md:top-24 bg-[#023E8A] rounded-[1.25rem] md:rounded-3xl p-4 md:p-5 shadow-2xl border border-white/10">
                <h3 className="text-[#CAF0F8] text-[9px] md:text-[11px] font-bold uppercase tracking-widest mb-3 md:mb-4 border-b border-white/20 pb-2 md:pb-3">Order Summary</h3>
                
                <div className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-5">
                  <img src={game.img} className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl object-cover shadow-md" />
                  <div>
                    <h4 className="text-white font-bold text-xs md:text-sm">{game.name}</h4>
                    <p className="text-[#00B4D8] text-[9px] md:text-[10px] font-bold">{selectedPkg ? selectedPkg.name : 'No amount selected'}</p>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  <div>
                    <p className="text-[#CAF0F8]/70 text-[9px] md:text-[10px] uppercase tracking-wider mb-0.5 md:mb-1">Target Account</p>
                    <p className="text-white text-[11px] md:text-xs font-medium italic break-words">{getTargetAccountText()}</p>
                  </div>
                  <div>
                    <p className="text-[#CAF0F8]/70 text-[9px] md:text-[10px] uppercase tracking-wider mb-0.5 md:mb-1">Payment Method</p>
                    <p className="text-white text-[11px] md:text-xs font-medium italic">
                      {paymentMethod ? paymentMethods.find(p => p.id === paymentMethod)?.name : 'Not selected'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/20 pt-3 md:pt-4 mb-3 md:mb-4">
                  <div className="flex justify-between text-[11px] md:text-xs">
                    <span className="text-[#CAF0F8]">Subtotal</span>
                    <span className="text-white font-bold">{selectedPkg ? selectedPkg.price.toLocaleString() : 0} Ks</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-white/20 pt-3 md:pt-4 mb-4 md:mb-6">
                  <span className="text-white font-bold text-xs md:text-sm">Total Payment</span>
                  <span className="text-[#FBB02D] font-extrabold text-base md:text-xl">
                    {selectedPkg ? selectedPkg.price.toLocaleString() : 0} Ks
                  </span>
                </div>
                
                <button
                  onClick={openPaymentModal}
                  disabled={!isFormValid}
                  className={`w-full py-3 md:py-3.5 rounded-lg md:rounded-xl font-extrabold text-xs md:text-sm transition-all duration-300 shadow-lg ${
                    isFormValid
                    ? 'bg-[#FBB02D] text-[#023E8A] hover:bg-[#e8a329] shadow-[0_5px_15px_rgba(251,176,45,0.4)]'
                    : 'bg-[#CAF0F8]/20 text-[#CAF0F8]/50 cursor-not-allowed'
                  }`}
                >
                  {!isFormValid ? (game.inputType === 'mlbb' ? (idCheckResult.status !== 'success' ? 'Waiting for valid ID' : 'Select a package') : 'Complete the data first') : 'Buy Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-50">
        <BottomNav />
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#023E8A]/90 px-4 backdrop-blur-md">
          <div className="bg-[#023E8A] p-5 md:p-6 rounded-[1.25rem] md:rounded-3xl border border-[#00B4D8]/30 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowPaymentModal(false)} className="absolute top-3 md:top-4 right-3 md:right-4 text-[#CAF0F8]/50 hover:text-white text-lg md:text-xl">✕</button>
            
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">ငွေပေးချေရန်</h3>
            
            {paymentMethod === 'wallet' ? (
              <p className="text-[#CAF0F8]/70 text-[10px] md:text-xs mb-4 md:mb-5">သင့် Wallet ဖြင့် အလိုအလျောက် ပေးချေပါမည်。</p>
            ) : (
              <p className="text-[#CAF0F8]/70 text-[10px] md:text-xs mb-4 md:mb-5">အောက်ပါအကောင့်သို့ ငွေလွှဲပြီး ပြေစာ (Screenshot) တင်ပေးပါ။</p>
            )}

            {paymentMethod !== 'wallet' && (
              <div className="bg-[#CAF0F8]/10 p-4 md:p-5 rounded-xl md:rounded-2xl border border-[#00B4D8]/20 mb-4 md:mb-5 shadow-inner">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#CAF0F8]/70 text-[10px] md:text-xs uppercase font-bold tracking-wider">Pay To:</span>
                  <span className="text-[#00B4D8] font-bold text-xs md:text-sm uppercase bg-[#00B4D8]/20 px-2 md:px-3 py-1 rounded-full">{paymentMethod}</span>
                </div>
                <div className="text-white text-xl md:text-2xl font-bold tracking-widest mt-2">{adminAccounts[paymentMethod]?.phone}</div>
                <div className="text-[#CAF0F8] text-xs md:text-sm mt-1">အမည်: {adminAccounts[paymentMethod]?.name}</div>
                
                <div className="flex justify-between items-end mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#00B4D8]/30">
                  <span className="text-[#CAF0F8] text-[10px] md:text-xs">ကျသင့်ငွေ</span>
                  <span className="text-[#FBB02D] font-extrabold text-lg md:text-xl">{selectedPkg?.price.toLocaleString()} Ks</span>
                </div>
              </div>
            )}

            {paymentMethod === 'wallet' ? (
              <div className="mb-4 md:mb-6">
                <label className="block text-[#CAF0F8] text-[10px] md:text-xs font-bold mb-2 md:mb-3 uppercase tracking-wider">Your Account Email</label>
                <div className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white text-xs md:text-sm font-bold opacity-80 cursor-not-allowed shadow-inner overflow-hidden text-ellipsis">
                  {userEmail || 'Please Login First'}
                </div>
                <div className="flex justify-between items-end mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#00B4D8]/30">
                  <span className="text-[#CAF0F8] text-[10px] md:text-xs">ဖြတ်တောက်မည့်ငွေ</span>
                  <span className="text-[#FBB02D] font-extrabold text-lg md:text-xl">{selectedPkg?.price.toLocaleString()} Ks</span>
                </div>
              </div>
            ) : (
              <div className="mb-4 md:mb-6">
                <label className="block text-[#CAF0F8] text-[10px] md:text-xs font-bold mb-2 md:mb-3 uppercase tracking-wider">ငွေလွှဲပြေစာ (Screenshot) ရွေးရန် <span className="text-[#FBB02D]">*</span></label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setSlipFile(e.target.files?.[0] || null)} 
                  className="w-full text-[11px] md:text-sm text-[#CAF0F8] file:mr-2 md:file:mr-4 file:py-2 md:file:py-2.5 file:px-3 md:file:px-5 file:rounded-lg md:file:rounded-xl file:border-0 file:text-[10px] md:file:text-xs file:font-bold file:bg-[#00B4D8] file:text-[#023E8A] hover:file:bg-[#0096b8] cursor-pointer border border-dashed border-[#00B4D8]/50 rounded-lg md:rounded-xl p-1.5 md:p-2 transition-all" 
                />
              </div>
            )}

            <button 
              onClick={confirmOrder} 
              disabled={isUploading || (paymentMethod !== 'wallet' && !slipFile)} 
              className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all shadow-lg ${
                (!slipFile && paymentMethod !== 'wallet') || isUploading 
                ? 'bg-[#CAF0F8]/20 text-[#CAF0F8]/50 cursor-not-allowed' 
                : 'bg-[#FBB02D] text-[#023E8A] hover:bg-[#e8a329] shadow-[0_5px_15px_rgba(251,176,45,0.4)]'
              }`}
            >
              {isUploading ? 'Processing...' : (paymentMethod === 'wallet' ? 'Confirm Wallet Payment' : 'Confirm Order & Upload')}
            </button>
          </div>
        </div>
      )}

      {orderSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#023E8A]/90 px-4 backdrop-blur-md transition-opacity duration-300">
          <div className="bg-white p-6 md:p-8 rounded-[1.25rem] md:rounded-3xl text-center max-w-sm w-full border border-gray-200 shadow-[0_10px_40px_rgba(0,180,216,0.2)] transform scale-100">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="font-bold text-lg md:text-xl mb-1 md:mb-2 text-[#023E8A]">Order Successful!</h2>
            <p className="text-gray-500 text-[10px] md:text-xs mb-5 md:mb-6">Admin will process your order shortly.</p>
            <button 
              onClick={() => window.location.href = '/'} 
              className="inline-block bg-[#023E8A] text-white font-bold py-2.5 md:py-3 px-6 md:px-8 rounded-lg md:rounded-xl w-full shadow-[0_5px_15px_rgba(2,62,138,0.4)] hover:bg-[#03045E] transition-colors text-xs md:text-sm"
            >
              Return Home
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
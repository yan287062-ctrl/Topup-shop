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

  // ==========================================
  // 🌟 Packages များကို FazerCards ID အတိုင်း သတ်မှတ်ခြင်း 🌟
  // ==========================================
  
  const mlbbGlobalPackages = [
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

  const mlbbBrazilPackages = [
    { id: '50_5_diamonds_first_top_up_bonus', name: '55 Diamonds', price: 3500 },
    { id: '78_8_diamonds', name: '86 Diamonds', price: 5500 },
    { id: 'weekly_pass', name: 'Weekly Pass', price: 6600 },
    { id: '156_16_diamonds', name: '172 Diamonds', price: 10800 },
    { id: '150_15_diamonds_first_top_up_bonus', name: '165 Diamonds (First Top-Up)', price: 10400 },
    { id: '234_23_diamonds', name: '257 Diamonds', price: 16100 },
    { id: '310_34_diamonds', name: '344 Diamonds', price: 21500 },
    { id: '250_25_diamonds_first_top_up_bonus', name: '275 Diamonds (First Top-Up)', price: 17000 },
    { id: '482_diamonds', name: '482 Diamonds', price: 30000 },
    { id: '465_51_diamonds', name: '516 Diamonds', price: 26300 },
    { id: '500_65_diamonds_first_top_up_bonus', name: '565 Diamonds (First Top-Up)', price: 34100 },
    { id: 'twilight_pass', name: 'Twilight Pass', price: 35700 },
    { id: '625_81_diamonds', name: '706 Diamonds', price: 43000 },
    { id: '1860_335_diamonds', name: '2195 Diamonds', price: 128900 },
    { id: '3099_589_diamonds', name: '3688 Diamonds', price: 215000 },
    { id: '4649_883_diamonds', name: '5532 Diamonds', price: 324700 },
    { id: '7740_1548_diamonds', name: '9288 Diamonds', price: 539300 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  const mlbbPHPackages = [
    { id: '10_1_diamonds', name: '11 Diamonds', price: 900 },
    { id: '20_2_diamonds', name: '22 Diamonds', price: 1800 },
    { id: '51_5_diamonds', name: '56 Diamonds', price: 4300 },
    { id: '50_5_diamonds_first_top_up_bonus', name: '55 Diamonds (First Top-Up)', price: 4200 },
    { id: 'weekly_diamond_pass', name: 'Weekly Diamond Pass', price: 8800 },
    { id: '102_10_diamonds', name: '112 Diamonds', price: 8500 },
    { id: '153_15_diamonds', name: '168 Diamonds', price: 13500 },
    { id: '203_20_diamonds', name: '223 Diamonds', price: 17000 },
    { id: '150_15_diamonds_first_top_up_bonus', name: '165 Diamonds (First Top-Up)', price: 12500 },
    { id: '303_33_diamonds', name: '336 Diamonds', price: 25500 },
    { id: '250_25_diamonds_first_top_up_bonus', name: '275 Diamonds (First Top-Up)', price: 21500 },
    { id: 'twilight_pass', name: 'Twilight Pass', price: 43500 },
    { id: '504_66_diamonds', name: '570 Diamonds', price: 42000 },
    { id: '500_65_diamonds_first_top_up_bonus', name: '565 Diamonds (First Top-Up)', price: 43000 },
    { id: '1007_156_diamonds', name: '1163 Diamonds', price: 84000 },
    { id: '2015_383_diamonds', name: '2398 Diamonds', price: 169000 },
    { id: '5035_1007_diamonds', name: '6042 Diamonds', price: 420000 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  // 🌟 Magic Chess Go Go Packages အသစ် (FazerCards IDs) 🌟
  const mcggPackages = [
    { id: '11_diamonds', name: '11 Diamonds', price: 900 },
    { id: '22_diamonds', name: '22 Diamonds', price: 1700 },
    { id: '56_diamonds', name: '56 Diamonds', price: 4200 },
    { id: 'first_recharge_100_50_50_bonus', name: 'First Recharge 100 (50+50)', price: 4400 },
    { id: '112_diamonds', name: '112 Diamonds', price: 8300 },
    { id: 'weekly_card', name: 'Weekly Card', price: 8800 },
    { id: 'first_recharge_300_150_150_bonus', name: 'First Recharge 300 (150+150)', price: 13000 },
    { id: '223_diamonds', name: '223 Diamonds', price: 16600 },
    { id: 'first_recharge_500_250_250_bonus', name: 'First Recharge 500 (250+250)', price: 21500 },
    { id: '336_diamonds', name: '336 Diamonds', price: 24900 },
    { id: '570_diamonds', name: '570 Diamonds', price: 41400 },
    { id: 'first_recharge_1000_500_500_bonus', name: 'First Recharge 1000 (500+500)', price: 43400 },
    { id: '1163_diamonds', name: '1163 Diamonds', price: 82900 },
    { id: '2398_diamonds', name: '2398 Diamonds', price: 165700 },
    { id: '6042_diamonds', name: '6042 Diamonds', price: 414100 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  // 🌟 PUBG Packages (Manual - FazerCards IDs) 🌟
  const pubgPackages = [
    { id: '60_uc', name: '60 UC', price: 4106 }, 
    { id: '325_uc', name: '325 UC', price: 20529 },
    { id: '660_uc', name: '660 UC', price: 41059 }, 
    { id: '1800_uc', name: '1800 UC', price: 100000 },
    { id: '3850_uc', name: '3850 UC', price: 200000 },
    { id: '8100_uc', name: '8100 UC', price: 400000 }
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

  // 🌟 Heartopia Packages အသစ် (FazerCards IDs) 🌟
  const heartopiaPackages = [
    { id: '20_heart_diamond', name: '20 Heart Diamond', price: 2500 }, 
    { id: '60_heart_diamond', name: '60 Heart Diamond', price: 4800 },
    { id: 'gamg_formal_membership', name: 'GAMG Formal Membership', price: 15000 },
    { id: '320_heart_diamond', name: '320 Heart Diamond', price: 24500 }, 
    { id: 'festival_pack', name: 'Festival Pack', price: 24500 },
    { id: 'festival_pack_upgrade', name: 'Festival Pack Upgrade', price: 31000 },
    { id: '730_heart_diamond', name: '730 Heart Diamond', price: 55000 },
    { id: 'supreme_festival_pack', name: 'Supreme Festival Pack', price: 55000 },
    { id: '1370_heart_diamond', name: '1370 Heart Diamond', price: 100000 },
    { id: '2130_heart_diamond', name: '2130 Heart Diamond', price: 155000 },
    { id: '3550_heart_diamond', name: '3550 Heart Diamond', price: 250000 },
    { id: '7050_heart_diamond', name: '7050 Heart Diamond', price: 500000 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  const smileCoinPackages = [
    { id: 'smile_1', name: 'Brl 300', price: 25800 },
    { id: 'smile_2', name: 'Brl 1000', price: 83800 },
    { id: 'smile_3', name: 'Brl 5000', price: 419000 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  const aniimoPackages = [
    { id: 'an1', name: '60 Stars', price: 3900 },
    { id: 'an2', name: '300 Stars', price: 23000 },
    { id: 'an3', name: '980 Stars', price: 67100 },
    { id: 'an4', name: '1980 Stars', price: 134100 },
    { id: 'an5', name: '3280 Stars', price: 227400 },
    { id: 'an6', name: '6480 Stars', price: 439000 },
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  const spotifyPackages = [
    { id: 'sp1', name: '1m - Individual', bonus: 'Individual Plan', price: 8500 },
    { id: 'sp2', name: '3m - Individual', bonus: 'Individual Plan', price: 33000 },
    { id: 'sp3', name: '6m - Individual', bonus: 'Individual Plan', price: 52000 },
    { id: 'sp4', name: '12m - Individual', bonus: 'Individual Plan', price: 78000 },
    { id: 'sp5', name: '2m - Family', bonus: 'Family plan', price: 12000 },
    { id: 'sp6', name: '3m - Family', bonus: 'Family plan', price: 16000 },
    { id: 'sp7', name: '6m - Family', bonus: 'Family plan', price: 29000 },
    { id: 'sp8', name: '1yr - Family', bonus: 'Family plan', price: 50000 },
  ];

  const netflixPackages = [
    { id: 'nf1', name: '1 Month - Share Profile', bonus: 'Share Profile', price: 8000 },
    { id: 'nf2', name: '1 Month - Own Profile', bonus: 'Own Profile', price: 14000 },
    { id: 'nf3', name: '2 Month - Share', bonus: 'Share Profile', price: 15500 },
    { id: 'nf4', name: '2 Month - Own Profile', bonus: 'Own Profile', price: 27500 },
    { id: 'nf5', name: '3 Month - Share', bonus: 'Share Profile', price: 23000 },
    { id: 'nf6', name: '3 Month - Own', bonus: 'Own Profile', price: 40000 },
    { id: 'nf7', name: '6 Month - Share', bonus: 'Share Profile', price: 45000 },
    { id: 'nf8', name: '6 Month - Own', bonus: 'Own Profile', price: 80000 },
  ];

  const jumpJumpPackages = [
    { id: 'jv1', name: '1 Month - 1 Device (Share)', bonus: 'Share', price: 10000 },
    { id: 'jv2', name: '1 Month - 1 Device (Own)', bonus: 'Own', price: 14500 },
    { id: 'jv3', name: '1 Month - 2 Device (Own)', bonus: 'Own', price: 19000 },
    { id: 'jv4', name: '6 Month - 2 Device (Own)', bonus: 'Own', price: 95000 },
    { id: 'jv5', name: '12 Month - 2 Device (Own)', bonus: 'Own', price: 123000 },
  ];

  const expressVpnPackages = [
    { id: 'ev1', name: '1 Month - 1 Device', bonus: '1 Device', price: 2000 },
    { id: 'ev2', name: '1 Month - 12 Device', bonus: '12 Device', price: 12000 },
  ];

  // ==========================================
  // 🌟 DB Categorie ကို FazerCards Category IDs အတိုင်း သတ်မှတ်ခြင်း 🌟
  // ==========================================
  const gameConfigs: Record<string, any> = {
    'mobile-legends': { name: 'Mobile Legends', sub: 'Global Server', img: '/mlbb.png', packages: mlbbGlobalPackages, inputType: 'mlbb', dbCat: 'mobile_legends_global' },
    'mobile-legends-br': { name: 'Mobile Legends (BR)', sub: 'Brazil Server', img: '/mlbb.png', packages: mlbbBrazilPackages, inputType: 'mlbb', dbCat: 'mobile_legends_brazil' },
    'mobile-legends-ph': { name: 'Mobile Legends (PH)', sub: 'Philippines Server', img: '/mlbb.png', packages: mlbbPHPackages, inputType: 'mlbb', dbCat: 'mobile_legends_philippines' },
    
    // 🌟 MCGG ကို FazerCards ID ဖြင့် ချိတ်ဆက်ခြင်း 🌟
    'magic-chess': { name: 'Magic Chess Go Go', sub: 'Global Server', img: '/MCGG.png', packages: mcggPackages, inputType: 'mlbb', dbCat: 'magic_chess_gogo_global' },
    'mcgg': { name: 'Magic Chess Go Go', sub: 'Global Server', img: '/MCGG.png', packages: mcggPackages, inputType: 'mlbb', dbCat: 'magic_chess_gogo_global' },
    
    'pubg-uc': { name: 'PUBG UC', sub: 'Global', img: '/pubg.png', packages: pubgPackages, inputType: 'pubg', dbCat: 'pubg_mobile_manual' },
    'uc-pack': { name: 'UC Pack', sub: 'Global', img: '/Pubgucpack.png', packages: ucPackPackages, inputType: 'pubg', dbCat: 'ucPack' },
    'telegram': { name: 'Telegram Premium', sub: 'Social App', img: '/telegram.png', packages: telegramPackages, inputType: 'username', dbCat: 'telegram' },
    'heartopia': { name: 'Heartopia', sub: 'Game Topup', img: '/heartopia.png', packages: heartopiaPackages, inputType: 'heartopia', dbCat: 'heartopia' },
    'smile-coin': { name: 'Smile coin', sub: 'Game Currency', img: '/smile_coin.png', packages: smileCoinPackages, inputType: 'username', dbCat: 'smileCoin' },
    'aniimo': { name: 'Aniimo', sub: 'Global', img: '/Aniimo.jpg', packages: aniimoPackages, inputType: 'pubg', dbCat: 'aniimo' }, 
    'spotify': { name: 'Spotify Premium', sub: 'Music Subscription', img: '/Spotify.jpg', packages: spotifyPackages, inputType: 'email', dbCat: 'spotify' },
    'netflix-premium': { name: 'Netflix Premium', sub: 'Streaming', img: '/Netflix.jpg', packages: netflixPackages, inputType: 'email', dbCat: 'netflix' },
    'jump-jump-vpn': { name: 'Jump Jump VPN', sub: 'VPN Subscription', img: '/JumpJump vpn.jpg', packages: jumpJumpPackages, inputType: 'email', dbCat: 'jumpjump' },
    'express-vpn': { name: 'Express VPN', sub: 'VPN Subscription', img: '/Express Vpn.jpg', packages: expressVpnPackages, inputType: 'email', dbCat: 'expressvpn' },
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

  useEffect(() => {
    if (game?.inputType !== 'mlbb') return;

    setIdCheckResult({ status: 'idle', name: '', region: '', flag: '' });

    if (userId.trim() && zoneId.trim()) {
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
      setIsCheckingId(true);

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
      }, 1000); 
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

  // 🌟 Form Validation အပိုင်း 🌟
  const isFormValid = (() => {
    if (!selectedPkg || !paymentMethod) return false;
    if (game.inputType === 'mlbb') return userId && zoneId && idCheckResult.status === 'success';
    if (game.inputType === 'pubg') return userId;
    if (game.inputType === 'username') return userId;
    if (game.inputType === 'heartopia') return userId && serverField;
    if (game.inputType === 'email') return userId; 
    return false;
  })();

  const getTargetAccountText = () => {
    if (!userId) return 'Not filled';
    if (game.inputType === 'mlbb') return idCheckResult.name ? `${idCheckResult.name} (${userId} | ${zoneId})` : zoneId ? `${userId} (${zoneId})` : userId;
    if (game.inputType === 'heartopia') return `UID: ${userId} (${serverField})`;
    return userId;
  };

  const openPaymentModal = () => {
    if (!isFormValid) return;
    setShowPaymentModal(true);
  };

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

      // ==========================================
      // 🌟 FazerCards API သို့ Order ပို့ရန် Fields သတ်မှတ်ခြင်း 🌟
      // ==========================================
      let orderFields: any = {};
      
      if (game.inputType === 'mlbb') {
         orderFields = { "player_id": userId, "server_id": zoneId }; 
      } else if (game.inputType === 'pubg') {
         orderFields = { "player_id": userId };
      } else if (game.inputType === 'heartopia') {
         orderFields = { "player_id": userId, "server": serverField };
      } else {
         orderFields = { "account": userId };
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
                        className={`relative p-2.5 md:p-3.5 rounded-[1rem] md:rounded-2xl text-left transition-all duration-200 overflow-hidden shadow-sm h-full flex flex-col justify-between ${
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
                        <div>
                          <div className={`text-xs md:text-sm mb-1 line-clamp-2 ${selectedPkg?.id === pkg.id ? 'text-white font-bold' : 'text-[#023E8A] font-bold'}`}>{pkg.name}</div>
                          <div className={`text-[9px] md:text-[10px] mb-2 md:mb-3 ${selectedPkg?.id === pkg.id ? 'text-[#CAF0F8]/70' : 'text-[#023E8A]/60'}`}>{pkg.bonus || 'No bonus'}</div>
                        </div>
                        <div className={`text-xs md:text-sm font-extrabold mt-auto pt-2 border-t border-[#023E8A]/10 ${selectedPkg?.id === pkg.id ? 'text-[#00B4D8] border-[#00B4D8]/30' : 'text-[#00B4D8]'}`}>{pkg.price.toLocaleString()} Ks</div>
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
                  
                  {/* 🌟 MLBB နှင့် MCGG အတွက် Form 🌟 */}
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

                      {isCheckingId && (
                        <div className="flex items-center justify-center gap-2 text-[#00B4D8] text-xs font-bold py-2">
                           <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                           Checking Account...
                        </div>
                      )}

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

                  {game.inputType === 'email' && (
                    <div>
                      <label className="text-[9px] md:text-[10px] font-bold text-[#CAF0F8] mb-1.5 md:mb-2 block uppercase tracking-wider">Email or Account Info <span className="text-[#FBB02D]">*</span></label>
                      <input type="text" placeholder="Enter your Email / Account details" className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white text-xs md:text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" value={userId} onChange={(e) => setUserId(e.target.value)} />
                    </div>
                  )}

                  {/* 🌟 Heartopia အတွက် Input Form အသစ် 🌟 */}
                  {game.inputType === 'heartopia' && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <div className="w-full sm:w-1/2 relative">
                          <label className="text-[9px] md:text-[10px] font-bold text-[#CAF0F8] mb-1.5 md:mb-2 block uppercase tracking-wider">User ID <span className="text-[#FBB02D]">*</span></label>
                          <input type="text" placeholder="Enter User ID" className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white text-xs md:text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" value={userId} onChange={(e) => setUserId(e.target.value)} />
                        </div>
                        <div className="w-full sm:w-1/2 relative">
                          <label className="text-[9px] md:text-[10px] font-bold text-[#CAF0F8] mb-1.5 md:mb-2 block uppercase tracking-wider">Server <span className="text-[#FBB02D]">*</span></label>
                          <select className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-white text-xs md:text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" value={serverField} onChange={(e) => setServerField(e.target.value)}>
                            <option value="America">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Global">Global</option>
                            <option value="SEA">SEA</option>
                            <option value="TW,HK,MO">TW,HK,MO</option>
                          </select>
                        </div>
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
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // <-- လင့်ခ်နာမည်ကို ယူရန် အသစ်ထည့်ထားသည်
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lejfhsuwajmzikmudmcs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

const gameDataMap: Record<string, any> = {
  'mobile-legends': { name: 'Mobile Legends', img: '/mlbb.png', requireZone: true, dbCat: 'mlbb' },
  'mobile-legends-(mlbb)': { name: 'Mobile Legends', img: '/mlbb.png', requireZone: true, dbCat: 'mlbb' },
  'mlbb': { name: 'Mobile Legends', img: '/mlbb.png', requireZone: true, dbCat: 'mlbb' },
  
  'magic-chess': { name: 'Magic Chess', img: '/MCGG.png', requireZone: true, dbCat: 'mcgg' },
  'mcgg': { name: 'Magic Chess', img: '/MCGG.png', requireZone: true, dbCat: 'mcgg' },
  
  'pubg-mobile': { name: 'PUBG Mobile', img: '/pubg.png', requireZone: false, dbCat: 'pubg' },
  'pubg': { name: 'PUBG Mobile', img: '/pubg.png', requireZone: false, dbCat: 'pubg' },
  'pubg-uc': { name: 'PUBG Mobile', img: '/pubg.png', requireZone: false, dbCat: 'pubg' },
  
  'uc-packs': { name: 'UC Pack', img: '/Pubgucpack.png', requireZone: false, dbCat: 'ucPack' },
  'uc-pack': { name: 'UC Pack', img: '/Pubgucpack.png', requireZone: false, dbCat: 'ucPack' },
  'ucpack': { name: 'UC Pack', img: '/Pubgucpack.png', requireZone: false, dbCat: 'ucPack' },
  
  'telegram-premium': { name: 'Telegram Premium', img: '/telegram.png', requireZone: false, dbCat: 'telegram' },
  'telegram': { name: 'Telegram Premium', img: '/telegram.png', requireZone: false, dbCat: 'telegram' },
  
  'heartopia': { name: 'Heartopia', img: '/heartopia.png', requireZone: false, dbCat: 'heartopia' },
  
  'smile-coin': { name: 'Smile Coin', img: '/smile_coin.png', requireZone: false, dbCat: 'smileCoin' },
  'smilecoin': { name: 'Smile Coin', img: '/smile_coin.png', requireZone: false, dbCat: 'smileCoin' }
};

export default function GameTopupPage() {
  const params = useParams(); // Next.js အသစ်တွင် မှန်ကန်စွာ ID ဖမ်းယူနည်း
  const rawId = (params?.id as string) || '';
  const paramId = rawId.toLowerCase();
  
  const game = gameDataMap[paramId] || Object.values(gameDataMap).find(g => paramId.includes(g.dbCat.toLowerCase()));
  
  const [playerId, setPlayerId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  
  const [displayPackages, setDisplayPackages] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);

  useEffect(() => {
    if (!game) return;
    const fetchRealPrices = async () => {
      try {
        const { data, error } = await supabase.from('game_prices').select('id, price, name, bonus').eq('category', game.dbCat);
        if (error) throw error;
        if (data && data.length > 0) {
          setDisplayPackages(data.sort((a, b) => a.price - b.price));
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setIsLoadingPrices(false);
      }
    };
    fetchRealPrices();
  }, [game]);

  if (!game) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#070b19] font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Game not found</h1>
          <p className="text-gray-400 mb-6">ID: {paramId || 'No ID detected'}</p>
          <Link href="/" className="px-6 py-3 bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/50 rounded-xl font-bold hover:bg-[#00f2fe]/30">
            ပင်မစာမျက်နှာသို့ ပြန်သွားမည်
          </Link>
        </div>
      </main>
    );
  }

  const handleCheckout = async () => {
    if (!playerId || (game.requireZone && !zoneId) || !selectedPackage) return alert("Please fill all details!");
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('orders').insert([{
        game_name: game.name, player_id: playerId, zone_id: zoneId || null,
        item_name: selectedPackage.name, price: selectedPackage.price, status: 'pending'
      }]);
      if (error) throw error;
      setOrderSuccess(true);
    } catch (error: any) {
      alert("Error placing order: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-[#070b19] font-sans">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-center max-w-md w-full shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-[#4facfe] to-[#00f2fe] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,242,254,0.3)]">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-white font-bold text-2xl mb-4">အော်ဒါတင်ခြင်း အောင်မြင်ပါသည်!</h2>
          <Link href="/" className="bg-white/10 text-white font-bold py-3 px-8 rounded-xl border border-white/20 hover:bg-white/20">ပင်မစာမျက်နှာသို့</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-32 relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/bg.gif')" }}>
      <div className="absolute inset-0 bg-[#070b19]/60 backdrop-blur-[2px]"></div>
      <div className="relative z-10 max-w-3xl mx-auto p-4 pt-6 space-y-6">
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
          <Link href="/" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></Link>
          <img src={game.img} alt={game.name} className="w-12 h-12 rounded-lg" />
          <h1 className="text-white font-bold text-lg">{game.name}</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl">
          <div className="flex gap-3">
            <input type="text" placeholder="Player ID" value={playerId} onChange={(e) => setPlayerId(e.target.value)} className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f2fe]" />
            {game.requireZone && <input type="text" placeholder="Zone ID" value={zoneId} onChange={(e) => setZoneId(e.target.value)} className="w-1/3 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f2fe]" />}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl">
          <h2 className="text-white font-bold text-sm mb-4">ပမာဏ ရွေးချယ်ပါ</h2>
          {isLoadingPrices ? (
             <div className="text-center text-gray-400 py-10 animate-pulse">ဈေးနှုန်းများ ရယူနေပါသည်...</div>
          ) : displayPackages.length === 0 ? (
             <div className="text-center text-gray-400 py-10">Admin မှ ဈေးနှုန်း သတ်မှတ်ထားခြင်း မရှိသေးပါ။</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {displayPackages.map((pkg: any) => (
                <button
                  key={pkg.id} onClick={() => setSelectedPackage(pkg)}
                  className={`p-3 rounded-xl border text-left transition-all ${selectedPackage?.id === pkg.id ? 'bg-[#00f2fe]/20 border-[#00f2fe] shadow-[0_0_15px_rgba(0,242,254,0.3)]' : 'bg-black/30 border-white/10 hover:border-white/30'}`}
                >
                  <h3 className="text-white font-bold text-[11px] sm:text-xs">{pkg.name}</h3>
                  {pkg.bonus && pkg.bonus !== 'No bonus' && <span className="text-[#00f2fe] text-[9px] block mt-0.5">{pkg.bonus}</span>}
                  <p className="text-gray-300 text-[10px] mt-2 border-t border-white/10 pt-1">Ks {pkg.price.toLocaleString()}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedPackage && (
        <div className="fixed bottom-0 left-0 w-full bg-[#070b19]/90 backdrop-blur-xl p-4 z-50 flex justify-between items-center border-t border-white/10">
          <div>
            <p className="text-gray-400 text-xs">ကျသင့်ငွေ</p>
            <p className="text-[#00f2fe] font-black text-lg">Ks {selectedPackage.price.toLocaleString()}</p>
          </div>
          <button onClick={handleCheckout} disabled={isSubmitting} className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-black font-bold px-8 py-3 rounded-xl">
            {isSubmitting ? 'လုပ်ဆောင်နေသည်...' : 'ဝယ်ယူမည်'}
          </button>
        </div>
      )}
    </main>
  );
}

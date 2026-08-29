'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// (ယခင်ကဲ့သို့ Hardcoded Data အား ဖျောက်ထားမည် မဟုတ်ပါ၊ အင်တာနက်နှေးချိန်တွင် ပုံမှန်ဈေးကို ပြရန်အတွက်ဖြစ်သည်)
const gameDataMap: Record<string, any> = {
  'mobile-legends': { name: 'Mobile Legends', img: '/mlbb.png', requireZone: true, packages: [{ id: 'mlbb_1', name: '55 Diamonds', price: 3461 }, { id: 'mlbb_2', name: '165 Diamonds', price: 10372 }] },
  // နေရာမကျပ်စေရန် အတိုချုံးပြထားသည် (မူလ Data အပြည့်အစုံသည် အောက်တွင် displayPackages ဖြင့် အလုပ်လုပ်မည်)
};

export default function GameTopupPage({ params }: { params: { id: string } }) {
  const game = gameDataMap[params.id];
  
  const [playerId, setPlayerId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  
  // ပြသမည့် ပက်ကေ့ချ်များကို သိမ်းရန် State
  const [displayPackages, setDisplayPackages] = useState<any[]>(game ? game.packages : []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Admin ပြင်ထားသော ဈေးနှုန်းများကို Database မှ ဆွဲယူခြင်း
  useEffect(() => {
    const fetchRealPrices = async () => {
      const catMap: Record<string, string> = {
        'mobile-legends': 'mlbb', 'magic-chess': 'mcgg', 'pubg-uc': 'pubg', 
        'uc-pack': 'ucPack', 'telegram': 'telegram', 'heartopia': 'heartopia', 'smile-coin': 'smileCoin'
      };
      const dbCategory = catMap[params.id];
      
      const { data } = await supabase.from('game_prices').select('id, price, name, bonus').eq('category', dbCategory);
      if (data && data.length > 0) {
        // Database ထဲက ဈေးနှုန်းတွေနဲ့ UI ကို အစားထိုးမည်
        setDisplayPackages(data.sort((a, b) => a.price - b.price));
      }
    };
    fetchRealPrices();
  }, [params.id]);

  if (!game) return <div className="text-white text-center mt-20">Game not found</div>;

  const handleCheckout = async () => {
    if (!playerId || (game.requireZone && !zoneId) || !selectedPackage) return alert("Please fill all details!");
    setIsSubmitting(true);
    const { error } = await supabase.from('orders').insert([{
      game_name: game.name, player_id: playerId, zone_id: zoneId || null,
      item_name: selectedPackage.name, price: selectedPackage.price, status: 'pending'
    }]);
    setIsSubmitting(false);
    if (!error) setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-[#070b19] font-sans">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-center max-w-md w-full shadow-2xl">
          <h2 className="text-white font-bold text-2xl mb-4">အော်ဒါတင်ခြင်း အောင်မြင်ပါသည်!</h2>
          <Link href="/" className="bg-white/10 text-white font-bold py-3 px-8 rounded-xl">ပင်မစာမျက်နှာသို့</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-32 relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/bg.gif')" }}>
      <div className="absolute inset-0 bg-[#070b19]/60 backdrop-blur-[2px]"></div>
      <div className="relative z-10 max-w-3xl mx-auto p-4 pt-6 space-y-6">
        
        {/* Game Info */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl">
          <img src={game.img} alt={game.name} className="w-12 h-12 rounded-lg" />
          <h1 className="text-white font-bold text-lg">{game.name}</h1>
        </div>

        {/* User Input */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
          <div className="flex gap-3">
            <input type="text" placeholder="Player ID" value={playerId} onChange={(e) => setPlayerId(e.target.value)} className="flex-1 bg-black/30 rounded-xl px-4 py-3 text-white focus:outline-none" />
            {game.requireZone && <input type="text" placeholder="Zone ID" value={zoneId} onChange={(e) => setZoneId(e.target.value)} className="w-1/3 bg-black/30 rounded-xl px-4 py-3 text-white focus:outline-none" />}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {displayPackages.map((pkg: any) => (
              <button
                key={pkg.id} onClick={() => setSelectedPackage(pkg)}
                className={`p-3 rounded-xl border text-left transition-all ${selectedPackage?.id === pkg.id ? 'bg-[#00f2fe]/20 border-[#00f2fe]' : 'bg-black/30 border-white/10'}`}
              >
                <h3 className="text-white font-bold text-xs">{pkg.name}</h3>
                <p className="text-gray-300 text-[11px] mt-2 border-t border-white/10 pt-1">Ks {pkg.price.toLocaleString()}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout Bar */}
      {selectedPackage && (
        <div className="fixed bottom-0 left-0 w-full bg-[#070b19]/90 backdrop-blur-xl p-4 z-50 flex justify-between items-center">
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

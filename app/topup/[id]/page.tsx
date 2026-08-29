'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import BottomNav from '../../../components/BottomNav';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Supabase ချိတ်ဆက်ခြင်း
const supabaseUrl = 'https://lejfhsuwajmzikmudmcs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TopupPage() {
  const params = useParams();
  const rawId = (params?.id as string) || '';
  const id = rawId.toLowerCase();

  // Form states
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [aid, setAid] = useState('');
  const [serverField, setServerField] = useState('Global');
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Database States
  const [displayPackages, setDisplayPackages] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);

  // Game Configurations (UI Layout အတွက်သာ၊ Packages အလွတ်ထားမည်)
  const gameConfigs: Record<string, any> = {
    'mobile-legends': { name: 'Mobile Legends', sub: 'All Server', img: '/mlbb.png', inputType: 'mlbb', dbCat: 'mlbb' },
    'mobile-legends-(mlbb)': { name: 'Mobile Legends', sub: 'All Server', img: '/mlbb.png', inputType: 'mlbb', dbCat: 'mlbb' },
    'mlbb': { name: 'Mobile Legends', sub: 'All Server', img: '/mlbb.png', inputType: 'mlbb', dbCat: 'mlbb' },
    
    'magic-chess': { name: 'Magic Chess Go Go', sub: 'All Server', img: '/MCGG.png', inputType: 'mlbb', dbCat: 'mcgg' },
    'mcgg': { name: 'Magic Chess Go Go', sub: 'All Server', img: '/MCGG.png', inputType: 'mlbb', dbCat: 'mcgg' },
    
    'pubg-mobile': { name: 'PUBG UC', sub: 'Global', img: '/pubg.png', inputType: 'pubg', dbCat: 'pubg' },
    'pubg': { name: 'PUBG UC', sub: 'Global', img: '/pubg.png', inputType: 'pubg', dbCat: 'pubg' },
    'pubg-uc': { name: 'PUBG UC', sub: 'Global', img: '/pubg.png', inputType: 'pubg', dbCat: 'pubg' },
    
    'uc-packs': { name: 'UC Pack', sub: 'Global', img: '/Pubgucpack.png', inputType: 'pubg', dbCat: 'ucPack' },
    'uc-pack': { name: 'UC Pack', sub: 'Global', img: '/Pubgucpack.png', inputType: 'pubg', dbCat: 'ucPack' },
    'ucpack': { name: 'UC Pack', sub: 'Global', img: '/Pubgucpack.png', inputType: 'pubg', dbCat: 'ucPack' },
    
    'telegram-premium': { name: 'Telegram Premium', sub: 'Social App', img: '/telegram.png', inputType: 'username', dbCat: 'telegram' },
    'telegram': { name: 'Telegram Premium', sub: 'Social App', img: '/telegram.png', inputType: 'username', dbCat: 'telegram' },
    
    'heartopia': { name: 'Heartopia', sub: 'Game Topup', img: '/heartopia.png', inputType: 'heartopia', dbCat: 'heartopia' },
    
    'smile-coin': { name: 'Smile coin', sub: 'Game Currency', img: '/smile_coin.png', inputType: 'username', dbCat: 'smileCoin' },
    'smilecoin': { name: 'Smile coin', sub: 'Game Currency', img: '/smile_coin.png', inputType: 'username', dbCat: 'smileCoin' }
  };
  
  // ဝင်လာတဲ့ ID ကို အသေအချာရှာမည်
  const game = gameConfigs[id] || Object.values(gameConfigs).find(g => id.includes(g.dbCat.toLowerCase()));

  // Database မှ ဈေးနှုန်းများ အလိုအလျောက် ဆွဲယူခြင်း
  useEffect(() => {
    if (!game) return;
    const fetchRealPrices = async () => {
      try {
        const { data, error } = await supabase.from('game_prices').select('*').eq('category', game.dbCat);
        if (error) throw error;
        if (data && data.length > 0) {
          setDisplayPackages(data.sort((a, b) => Number(a.price) - Number(b.price)));
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setIsLoadingPrices(false);
      }
    };
    fetchRealPrices();
  }, [game]);

  const paymentMethods = [
    { id: 'kpay', name: 'KBZ Pay', img: '/kpay.png' },
    { id: 'wave', name: 'Wave Pay', img: '/wave.png' },
    { id: 'ayapay', name: 'AYA Pay', img: '/ayapay.png' },
    { id: 'uabpay', name: 'UAB Pay', img: '/uabpay.png' }
  ];

  if (!game) {
    return (
      <main className="min-h-screen bg-[#070814] flex flex-col items-center justify-center p-4">
        <h1 className="text-white text-2xl font-bold mb-2">Game Not Found</h1>
        <p className="text-gray-400 text-xs mb-6">Requested ID: {id}</p>
        <Link href="/" className="bg-pink-600 text-white px-6 py-2.5 rounded-full font-medium text-sm">Go Back Home</Link>
      </main>
    );
  }

  const isFormValid = (() => {
    if (!selectedPkg || !paymentMethod) return false;
    if (game.inputType === 'mlbb') return userId && zoneId;
    if (game.inputType === 'pubg') return userId;
    if (game.inputType === 'username') return userId;
    if (game.inputType === 'heartopia') return userId && aid;
    return false;
  })();

  const getTargetAccountText = () => {
    if (!userId) return 'Not filled';
    if (game.inputType === 'mlbb') return zoneId ? `${userId} (${zoneId})` : userId;
    if (game.inputType === 'heartopia') return aid ? `UID: ${userId}, AID: ${aid} (${serverField})` : `UID: ${userId}`;
    return userId;
  };

  // -----------------------------------------------------
  // Database သို့ အော်ဒါတင်ခြင်း (Supabase) အသစ်ထည့်ထားသည်
  // -----------------------------------------------------
  const handleCheckout = async () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('orders').insert([{
        game_name: game.name, 
        player_id: userId, 
        zone_id: zoneId || null,
        item_name: selectedPkg.name, 
        price: selectedPkg.price, 
        status: 'pending'
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
      <main className="min-h-screen flex items-center justify-center bg-[#070814] p-4 text-white">
        <div className="bg-[#131422] p-8 rounded-3xl text-center max-w-md w-full border border-white/5 shadow-2xl">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="font-bold text-2xl mb-2">Order Successful!</h2>
          <p className="text-gray-400 text-sm mb-8">Admin will process your order shortly.</p>
          <Link href="/" className="inline-block bg-pink-600 text-white font-bold py-3.5 px-8 rounded-xl w-full shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:bg-pink-500 transition-colors">Return Home</Link>
        </div>
      </main>
    );
  }

  // ဒီအောက်ပိုင်းက အစ်ကို့ရဲ့ Original UI ကြီးအတိုင်း တစ်စက်ကလေးမှ မထိပါ
  return (
    <main className="min-h-screen bg-[#070814] pb-28 font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 mt-2">
        {/* Banner Section */}
        <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#1a1b2e] to-[#0f1020] p-6 mb-8 flex flex-col md:flex-row gap-5 items-center border border-white/5 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl -z-10"></div>
          <img src={game.img} alt={game.name} className="w-24 h-24 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.3)] object-cover z-10" />
          <div className="z-10 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">{game.name}</h1>
            <p className="text-gray-400 text-sm mt-1">{game.sub}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <span className="bg-white/5 border border-white/10 text-pink-400 px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-1">Instant Process</span>
              <span className="bg-white/5 border border-white/10 text-pink-400 px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-1">100% Safe</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 01 */}
            <section>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl italic font-light text-pink-500/80">01</span>
                <div className="mb-1">
                  <h2 className="text-lg font-bold text-white">Choose Nominal Amount</h2>
                  <p className="text-gray-400 text-[11px]">Pick the {game.name} amount you want to top up</p>
                </div>
              </div>

              {isLoadingPrices ? (
                <div className="text-center text-pink-500 py-10 animate-pulse font-bold">Loading Packages...</div>
              ) : displayPackages.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No items available yet.</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {displayPackages.map((pkg: any) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPkg(pkg)}
                      className={`relative p-3.5 rounded-2xl text-left transition-all duration-200 overflow-hidden ${
                        selectedPkg?.id === pkg.id
                        ? 'bg-pink-950/30 border-2 border-pink-500'
                        : 'bg-[#131422] border-2 border-transparent hover:border-white/10'
                      }`}
                    >
                      {selectedPkg?.id === pkg.id && (
                        <div className="absolute top-0 right-0 bg-pink-500 rounded-bl-xl p-1.5 shadow-md">
                          <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                      )}
                      <div className="text-white font-bold text-sm mb-1">{pkg.name}</div>
                      <div className="text-gray-500 text-[10px] mb-3">{pkg.bonus || 'No bonus'}</div>
                      <div className="text-pink-500 font-extrabold text-sm">{pkg.price.toLocaleString()} Ks</div>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Step 02 */}
            <section>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl italic font-light text-pink-500/80">02</span>
                <div className="mb-1">
                  <h2 className="text-lg font-bold text-white">Game Account Data</h2>
                  <p className="text-gray-400 text-[11px]">Make sure your account details are correct</p>
                </div>
              </div>
              
              <div className="bg-[#131422] p-5 rounded-3xl border border-white/5 space-y-4">
                {game.inputType === 'mlbb' && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2">
                      <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">ID <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Enter ID" className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors" value={userId} onChange={(e) => setUserId(e.target.value)} />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">Server No. <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Enter Server No." className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors" value={zoneId} onChange={(e) => setZoneId(e.target.value)} />
                    </div>
                  </div>
                )}
                {game.inputType === 'pubg' && (
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">Player ID <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter Player ID" className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors" value={userId} onChange={(e) => setUserId(e.target.value)} />
                  </div>
                )}
                {game.inputType === 'username' && (
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">Telegram Username <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="ဥပမာ: @username သို့မဟုတ် phone number" className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors" value={userId} onChange={(e) => setUserId(e.target.value)} />
                  </div>
                )}
                {game.inputType === 'heartopia' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-1/2">
                        <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">UID <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="UID" className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors" value={userId} onChange={(e) => setUserId(e.target.value)} />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">FIELD <span className="text-red-500">*</span></label>
                        <select className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors" value={serverField} onChange={(e) => setServerField(e.target.value)}>
                          <option value="Global">Global</option>
                          <option value="Asia">Asia</option>
                          <option value="America">America</option>
                          <option value="Europe">Europe</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">AID <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="AID" className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors" value={aid} onChange={(e) => setAid(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Step 03 */}
            <section>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl italic font-light text-pink-500/80">03</span>
                <div className="mb-1">
                  <h2 className="text-lg font-bold text-white">Choose Payment Method</h2>
                  <p className="text-gray-400 text-[11px]">Various payment methods available</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`relative p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                      paymentMethod === pm.id
                      ? 'bg-pink-950/30 border-2 border-pink-500'
                      : 'bg-[#131422] border-2 border-transparent hover:border-white/10'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 overflow-hidden shadow-sm mb-1">
                      <img src={pm.img} alt={pm.name} className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `<span class="text-gray-800 font-bold text-xs">${pm.name[0]}</span>`;
                        }}
                      />
                    </div>
                    <span className="text-gray-300 text-[10px] font-medium">{pm.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#131422] rounded-3xl border border-white/5 p-5 shadow-2xl">
              <h3 className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-3">Order Summary</h3>
              
              <div className="flex items-center gap-3 mb-5">
                <img src={game.img} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="text-white font-bold text-sm">{game.name}</h4>
                  <p className="text-pink-500 text-[10px]">{selectedPkg ? selectedPkg.name : 'No amount selected'}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Target Account</p>
                  <p className="text-white text-xs font-medium italic">{getTargetAccountText()}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Payment Method</p>
                  <p className="text-white text-xs font-medium italic">
                    {paymentMethod ? paymentMethods.find(p => p.id === paymentMethod)?.name : 'Not selected'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">{selectedPkg ? selectedPkg.price.toLocaleString() : 0} Ks</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4 mb-6">
                <span className="text-white font-bold text-sm">Total Payment</span>
                <span className="text-pink-500 font-extrabold text-xl">
                  {selectedPkg ? selectedPkg.price.toLocaleString() : 0} Ks
                </span>
              </div>
              
              {/* Buy Now Button with handleCheckout */}
              <button
                onClick={handleCheckout}
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg ${
                  isFormValid && !isSubmitting
                  ? 'bg-pink-600 text-white hover:bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                  : 'bg-[#2a2b3d] text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Processing...' : (!isFormValid ? 'Complete the data first' : 'Buy Now')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

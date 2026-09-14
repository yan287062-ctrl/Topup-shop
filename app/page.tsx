import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
  // နောက်ပိုင်း Supabase နဲ့ ချိတ်ရင် ဒီနေရာမှာ Data လှမ်းယူရုံပဲ
  const totalUsers = "500+"; 
  const totalProducts = "15+";
  const successOrders = "1,200+";
  const avgDeliveryTime = "5s";

  const games = [
    { id: 'mobile-legends', name: 'Mobile Legend', sub: 'Myanmar (Global)', img: '/mlbb.png' },
    { id: 'magic-chess', name: 'Magic Chess', sub: 'Myanmar (Global)', img: '/MCGG.png' },
    { id: 'pubg-uc', name: 'PUBG UC', sub: 'Global', img: '/pubg.png' },
    { id: 'uc-pack', name: 'UC pack', sub: 'Global', img: '/Pubgucpack.png' },
    { id: 'heartopia', name: 'Heartopia', sub: 'Game Topup', img: '/heartopia.png' },
    { id: 'telegram', name: 'Telegram Premium', sub: 'Social App', img: '/telegram.png' },
    { id: 'smile-coin', name: 'Smile coin', sub: 'Game Currency', img: '/smile_coin.png' },
  ];

  return (
    <main
      className="min-h-screen pb-28 relative bg-cover bg-center bg-fixed font-sans"
      style={{ backgroundImage: "url('/bg.gif')" }}
    >
      <div className="absolute inset-0 bg-[#070b19]/60 backdrop-blur-[2px] z-0"></div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#00f2fe]/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 mb-3 mt-4">
          <h2 className="text-gray-200 text-xs sm:text-sm font-semibold tracking-wide">
            ရရှိနိုင်သော ဂိမ်းနှင့် ဝန်ဆောင်မှုများ:
          </h2>
        </div>

        <div className="max-w-4xl mx-auto px-4 grid grid-cols-4 gap-2 sm:gap-3">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/topup/${game.id}`}
              className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:bg-white/20 hover:border-[#00f2fe]/50 flex flex-col group"
            >
              <div className="w-full h-16 sm:h-20 relative bg-black/40">
                <img 
                  src={game.img} 
                  alt={game.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              
              <div className="p-1.5 sm:p-2 flex flex-col justify-between flex-1 bg-black/20 backdrop-blur-sm border-t border-white/10">
                <h3 className="text-white font-bold text-[9px] sm:text-[11px] truncate">{game.name}</h3>
                <p className="text-[#00f2fe] font-semibold text-[7px] sm:text-[9px] truncate mt-0.5">{game.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ==================== 1. How it Works (3 Steps) ==================== */}
        <div className="max-w-5xl mx-auto px-4 mt-20">
          <h2 className="text-3xl font-bold text-white mb-2">Fully Automated. <span className="text-pink-500 italic">Instant Delivery.</span></h2>
          <p className="text-gray-400 text-sm mb-8">Powered by our advanced auto-bot system. No waiting time, top up directly and get your diamonds in seconds.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#131422] p-8 rounded-3xl border border-white/5 shadow-lg relative overflow-hidden transition hover:border-pink-500/30">
               <div className="text-6xl font-bold text-pink-500/10 absolute top-4 right-4 italic">01</div>
               <h3 className="text-lg font-bold text-white mb-3 relative z-10">Select Your Game</h3>
               <p className="text-gray-400 text-xs relative z-10 leading-relaxed">Choose Mobile Legends, PUBG, or any other supported game. Select the diamond package you need.</p>
            </div>
            
            <div className="bg-[#131422] p-8 rounded-3xl border border-white/5 shadow-lg relative overflow-hidden transition hover:border-pink-500/30">
               <div className="text-6xl font-bold text-pink-500/10 absolute top-4 right-4 italic">02</div>
               <h3 className="text-lg font-bold text-white mb-3 relative z-10">Enter Game ID</h3>
               <p className="text-gray-400 text-xs relative z-10 leading-relaxed">Carefully input your User ID & Zone ID. Our system will automatically verify your account before processing.</p>
            </div>

            <div className="bg-[#131422] p-8 rounded-3xl border border-white/5 shadow-lg relative overflow-hidden transition hover:border-pink-500/30">
               <div className="text-6xl font-bold text-pink-500/10 absolute top-4 right-4 italic">03</div>
               <h3 className="text-lg font-bold text-white mb-3 relative z-10">Auto Processing</h3>
               <p className="text-gray-400 text-xs relative z-10 leading-relaxed">Once you confirm the payment from your wallet, our bot completes the order in less than 5 seconds.</p>
            </div>
          </div>
        </div>

        {/* ==================== 2. Statistics (Numbers) ==================== */}
        <div className="max-w-5xl mx-auto px-4 mt-20 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-2/5">
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Trust the <br/><span className="text-pink-500 italic">System.</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed">We provide a secure, fast, and automated gaming top-up experience. Thousands of gamers trust Paing Gyi Shop for their daily needs.</p>
            <Link href="#games">
              <button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.4)] transition">
                Top up now
              </button>
            </Link>
          </div>
          
          <div className="w-full md:w-3/5 grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
             <div className="bg-[#131422] p-8">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">Active Users</p>
                <h4 className="text-4xl font-bold text-white">{totalUsers}</h4>
                <p className="text-gray-600 text-[10px] mt-2">registered on our platform</p>
             </div>
             <div className="bg-[#131422] p-8">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">Supported Products</p>
                <h4 className="text-4xl font-bold text-white">{totalProducts}</h4>
                <p className="text-gray-600 text-[10px] mt-2">games & services available</p>
             </div>
             <div className="bg-[#131422] p-8">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">Successful Orders</p>
                <h4 className="text-4xl font-bold text-white">{successOrders}</h4>
                <p className="text-gray-600 text-[10px] mt-2">processed automatically</p>
             </div>
             <div className="bg-[#131422] p-8">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">Avg. Delivery Time</p>
                <h4 className="text-4xl font-bold text-white">{avgDeliveryTime}</h4>
                <p className="text-gray-600 text-[10px] mt-2">via auto-bot system</p>
             </div>
          </div>
        </div>

        {/* ==================== 3. FAQ Section (မြန်မာလို) ==================== */}
        <div className="max-w-3xl mx-auto px-4 mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Things users <span className="text-pink-500 italic">ask often.</span></h2>
          <div className="space-y-4">
             <details className="bg-[#131422] rounded-2xl border border-white/5 group overflow-hidden cursor-pointer">
                <summary className="p-6 text-sm font-medium text-white flex justify-between items-center list-none outline-none">
                   ငွေမဖြည့်ဘဲ တိုက်ရိုက်ဝယ်လို့ရနိုင်လား?
                   <span className="text-pink-500 text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-400 text-xs leading-relaxed">
                   ရပါတယ်။ KPay, Wave Money တို့ဖြင့် ငွေလွှဲပြေစာ (Screenshot) တင်ပြီး တိုက်ရိုက် ဝယ်ယူနိုင်ပါတယ်။ အက်မင်မှ စစ်ဆေးပြီး မိနစ်ပိုင်းအတွင်း စိန်ရောက်ရှိပါမည်။
                </div>
             </details>
             
             <details className="bg-[#131422] rounded-2xl border border-white/5 group overflow-hidden cursor-pointer">
                <summary className="p-6 text-sm font-medium text-white flex justify-between items-center list-none outline-none">
                   Wallet ငွေဖြည့်ချင်ရင် ဘယ်အချိန်ကနေ ဘယ်အချိန်အတွင်း ဖြည့်လို့ရလဲ
                   <span className="text-pink-500 text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-400 text-xs leading-relaxed">
                   Website မှတဆင့် 24 နာရီ အချိန်မရွေး ငွေဖြည့်သွင်းနိုင်ပါတယ်။ Wallet ထဲတွင် ငွေရှိပါက Auto Bot မှ စိန်ကို ချက်ချင်း (Auto) လွှဲပေးသွားမည် ဖြစ်ပါသည်။
                </div>
             </details>

             <details className="bg-[#131422] rounded-2xl border border-white/5 group overflow-hidden cursor-pointer">
                <summary className="p-6 text-sm font-medium text-white flex justify-between items-center list-none outline-none">
                   Owner ကိုဘယ်လိုဆက်သွယ်ရမလဲ
                   <span className="text-pink-500 text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-400 text-xs leading-relaxed">
                   အခက်အခဲ တစ်စုံတစ်ရာ ရှိပါက Telegram Bot သို့မဟုတ် Page Messenger မှတဆင့် အချိန်မရွေး ဆက်သွယ် မေးမြန်းနိုင်ပါသည်။
                </div>
             </details>
          </div>
        </div>

        {/* ==================== 4. Footer ==================== */}
        <footer className="max-w-5xl mx-auto px-4 mt-24 pt-12 border-t border-white/5 pb-28 md:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1 md:col-span-1">
               <h3 className="text-xl font-bold text-white mb-4">PAING GYI <span className="text-pink-500">SHOP</span></h3>
               <p className="text-gray-400 text-xs leading-relaxed mb-4">Fast, reliable, and automated gaming top-ups. Buy premium subscriptions and get instant delivery 24/7 with our Auto-bot.</p>
            </div>
            
            <div>
               <h4 className="text-white text-xs font-bold mb-5 uppercase tracking-widest">Navigation</h4>
               <ul className="space-y-3 text-gray-400 text-sm">
                 <li><Link href="/" className="hover:text-pink-500 transition">Home</Link></li>
                 <li><Link href="/account" className="hover:text-pink-500 transition">My Account</Link></li>
                 <li><Link href="/history" className="hover:text-pink-500 transition">Track Order</Link></li>
               </ul>
            </div>
            
            <div>
               <h4 className="text-white text-xs font-bold mb-5 uppercase tracking-widest">Help</h4>
               <ul className="space-y-3 text-gray-400 text-sm">
                 <li><Link href="#" className="hover:text-pink-500 transition">Telegram Support</Link></li>
                 <li><Link href="#" className="hover:text-pink-500 transition">Facebook Page</Link></li>
                 <li><Link href="#" className="hover:text-pink-500 transition">Terms & Conditions</Link></li>
               </ul>
            </div>
            
            <div>
               <h4 className="text-white text-xs font-bold mb-5 uppercase tracking-widest">Payment Methods</h4>
               <div className="flex flex-wrap gap-2">
                  <span className="bg-[#131422] border border-white/10 text-xs text-gray-300 px-3 py-1.5 rounded-md">KBZ Pay</span>
                  <span className="bg-[#131422] border border-white/10 text-xs text-gray-300 px-3 py-1.5 rounded-md">Wave Pay</span>
                  <span className="bg-[#131422] border border-white/10 text-xs text-gray-300 px-3 py-1.5 rounded-md">Website Wallet</span>
               </div>
               <p className="text-gray-500 text-[10px] mt-4 flex items-center gap-1">
                 <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 Encrypted secure transactions
               </p>
            </div>
          </div>
          
          <div className="text-center text-gray-600 text-[10px]">
             © 2026 Paing Gyi Game Store. All rights reserved.
          </div>
        </footer>

      </div>
    </main>
  );
}
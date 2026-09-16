import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
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
      // မျက်စိအေးတဲ့ Dark Slate/Navy Blue နောက်ခံ (#0b1120)
      className="min-h-screen pb-28 relative bg-[#0b1120] font-sans"
    >
      {/* ပိုပြီး နုတဲ့အပြာရောင် Glow Effect လေးတွေ (#38bdf8) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#38bdf8]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 mb-3 mt-4">
          <h2 className="text-[#94a3b8] text-xs sm:text-sm font-semibold tracking-wide">
            ရရှိနိုင်သော ဂိမ်းနှင့် ဝန်ဆောင်မှုများ:
          </h2>
        </div>

        <div className="max-w-4xl mx-auto px-4 grid grid-cols-4 gap-2 sm:gap-3">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/topup/${game.id}`}
              // ကတ်လေးတွေကို ဖန်သားပြင်လို (Glassmorphism) နုနုလေး လုပ်ထားတယ် (#1e293b)
              className="bg-[#1e293b]/60 backdrop-blur-md border border-[#38bdf8]/10 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:bg-[#1e293b] hover:border-[#38bdf8]/40 flex flex-col group"
            >
              <div className="w-full h-16 sm:h-20 relative bg-[#0f172a]">
                <img 
                  src={game.img} 
                  alt={game.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                />
              </div>
              
              <div className="p-1.5 sm:p-2 flex flex-col justify-between flex-1 bg-[#1e293b]/40 backdrop-blur-sm border-t border-[#38bdf8]/10">
                <h3 className="text-gray-100 font-bold text-[9px] sm:text-[11px] truncate">{game.name}</h3>
                <p className="text-[#38bdf8] font-medium text-[7px] sm:text-[9px] truncate mt-0.5">{game.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ==================== 1. How it Works ==================== */}
        <div className="max-w-5xl mx-auto px-4 mt-20">
          <h2 className="text-3xl font-bold text-white mb-2">Fully Automated. <span className="text-[#38bdf8] italic">Instant Delivery.</span></h2>
          <p className="text-[#94a3b8] text-sm mb-8">Powered by our advanced auto-bot system. No waiting time, top up directly and get your diamonds in seconds.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1e293b]/60 p-8 rounded-3xl border border-[#38bdf8]/10 shadow-lg relative overflow-hidden transition hover:border-[#38bdf8]/30">
               <div className="text-6xl font-bold text-[#38bdf8]/5 absolute top-4 right-4 italic">01</div>
               <h3 className="text-lg font-bold text-gray-100 mb-3 relative z-10">Select Your Game</h3>
               <p className="text-[#94a3b8] text-xs relative z-10 leading-relaxed">Choose Mobile Legends, PUBG, or any other supported game. Select the diamond package you need.</p>
            </div>
            
            <div className="bg-[#1e293b]/60 p-8 rounded-3xl border border-[#38bdf8]/10 shadow-lg relative overflow-hidden transition hover:border-[#38bdf8]/30">
               <div className="text-6xl font-bold text-[#38bdf8]/5 absolute top-4 right-4 italic">02</div>
               <h3 className="text-lg font-bold text-gray-100 mb-3 relative z-10">Enter Game ID</h3>
               <p className="text-[#94a3b8] text-xs relative z-10 leading-relaxed">Carefully input your User ID & Zone ID. Our system will automatically verify your account before processing.</p>
            </div>

            <div className="bg-[#1e293b]/60 p-8 rounded-3xl border border-[#38bdf8]/10 shadow-lg relative overflow-hidden transition hover:border-[#38bdf8]/30">
               <div className="text-6xl font-bold text-[#38bdf8]/5 absolute top-4 right-4 italic">03</div>
               <h3 className="text-lg font-bold text-gray-100 mb-3 relative z-10">Auto Processing</h3>
               <p className="text-[#94a3b8] text-xs relative z-10 leading-relaxed">Once you confirm the payment from your wallet, our bot completes the order in less than 5 seconds.</p>
            </div>
          </div>
        </div>

        {/* ==================== 2. Statistics ==================== */}
        <div className="max-w-5xl mx-auto px-4 mt-20 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-2/5">
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Trust the <br/><span className="text-[#38bdf8] italic">System.</span></h2>
            <p className="text-[#94a3b8] text-sm leading-relaxed">We provide a secure, fast, and automated gaming top-up experience. Thousands of gamers trust Paing Gyi Shop for their daily needs.</p>
            <Link href="#games">
              <button className="mt-6 bg-[#38bdf8] hover:bg-[#0284c7] text-[#0f172a] text-sm font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)] transition">
                Top up now
              </button>
            </Link>
          </div>
          
          <div className="w-full md:w-3/5 grid grid-cols-2 gap-px bg-[#38bdf8]/10 border border-[#38bdf8]/10 rounded-3xl overflow-hidden">
             <div className="bg-[#1e293b]/80 p-8">
                <p className="text-[#94a3b8] text-[10px] font-bold uppercase tracking-wider mb-2">Active Users</p>
                <h4 className="text-4xl font-bold text-white">{totalUsers}</h4>
             </div>
             <div className="bg-[#1e293b]/80 p-8">
                <p className="text-[#94a3b8] text-[10px] font-bold uppercase tracking-wider mb-2">Supported Products</p>
                <h4 className="text-4xl font-bold text-white">{totalProducts}</h4>
             </div>
             <div className="bg-[#1e293b]/80 p-8">
                <p className="text-[#94a3b8] text-[10px] font-bold uppercase tracking-wider mb-2">Successful Orders</p>
                <h4 className="text-4xl font-bold text-white">{successOrders}</h4>
             </div>
             <div className="bg-[#1e293b]/80 p-8">
                <p className="text-[#94a3b8] text-[10px] font-bold uppercase tracking-wider mb-2">Avg. Delivery Time</p>
                <h4 className="text-4xl font-bold text-white">{avgDeliveryTime}</h4>
             </div>
          </div>
        </div>

        {/* ==================== 3. FAQ Section ==================== */}
        <div className="max-w-3xl mx-auto px-4 mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Things users <span className="text-[#38bdf8] italic">ask often.</span></h2>
          <div className="space-y-4">
             <details className="bg-[#1e293b]/60 rounded-2xl border border-[#38bdf8]/10 group overflow-hidden cursor-pointer">
                <summary className="p-6 text-sm font-medium text-gray-200 flex justify-between items-center list-none outline-none">
                   ငွေမဖြည့်ဘဲ တိုက်ရိုက်ဝယ်လို့ရနိုင်လား?
                   <span className="text-[#38bdf8] text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-[#94a3b8] text-xs leading-relaxed">
                   ရပါတယ်။ KPay, Wave Money တို့ဖြင့် ငွေလွှဲပြေစာ (Screenshot) တင်ပြီး တိုက်ရိုက် ဝယ်ယူနိုင်ပါတယ်။ အက်မင်မှ စစ်ဆေးပြီး မိနစ်ပိုင်းအတွင်း စိန်ရောက်ရှိပါမည်။
                </div>
             </details>
             
             <details className="bg-[#1e293b]/60 rounded-2xl border border-[#38bdf8]/10 group overflow-hidden cursor-pointer">
                <summary className="p-6 text-sm font-medium text-gray-200 flex justify-between items-center list-none outline-none">
                   Wallet ငွေဖြည့်ချင်ရင် ဘယ်အချိန်ကနေ ဘယ်အချိန်အတွင်း ဖြည့်လို့ရလဲ
                   <span className="text-[#38bdf8] text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-[#94a3b8] text-xs leading-relaxed">
                   Website မှတဆင့် 24 နာရီ အချိန်မရွေး ငွေဖြည့်သွင်းနိုင်ပါတယ်။ Wallet ထဲတွင် ငွေရှိပါက Auto Bot မှ စိန်ကို ချက်ချင်း (Auto) လွှဲပေးသွားမည် ဖြစ်ပါသည်။
                </div>
             </details>

             <details className="bg-[#1e293b]/60 rounded-2xl border border-[#38bdf8]/10 group overflow-hidden cursor-pointer">
                <summary className="p-6 text-sm font-medium text-gray-200 flex justify-between items-center list-none outline-none">
                   Owner ကိုဘယ်လိုဆက်သွယ်ရမလဲ
                   <span className="text-[#38bdf8] text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-[#94a3b8] text-xs leading-relaxed">
                   အခက်အခဲ တစ်စုံတစ်ရာ ရှိပါက Telegram Bot သို့မဟုတ် Page Messenger မှတဆင့် အချိန်မရွေး ဆက်သွယ် မေးမြန်းနိုင်ပါသည်။
                </div>
             </details>
          </div>
        </div>

        {/* ==================== 4. Footer ==================== */}
        <footer className="max-w-5xl mx-auto px-4 mt-24 pt-12 border-t border-[#38bdf8]/10 pb-28 md:pb-12">
          <div className="text-center text-[#64748b] text-[10px]">
             © 2026 Paing Gyi Game Store. All rights reserved.
          </div>
        </footer>

      </div>
    </main>
  );
}
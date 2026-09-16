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
      // ပုံထဲကအတိုင်း သဲရောင်နုနုလေးကို Background အဖြစ်သုံးထားပါတယ်
      className="min-h-screen pb-28 relative bg-[#E4D5B7] font-sans"
    >
      {/* Soft Glow Effect */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#4A5C82]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 mb-3 mt-4">
          <h2 className="text-[#4A5C82] text-xs sm:text-sm font-bold tracking-wide uppercase">
            ရရှိနိုင်သော ဂိမ်းနှင့် ဝန်ဆောင်မှုများ:
          </h2>
        </div>

        {/* ==================== Games List ==================== */}
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-4 gap-2 sm:gap-3">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/topup/${game.id}`}
              // ကတ်တွေကို Denim Blue အရောင်သုံးပြီး ပုံထဲကလို Solid Shadow ပုံစံလေး ထည့်ထားတယ်
              className="bg-[#4A5C82] border border-[#4A5C82] shadow-[4px_4px_0px_rgba(74,92,130,0.3)] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(74,92,130,0.4)] flex flex-col group"
            >
              <div className="w-full h-16 sm:h-20 relative bg-[#2D3A54]">
                <img 
                  src={game.img} 
                  alt={game.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                />
              </div>
              
              <div className="p-1.5 sm:p-2 flex flex-col justify-between flex-1 bg-[#4A5C82] border-t border-[#E4D5B7]/20">
                {/* စာသားတွေကို သဲရောင်၊ အောက်က Sub ကို မုန်ညင်းဝါရောင် သုံးထားတယ် */}
                <h3 className="text-[#E4D5B7] font-bold text-[9px] sm:text-[11px] truncate uppercase">{game.name}</h3>
                <p className="text-[#D99B48] font-bold text-[7px] sm:text-[9px] truncate mt-0.5 uppercase">{game.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ==================== 1. How it Works ==================== */}
        <div className="max-w-5xl mx-auto px-4 mt-20">
          <h2 className="text-3xl font-black text-[#4A5C82] mb-2 uppercase tracking-tight">Fully Automated. <span className="text-[#D99B48] italic">Instant Delivery.</span></h2>
          <p className="text-[#4A5C82]/80 text-sm mb-8 font-medium">Powered by our advanced auto-bot system. No waiting time, top up directly and get your diamonds in seconds.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#4A5C82] p-8 rounded-3xl border border-[#4A5C82] shadow-[6px_6px_0px_rgba(74,92,130,0.2)] relative overflow-hidden transition hover:-translate-y-1">
               <div className="text-6xl font-black text-[#E4D5B7]/20 absolute top-4 right-4 italic">01</div>
               <h3 className="text-lg font-bold text-[#E4D5B7] mb-3 relative z-10 uppercase tracking-wide">Select Your Game</h3>
               <p className="text-[#E4D5B7]/90 text-xs relative z-10 leading-relaxed">Choose Mobile Legends, PUBG, or any other supported game. Select the diamond package you need.</p>
            </div>
            
            <div className="bg-[#4A5C82] p-8 rounded-3xl border border-[#4A5C82] shadow-[6px_6px_0px_rgba(74,92,130,0.2)] relative overflow-hidden transition hover:-translate-y-1">
               <div className="text-6xl font-black text-[#E4D5B7]/20 absolute top-4 right-4 italic">02</div>
               <h3 className="text-lg font-bold text-[#E4D5B7] mb-3 relative z-10 uppercase tracking-wide">Enter Game ID</h3>
               <p className="text-[#E4D5B7]/90 text-xs relative z-10 leading-relaxed">Carefully input your User ID & Zone ID. Our system will automatically verify your account before processing.</p>
            </div>

            <div className="bg-[#4A5C82] p-8 rounded-3xl border border-[#4A5C82] shadow-[6px_6px_0px_rgba(74,92,130,0.2)] relative overflow-hidden transition hover:-translate-y-1">
               <div className="text-6xl font-black text-[#E4D5B7]/20 absolute top-4 right-4 italic">03</div>
               <h3 className="text-lg font-bold text-[#E4D5B7] mb-3 relative z-10 uppercase tracking-wide">Auto Processing</h3>
               <p className="text-[#E4D5B7]/90 text-xs relative z-10 leading-relaxed">Once you confirm the payment from your wallet, our bot completes the order in less than 5 seconds.</p>
            </div>
          </div>
        </div>

        {/* ==================== 2. Statistics ==================== */}
        <div className="max-w-5xl mx-auto px-4 mt-20 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-2/5">
            <h2 className="text-4xl font-black text-[#4A5C82] mb-4 leading-tight uppercase tracking-tight">Trust the <br/><span className="text-[#D99B48] italic">System.</span></h2>
            <p className="text-[#4A5C82]/80 text-sm font-medium leading-relaxed">We provide a secure, fast, and automated gaming top-up experience. Thousands of gamers trust Paing Gyi Shop for their daily needs.</p>
            <Link href="#games">
              <button className="mt-6 bg-[#D99B48] hover:bg-[#c2873b] text-[#E4D5B7] text-sm font-extrabold py-3 px-8 rounded-full shadow-[4px_4px_0px_rgba(74,92,130,0.3)] transition-all hover:-translate-y-1 uppercase tracking-wider">
                Top up now
              </button>
            </Link>
          </div>
          
          <div className="w-full md:w-3/5 grid grid-cols-2 gap-px bg-[#4A5C82]/30 border border-[#4A5C82]/30 rounded-3xl overflow-hidden shadow-[6px_6px_0px_rgba(74,92,130,0.2)]">
             <div className="bg-[#4A5C82] p-8">
                <p className="text-[#D99B48] text-[10px] font-bold uppercase tracking-wider mb-2">Active Users</p>
                <h4 className="text-4xl font-black text-[#E4D5B7]">{totalUsers}</h4>
             </div>
             <div className="bg-[#4A5C82] p-8">
                <p className="text-[#D99B48] text-[10px] font-bold uppercase tracking-wider mb-2">Supported Products</p>
                <h4 className="text-4xl font-black text-[#E4D5B7]">{totalProducts}</h4>
             </div>
             <div className="bg-[#4A5C82] p-8">
                <p className="text-[#D99B48] text-[10px] font-bold uppercase tracking-wider mb-2">Successful Orders</p>
                <h4 className="text-4xl font-black text-[#E4D5B7]">{successOrders}</h4>
             </div>
             <div className="bg-[#4A5C82] p-8">
                <p className="text-[#D99B48] text-[10px] font-bold uppercase tracking-wider mb-2">Avg. Delivery Time</p>
                <h4 className="text-4xl font-black text-[#E4D5B7]">{avgDeliveryTime}</h4>
             </div>
          </div>
        </div>

        {/* ==================== 3. FAQ Section ==================== */}
        <div className="max-w-3xl mx-auto px-4 mt-24">
          <h2 className="text-3xl font-black text-[#4A5C82] text-center mb-10 uppercase tracking-tight">Things users <span className="text-[#D99B48] italic">ask often.</span></h2>
          <div className="space-y-4">
             <details className="bg-[#4A5C82] rounded-2xl border border-[#4A5C82] group overflow-hidden cursor-pointer shadow-[4px_4px_0px_rgba(74,92,130,0.2)]">
                <summary className="p-6 text-sm font-bold text-[#E4D5B7] flex justify-between items-center list-none outline-none">
                   ငွေမဖြည့်ဘဲ တိုက်ရိုက်ဝယ်လို့ရနိုင်လား?
                   <span className="text-[#D99B48] text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-[#E4D5B7]/90 text-xs leading-relaxed">
                   ရပါတယ်။ KPay, Wave Money တို့ဖြင့် ငွေလွှဲပြေစာ (Screenshot) တင်ပြီး တိုက်ရိုက် ဝယ်ယူနိုင်ပါတယ်။ အက်မင်မှ စစ်ဆေးပြီး မိနစ်ပိုင်းအတွင်း စိန်ရောက်ရှိပါမည်။
                </div>
             </details>
             
             <details className="bg-[#4A5C82] rounded-2xl border border-[#4A5C82] group overflow-hidden cursor-pointer shadow-[4px_4px_0px_rgba(74,92,130,0.2)]">
                <summary className="p-6 text-sm font-bold text-[#E4D5B7] flex justify-between items-center list-none outline-none">
                   Wallet ငွေဖြည့်ချင်ရင် ဘယ်အချိန်ကနေ ဘယ်အချိန်အတွင်း ဖြည့်လို့ရလဲ
                   <span className="text-[#D99B48] text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-[#E4D5B7]/90 text-xs leading-relaxed">
                   Website မှတဆင့် 24 နာရီ အချိန်မရွေး ငွေဖြည့်သွင်းနိုင်ပါတယ်။ Wallet ထဲတွင် ငွေရှိပါက Auto Bot မှ စိန်ကို ချက်ချင်း (Auto) လွှဲပေးသွားမည် ဖြစ်ပါသည်။
                </div>
             </details>

             <details className="bg-[#4A5C82] rounded-2xl border border-[#4A5C82] group overflow-hidden cursor-pointer shadow-[4px_4px_0px_rgba(74,92,130,0.2)]">
                <summary className="p-6 text-sm font-bold text-[#E4D5B7] flex justify-between items-center list-none outline-none">
                   Owner ကိုဘယ်လိုဆက်သွယ်ရမလဲ
                   <span className="text-[#D99B48] text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-[#E4D5B7]/90 text-xs leading-relaxed">
                   အခက်အခဲ တစ်စုံတစ်ရာ ရှိပါက Telegram Bot သို့မဟုတ် Page Messenger မှတဆင့် အချိန်မရွေး ဆက်သွယ် မေးမြန်းနိုင်ပါသည်။
                </div>
             </details>
          </div>
        </div>

        {/* ==================== 4. Footer ==================== */}
        <footer className="max-w-5xl mx-auto px-4 mt-24 pt-12 border-t border-[#4A5C82]/20 pb-28 md:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1 md:col-span-1">
               <h3 className="text-xl font-black text-[#4A5C82] mb-4 uppercase">PAING GYI <span className="text-[#D99B48]">SHOP</span></h3>
               <p className="text-[#4A5C82]/80 font-medium text-xs leading-relaxed mb-4">Fast, reliable, and automated gaming top-ups. Buy premium subscriptions and get instant delivery 24/7 with our Auto-bot.</p>
            </div>
            
            <div>
               <h4 className="text-[#4A5C82] text-xs font-black mb-5 uppercase tracking-widest">Navigation</h4>
               <ul className="space-y-3 text-[#4A5C82]/80 font-medium text-sm">
                 <li><Link href="/" className="hover:text-[#D99B48] transition">Home</Link></li>
                 <li><Link href="/account" className="hover:text-[#D99B48] transition">My Account</Link></li>
                 <li><Link href="/history" className="hover:text-[#D99B48] transition">Track Order</Link></li>
               </ul>
            </div>
            
            <div>
               <h4 className="text-[#4A5C82] text-xs font-black mb-5 uppercase tracking-widest">Help</h4>
               <ul className="space-y-3 text-[#4A5C82]/80 font-medium text-sm">
                 <li><Link href="#" className="hover:text-[#D99B48] transition">Telegram Support</Link></li>
                 <li><Link href="#" className="hover:text-[#D99B48] transition">Facebook Page</Link></li>
                 <li><Link href="#" className="hover:text-[#D99B48] transition">Terms & Conditions</Link></li>
               </ul>
            </div>
            
            <div>
               <h4 className="text-[#4A5C82] text-xs font-black mb-5 uppercase tracking-widest">Payment Methods</h4>
               <div className="flex flex-wrap gap-2">
                  <span className="bg-[#4A5C82] text-xs text-[#E4D5B7] px-3 py-1.5 rounded-md shadow-sm font-bold tracking-wide">KBZ Pay</span>
                  <span className="bg-[#4A5C82] text-xs text-[#E4D5B7] px-3 py-1.5 rounded-md shadow-sm font-bold tracking-wide">Wave Pay</span>
                  <span className="bg-[#4A5C82] text-xs text-[#E4D5B7] px-3 py-1.5 rounded-md shadow-sm font-bold tracking-wide">Website Wallet</span>
               </div>
               <p className="text-[#4A5C82]/70 font-medium text-[10px] mt-4 flex items-center gap-1">
                 <svg className="w-3 h-3 text-[#D99B48]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 Encrypted secure transactions
               </p>
            </div>
          </div>
          
          <div className="text-center text-[#4A5C82]/60 font-medium text-[10px]">
             © 2026 Paing Gyi Game Store. All rights reserved.
          </div>
        </footer>

      </div>
    </main>
  );
}
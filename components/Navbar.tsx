import Link from 'next/link';

export default function Navbar() {
  return (
    // pt-6 ဖြင့် အပေါ်မှ အောက်သို့ သိသိသာသာ ခပ်ခွာခွာဖြစ်စေရန် နေရာလွတ်ပေးထားပါသည်
    <div className="w-full flex justify-center z-50 pt-6 px-4 mb-6">
      <nav className="w-full max-w-[550px] bg-[#1a1b2e]/95 backdrop-blur-md border border-white/10 rounded-full px-5 py-3 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        
        {/* ဘယ်ဘက်: Logo နှင့် နာမည် */}
        <Link href="/" className="flex items-center space-x-2.5">
          <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-sm" />
          <div className="flex items-baseline space-x-1.5">
            <span className="text-white font-bold text-[15px] tracking-wide">Paing Gyi</span>
            <span className="text-pink-500 font-bold text-[15px]">shop</span>
          </div>
        </Link>
        
        {/* ညာဘက်: Track Order, Balance (0 Ks), Logout */}
        <div className="flex items-center space-x-2">
          <button className="text-[10px] text-gray-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-medium whitespace-nowrap hover:bg-white/10 transition">
            Track Order
          </button>
          
          <button className="text-[10px] text-white bg-pink-600/20 border border-pink-500/60 shadow-[0_0_10px_rgba(236,72,153,0.2)] px-3 py-1.5 rounded-full font-bold whitespace-nowrap">
            0 Ks
          </button>
          
          <button className="text-[10px] text-pink-400 bg-transparent border border-pink-900/60 px-3 py-1.5 rounded-full font-medium transition hover:bg-pink-900/30 whitespace-nowrap">
            Logout
          </button>
        </div>

      </nav>
    </div>
  );
}

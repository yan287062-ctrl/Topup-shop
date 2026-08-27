import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="sticky top-4 w-full flex justify-center z-50 px-4 mb-6">
      <nav className="w-full bg-[#1a1b2e]/95 backdrop-blur-md border border-white/10 rounded-full px-4 py-2.5 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        {/* ဘယ်ဘက် Logo နှင့် နာမည် */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-sm" />
          <div className="flex items-baseline space-x-1">
            <span className="text-white font-bold text-[14px] tracking-wide">Paing Gyi</span>
            <span className="text-pink-500 font-bold text-[14px]">shop</span>
          </div>
        </Link>
        
        {/* ညာဘက် Items များ */}
        <div className="flex items-center space-x-2.5">
          <span className="text-[10px] text-gray-300 bg-white/10 px-3 py-1.5 rounded-full font-medium whitespace-nowrap">
            Track Order
          </span>
          <span className="text-[11px] text-white bg-pink-900/60 border border-pink-500/50 px-3 py-1.5 rounded-full font-bold whitespace-nowrap">
            0 Ks
          </span>
        </div>
      </nav>
    </div>
  );
}

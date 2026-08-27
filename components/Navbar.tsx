import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="sticky top-4 w-full flex justify-center z-50 px-4 mb-6">
      <nav className="w-full bg-[#1a1b2e]/95 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        
        {/* ဘယ်ဘက်: Logo, နာမည် နှင့် 0 Ks */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-sm" />
            <div className="flex items-baseline space-x-1">
              <span className="text-white font-bold text-[14px] tracking-wide">Paing Gyi</span>
              <span className="text-pink-500 font-bold text-[14px]">shop</span>
            </div>
          </Link>
          <span className="text-[10px] text-white bg-pink-900/70 border border-pink-500/50 px-2.5 py-1 rounded-full font-bold whitespace-nowrap">
            0 Ks
          </span>
        </div>
        
        {/* ညာဘက်: Logout ခလုတ် */}
        <div className="flex items-center">
          <button className="text-[11px] text-pink-500 bg-pink-950/40 border border-pink-900/60 px-4 py-1.5 rounded-full font-medium transition-colors hover:bg-pink-900/80">
            Logout
          </button>
        </div>

      </nav>
    </div>
  );
}

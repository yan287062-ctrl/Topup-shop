'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-4 py-4 md:px-8 bg-[#070814]/80 backdrop-blur-md sticky top-0 z-50">
      {/* Left: Logo & Brand Name */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
          <img src="/logo.png" alt="Paing Gyi Shop" className="w-full h-full object-cover" 
            onError={(e) => {
              e.currentTarget.src = 'https://ui-avatars.com/api/?name=PG&background=ec4899&color=fff';
            }}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-white font-black text-sm tracking-widest uppercase">
            Paing Gyi <span className="text-pink-500">shop</span>
          </h1>
        </div>
      </Link>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="bg-[#131422] border border-white/10 text-gray-300 px-3.5 py-2 rounded-full text-[10px] font-bold hover:bg-white/5 transition-colors hidden sm:block">
          Track Order
        </button>
        <Link href="/wallet" className="bg-pink-600/20 border border-pink-500/30 text-pink-400 px-3.5 py-2 rounded-full text-[10px] font-bold hover:bg-pink-600/30 transition-colors shadow-[0_0_10px_rgba(236,72,153,0.2)]">
          0 Ks
        </Link>
        {/* Login ခလုတ်အသစ် */}
        <Link href="/login" className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-full text-[10px] font-bold transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)]">
          Login
        </Link>
      </div>
    </nav>
  );
}

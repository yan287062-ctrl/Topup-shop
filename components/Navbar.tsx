import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="sticky top-4 w-full flex justify-center z-50 px-3 mb-8">
      <nav className="w-full max-w-[500px] bg-[#1a1b2e]/95 backdrop-blur-md border border-white/10 rounded-full px-3 py-2 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all">
        {/* ဘယ်ဘက် Logo နှင့် နာမည် */}
        <Link href="/" className="flex items-center space-x-2 pl-1">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-sm" />
          <div className="flex items-baseline space-x-1">
            <span className="text-white font-bold text-[14px] tracking-wide">Paing Gyi</span>
            <span className="text-pink-500 font-bold text-[14px]">shop</span>
          </div>
        </Link>
        
        {/* ညာဘက် Track Order, 0 Ks နှင့် Profile */}
        <div className="flex items-center space-x-2 pr-1">
          <span className="text-[10px] text-gray-300 bg-white/10 px-3 py-1.5 rounded-full font-medium whitespace-nowrap">
            Track Order
          </span>
          <span className="text-[11px] text-white bg-pink-900/60 border border-pink-500/50 px-3 py-1.5 rounded-full font-bold whitespace-nowrap">
            0 Ks
          </span>
          {/* Profile Icon */}
          <Link href="/account" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 transition-colors hover:bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-200">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </nav>
    </div>
  );
}

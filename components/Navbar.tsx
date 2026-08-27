import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="pt-4 px-4 w-full flex justify-center z-50 relative">
      <nav className="w-full max-w-[360px] bg-[#1a1b2e] border border-white/10 rounded-full px-2 py-2 flex items-center justify-between shadow-lg">
        <Link href="/" className="flex items-center space-x-2 pl-1">
          <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-full object-cover border border-white/20" />
          <div className="flex items-baseline space-x-1">
            <span className="text-white font-bold text-[14px] tracking-wide">Paing Gyi</span>
            <span className="text-pink-500 font-bold text-[14px]">shop</span>
          </div>
        </Link>
        <div className="flex items-center space-x-2 pr-1">
          <span className="text-[9px] text-gray-300 bg-white/10 px-3 py-1.5 rounded-full font-medium">
            Track Order
          </span>
          <span className="text-[10px] text-white bg-pink-900/40 border border-pink-500/50 px-3 py-1.5 rounded-full font-bold">
            0 Ks
          </span>
        </div>
      </nav>
    </div>
  );
}

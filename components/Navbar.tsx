import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-black/40 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-white font-black text-lg tracking-wider bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          PAING GYI SHOP
        </span>
      </Link>
      <div className="flex items-center space-x-3">
        <span className="text-xs text-gray-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
          Online 🚀
        </span>
      </div>
    </nav>
  );
}

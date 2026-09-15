'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  // ဒီနေရာမှာ နောက်ပိုင်း Database ကနေ User ဝင်ထားတဲ့ Data ကို ချိတ်ရပါမယ်။
  const user = {
    isLoggedIn: true,
    name: 'Mg Mg', 
    avatarUrl: '' 
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] bg-[#1a2035]/95 backdrop-blur-xl rounded-full px-7 py-4 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 border border-white/5">
      
      {/* Active ဖြစ်နေတဲ့ Icon တွေကို Gradient အရောင်သွင်းပေးမည့် SVG Defs */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="active-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" /> {/* Pink 500 */}
            <stop offset="100%" stopColor="#a855f7" /> {/* Purple 500 */}
          </linearGradient>
        </defs>
      </svg>

      {/* 1. Home (Solid Icon) */}
      <Link href="/" className="relative group p-1 transition-transform duration-300 hover:scale-110">
        <svg 
          className={`w-7 h-7 transition-all duration-300 ${pathname === '/' ? 'drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]' : 'text-[#8a92a6] hover:text-gray-300'}`} 
          fill={pathname === '/' ? "url(#active-gradient)" : "currentColor"} 
          viewBox="0 0 24 24"
        >
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
        </svg>
      </Link>

      {/* 2. History (Stroked Icon) */}
      <Link href="/history" className="relative group p-1 transition-transform duration-300 hover:scale-110">
        <svg 
          className={`w-7 h-7 transition-all duration-300 ${pathname === '/history' ? 'drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]' : 'text-[#8a92a6] hover:text-gray-300'}`} 
          fill="none" 
          stroke={pathname === '/history' ? "url(#active-gradient)" : "currentColor"} 
          strokeWidth="2.2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </Link>

      {/* 3. Wallet (Solid Icon) */}
      <Link href="/wallet" className="relative group p-1 transition-transform duration-300 hover:scale-110">
        <svg 
          className={`w-7 h-7 transition-all duration-300 ${pathname === '/wallet' ? 'drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]' : 'text-[#8a92a6] hover:text-gray-300'}`} 
          fill={pathname === '/wallet' ? "url(#active-gradient)" : "currentColor"} 
          viewBox="0 0 24 24"
        >
          <path d="M21 7V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h-2v2H5V5h14v2h2zm-2 8.5v-3c0-.83-.67-1.5-1.5-1.5h-5.5c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5h5.5c.83 0 1.5-.67 1.5-1.5zm-5.5-.5h4v-1h-4v1z"/>
        </svg>
      </Link>

      {/* 4. Inbox (Stroked Icon) */}
      <Link href="/inbox" className="relative group p-1 transition-transform duration-300 hover:scale-110">
        <svg 
          className={`w-7 h-7 transition-all duration-300 ${pathname === '/inbox' ? 'drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]' : 'text-[#8a92a6] hover:text-gray-300'}`} 
          fill="none" 
          stroke={pathname === '/inbox' ? "url(#active-gradient)" : "currentColor"} 
          strokeWidth="2.2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </Link>

      {/* 5. Account (Avatar/Profile) */}
      <Link href="/account" className="relative group p-1 transition-transform duration-300 hover:scale-110">
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border-[2.5px] transition-all duration-300 ${
            pathname === '/account' 
              ? 'border-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.6)]' 
              : 'border-transparent opacity-60 hover:opacity-100'
          } ${!user.avatarUrl && 'bg-gradient-to-tr from-pink-600 to-pink-400'}`}
        >
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-[13px] font-bold">{user.name.charAt(0)}</span>
          )}
        </div>
      </Link>

    </div>
  );
}
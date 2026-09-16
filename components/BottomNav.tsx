'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const user = {
    isLoggedIn: true,
    name: 'Mg Mg', 
    avatarUrl: '' 
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-[#1a2035]/95 backdrop-blur-xl rounded-[2rem] px-2 py-2.5 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 border border-white/5">
      
      {/* Active ဖြစ်နေတဲ့ Icon တွေကို Gradient အရောင်သွင်းပေးမည့် SVG Defs */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="active-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      {/* 1. Home */}
      <Link href="/" className="relative flex flex-col items-center justify-center w-[60px] group transition-transform duration-300 hover:scale-105">
        <svg 
          className={`w-[22px] h-[22px] mb-1 transition-all duration-300 ${pathname === '/' ? 'drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' : 'text-[#8a92a6] group-hover:text-gray-300'}`} 
          fill={pathname === '/' ? "url(#active-gradient)" : "currentColor"} 
          viewBox="0 0 24 24"
        >
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
        </svg>
        <span className={`text-[9px] font-bold transition-colors duration-300 ${pathname === '/' ? 'text-pink-400' : 'text-[#8a92a6] group-hover:text-gray-300'}`}>Home</span>
      </Link>

      {/* 2. History */}
      <Link href="/history" className="relative flex flex-col items-center justify-center w-[60px] group transition-transform duration-300 hover:scale-105">
        <svg 
          className={`w-[22px] h-[22px] mb-1 transition-all duration-300 ${pathname === '/history' ? 'drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' : 'text-[#8a92a6] group-hover:text-gray-300'}`} 
          fill="none" 
          stroke={pathname === '/history' ? "url(#active-gradient)" : "currentColor"} 
          strokeWidth="2.2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className={`text-[9px] font-bold transition-colors duration-300 ${pathname === '/history' ? 'text-pink-400' : 'text-[#8a92a6] group-hover:text-gray-300'}`}>History</span>
      </Link>

      {/* 3. Wallet (မင်းပြထားတဲ့ ပုံအတိအကျ - ကတ်လေးတွေနဲ့) */}
      <Link href="/wallet" className="relative flex flex-col items-center justify-center w-[60px] group transition-transform duration-300 hover:scale-105">
        <svg 
          className={`w-[24px] h-[24px] mb-1 transition-all duration-300 ${pathname === '/wallet' ? 'drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' : 'text-[#8a92a6] group-hover:text-gray-300'}`} 
          viewBox="0 0 24 24"
        >
          <g fill={pathname === '/wallet' ? "url(#active-gradient)" : "currentColor"}>
            {/* နောက်က ကတ် */}
            <path opacity="0.5" d="M7 8l7.5-3.2a1.5 1.5 0 0 1 2 .6l1 2.1H7z" />
            {/* ရှေ့က ကတ် */}
            <path opacity="0.75" d="M5 9.5l8.5-2.4a1.5 1.5 0 0 1 1.9.9l.6 1.5H5z" />
            {/* ပိုက်ဆံအိတ် ကိုယ်ထည် (ခလုတ်လေးပါ) */}
            <path d="M3 11a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H3zm14 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </g>
        </svg>
        <span className={`text-[9px] font-bold transition-colors duration-300 ${pathname === '/wallet' ? 'text-pink-400' : 'text-[#8a92a6] group-hover:text-gray-300'}`}>Wallet</span>
      </Link>

      {/* 4. Inbox */}
      <Link href="/inbox" className="relative flex flex-col items-center justify-center w-[60px] group transition-transform duration-300 hover:scale-105">
        <svg 
          className={`w-[22px] h-[22px] mb-1 transition-all duration-300 ${pathname === '/inbox' ? 'drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' : 'text-[#8a92a6] group-hover:text-gray-300'}`} 
          fill="none" 
          stroke={pathname === '/inbox' ? "url(#active-gradient)" : "currentColor"} 
          strokeWidth="2.2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className={`text-[9px] font-bold transition-colors duration-300 ${pathname === '/inbox' ? 'text-pink-400' : 'text-[#8a92a6] group-hover:text-gray-300'}`}>Inbox</span>
      </Link>

      {/* 5. Account */}
      <Link href="/account" className="relative flex flex-col items-center justify-center w-[60px] group transition-transform duration-300 hover:scale-105">
        <div 
          className={`w-[22px] h-[22px] mb-1 rounded-full flex items-center justify-center overflow-hidden border-[2px] transition-all duration-300 ${
            pathname === '/account' 
              ? 'border-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]' 
              : 'border-transparent opacity-70 group-hover:opacity-100'
          } ${!user.avatarUrl && 'bg-gradient-to-tr from-pink-600 to-pink-400'}`}
        >
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-[10px] font-bold">{user.name.charAt(0)}</span>
          )}
        </div>
        <span className={`text-[9px] font-bold transition-colors duration-300 ${pathname === '/account' ? 'text-pink-400' : 'text-[#8a92a6] group-hover:text-gray-300'}`}>Account</span>
      </Link>

    </div>
  );
}
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // 🌟 Supabase ကို Import လုပ်ထားသည် 🌟

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🌟 Login ဝင်ထားခြင်း ရှိ/မရှိ စစ်ရန် 🌟

  useEffect(() => {
    setMounted(true);
    
    // 🌟 လက်ရှိ Session ကို စစ်ဆေးခြင်း 🌟
    const checkLoginStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkLoginStatus();

    // 🌟 Auth အပြောင်းအလဲကို စောင့်ကြည့်ခြင်း 🌟
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  if (!mounted) return null;

  // 🌟 Login ဝင်ထားရင် Account Settings ကို သွားမယ်၊ မဝင်ရသေးရင် Login ကို သွားမယ် 🌟
  const accountLink = isLoggedIn ? '/account/settings' : '/login';

  return (
    <div className="fixed bottom-4 left-0 right-0 z-[60] flex justify-center px-4">
      {/* Glass Design Container */}
      <div className="bg-[#023E8A]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(2,62,138,0.4)] rounded-full px-1.5 py-1.5 flex items-center justify-between w-full max-w-[400px]">
        
        {/* 1. Home */}
        <Link 
          href="/" 
          className={`relative flex flex-col items-center justify-center w-[20%] py-2 rounded-full transition-all duration-300 ${pathname === '/' ? 'bg-white/15 shadow-inner' : 'hover:bg-white/5'}`}
        >
          <svg className={`w-[22px] h-[22px] mb-1 transition-colors ${pathname === '/' ? 'text-white' : 'text-[#CAF0F8]/60'}`} fill={pathname === '/' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            {pathname === '/' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            )}
          </svg>
          <span className={`text-[9px] font-bold tracking-wide transition-colors ${pathname === '/' ? 'text-white' : 'text-[#CAF0F8]/60'}`}>Home</span>
        </Link>

        {/* 2. History */}
        <Link 
          href="/history" 
          className={`relative flex flex-col items-center justify-center w-[20%] py-2 rounded-full transition-all duration-300 ${pathname === '/history' ? 'bg-white/15 shadow-inner' : 'hover:bg-white/5'}`}
        >
          <svg className={`w-[22px] h-[22px] mb-1 transition-colors ${pathname === '/history' ? 'text-white' : 'text-[#CAF0F8]/60'}`} fill={pathname === '/history' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === '/history' ? 0 : 1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className={`text-[9px] font-bold tracking-wide transition-colors ${pathname === '/history' ? 'text-white' : 'text-[#CAF0F8]/60'}`}>History</span>
        </Link>

        {/* 3. Wallet (Animated Glowing Orb) */}
        <Link 
          href="/wallet" 
          className="relative flex flex-col items-center justify-center w-[20%] py-1 group"
        >
          <div className="absolute top-1 w-[46px] h-[46px] rounded-full overflow-hidden">
             <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-spin-slow opacity-80 mix-blend-overlay"></div>
             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-yellow-400 opacity-90 blur-[2px]"></div>
          </div>
          
          <div className={`relative z-10 w-[42px] h-[42px] rounded-full flex items-center justify-center mb-1 transition-all duration-300 bg-[#023E8A] border border-white/20 group-hover:scale-105 shadow-inner`}>
            <svg className="w-[20px] h-[20px] text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <span className={`text-[9px] font-black tracking-wide relative z-10 ${pathname === '/wallet' ? 'text-white drop-shadow-md' : 'text-[#CAF0F8]/80'}`}>Wallet</span>
        </Link>

        {/* 4. Inbox */}
        <Link 
          href="/inbox" 
          className={`relative flex flex-col items-center justify-center w-[20%] py-2 rounded-full transition-all duration-300 ${pathname === '/inbox' ? 'bg-white/15 shadow-inner' : 'hover:bg-white/5'}`}
        >
          <svg className={`w-[22px] h-[22px] mb-1 transition-colors ${pathname === '/inbox' ? 'text-white' : 'text-[#CAF0F8]/60'}`} fill={pathname === '/inbox' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
             {pathname === '/inbox' ? (
               <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
             ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
             )}
          </svg>
          <span className={`text-[9px] font-bold tracking-wide transition-colors ${pathname === '/inbox' ? 'text-white' : 'text-[#CAF0F8]/60'}`}>Inbox</span>
        </Link>

        {/* 5. Account / Settings (🌟 Link ကို ပြောင်းထားသည် 🌟) */}
        <Link 
          href={accountLink} 
          className={`relative flex flex-col items-center justify-center w-[20%] py-2 rounded-full transition-all duration-300 ${pathname.includes('/account') || pathname === '/login' ? 'bg-white/15 shadow-inner' : 'hover:bg-white/5'}`}
        >
          <svg className={`w-[22px] h-[22px] mb-1 transition-colors ${pathname.includes('/account') || pathname === '/login' ? 'text-white' : 'text-[#CAF0F8]/60'}`} fill={pathname.includes('/account') || pathname === '/login' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
             {pathname.includes('/account') || pathname === '/login' ? (
               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
             ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
             )}
          </svg>
          <span className={`text-[9px] font-bold tracking-wide transition-colors ${pathname.includes('/account') || pathname === '/login' ? 'text-white' : 'text-[#CAF0F8]/60'}`}>Account</span>
        </Link>

      </div>
    </div>
  );
}
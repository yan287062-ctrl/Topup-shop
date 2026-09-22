'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; 

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    setMounted(true);
    
    const checkLoginStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkLoginStatus();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  if (!mounted) return null;

  const accountLink = isLoggedIn ? '/account/settings' : '/login';

  return (
    <div className="fixed bottom-4 left-0 right-0 z-[60] flex justify-center px-4">
      {/* 🌟 Solid Dark Blue Background (ပုံအတိအကျ) 🌟 */}
      <div className="bg-[#1e4085] shadow-[0_10px_30px_rgba(0,0,0,0.3)] rounded-[2rem] px-2 py-2 flex items-center justify-between w-full max-w-[420px] h-[75px]">
        
        {/* 1. Home */}
        <Link 
          href="/" 
          className={`relative flex flex-col items-center justify-center w-[20%] h-full rounded-[1.5rem] transition-all duration-300 ${pathname === '/' ? 'bg-[#3b66a5]' : 'hover:bg-white/5'}`}
        >
          <svg className={`w-6 h-6 mb-1 transition-colors ${pathname === '/' ? 'text-white' : 'text-[#8daae5]'}`} fill={pathname === '/' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            {pathname === '/' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            )}
          </svg>
          <span className={`text-[10px] font-black tracking-wide transition-colors ${pathname === '/' ? 'text-white' : 'text-[#8daae5]'}`}>Home</span>
        </Link>

        {/* 2. History */}
        <Link 
          href="/history" 
          className={`relative flex flex-col items-center justify-center w-[20%] h-full rounded-[1.5rem] transition-all duration-300 ${pathname === '/history' ? 'bg-[#3b66a5]' : 'hover:bg-white/5'}`}
        >
          <svg className={`w-6 h-6 mb-1 transition-colors ${pathname === '/history' ? 'text-white' : 'text-[#8daae5]'}`} fill={pathname === '/history' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === '/history' ? 0 : 1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className={`text-[10px] font-black tracking-wide transition-colors ${pathname === '/history' ? 'text-white' : 'text-[#8daae5]'}`}>History</span>
        </Link>

        {/* 3. Wallet (🌟 Center Ring Design - ပုံအတိအကျ 🌟) */}
        <Link 
          href="/wallet" 
          className="relative flex flex-col items-center justify-center w-[20%] h-full -mt-5"
        >
          {/* Outer Gradient Ring with Animation */}
          <div className="relative w-[56px] h-[56px] rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-500 via-rose-400 to-yellow-400 p-[2.5px] shadow-lg animate-spin-slow">
             {/* Inner Solid Dark Blue Circle (Spin ၏ ဆန့်ကျင်ဘက် လည်စေရန် သို့မဟုတ် static ထားရန်) */}
             <div className="w-full h-full bg-[#152e65] rounded-full absolute inset-[2.5px] z-0 animate-spin-reverse-slow"></div>
          </div>
          
          {/* Static Icon (Center အတိအကျ) */}
          <div className="absolute top-[8px] w-[40px] h-[40px] flex items-center justify-center z-10 pointer-events-none">
             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
             </svg>
          </div>
          <span className={`text-[10px] font-black tracking-wide mt-[2px] ${pathname === '/wallet' ? 'text-white' : 'text-[#8daae5]'}`}>Wallet</span>
        </Link>

        {/* 4. Inbox */}
        <Link 
          href="/inbox" 
          className={`relative flex flex-col items-center justify-center w-[20%] h-full rounded-[1.5rem] transition-all duration-300 ${pathname === '/inbox' ? 'bg-[#3b66a5]' : 'hover:bg-white/5'}`}
        >
          <svg className={`w-6 h-6 mb-1 transition-colors ${pathname === '/inbox' ? 'text-white' : 'text-[#8daae5]'}`} fill={pathname === '/inbox' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
             {pathname === '/inbox' ? (
               <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
             ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
             )}
          </svg>
          <span className={`text-[10px] font-black tracking-wide transition-colors ${pathname === '/inbox' ? 'text-white' : 'text-[#8daae5]'}`}>Inbox</span>
        </Link>

        {/* 5. Account / Settings */}
        <Link 
          href={accountLink} 
          className={`relative flex flex-col items-center justify-center w-[20%] h-full rounded-[1.5rem] transition-all duration-300 ${pathname.includes('/account') || pathname === '/login' ? 'bg-[#3b66a5]' : 'hover:bg-white/5'}`}
        >
          <svg className={`w-6 h-6 mb-1 transition-colors ${pathname.includes('/account') || pathname === '/login' ? 'text-white' : 'text-[#8daae5]'}`} fill={pathname.includes('/account') || pathname === '/login' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
             {pathname.includes('/account') || pathname === '/login' ? (
               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
             ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
             )}
          </svg>
          <span className={`text-[10px] font-black tracking-wide transition-colors ${pathname.includes('/account') || pathname === '/login' ? 'text-white' : 'text-[#8daae5]'}`}>Account</span>
        </Link>

      </div>
    </div>
  );
}
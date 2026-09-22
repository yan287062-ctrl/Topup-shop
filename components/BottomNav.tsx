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

  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: (
        <svg className="w-[22px] h-[22px] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === '/' ? 2.5 : 1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: 'History',
      link: '/history',
      icon: (
        <svg className="w-[22px] h-[22px] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === '/history' ? 2.5 : 1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      name: 'Wallet',
      link: '/wallet',
      icon: (
        <svg className="w-[22px] h-[22px] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === '/wallet' ? 2.5 : 1.5} d="M17 8V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
          <rect x="3" y="8" width="18" height="12" rx="2" strokeWidth={pathname === '/wallet' ? 2.5 : 1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === '/wallet' ? 2.5 : 1.5} d="M17 12h4v4h-4a2 2 0 010-4z" />
          <circle cx="19" cy="14" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      name: 'Inbox',
      link: '/inbox',
      icon: (
        <svg className="w-[22px] h-[22px] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === '/inbox' ? 2.5 : 1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'Account',
      link: accountLink,
      activeCheck: pathname.includes('/account') || pathname === '/login',
      icon: (
        <svg className="w-[22px] h-[22px] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname.includes('/account') || pathname === '/login' ? 2.5 : 1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-[60] flex justify-center px-4">
      {/* 🌟 အမဲရောင်အစား မှန်သားအကြည် (Glassmorphism) သုံးထားသည် 🌟 */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full px-2 py-2 flex items-center justify-between w-full max-w-[400px]">
        {navItems.map((item, index) => {
          const isActive = item.activeCheck !== undefined ? item.activeCheck : pathname === item.link;
          return (
            <Link
              key={index}
              href={item.link}
              className={`relative flex flex-col items-center justify-center w-[20%] py-2 rounded-full transition-all duration-300 ${
                isActive ? 'bg-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-bold tracking-wide mt-0.5">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
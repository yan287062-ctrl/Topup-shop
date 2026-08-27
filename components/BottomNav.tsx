'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  // ဒီနေရာမှာ နောက်ပိုင်း Database ကနေ User ဝင်ထားတဲ့ Data ကို ချိတ်ရပါမယ်။
  // လောလောဆယ် ဒုတိယပုံထဲကလို ပုံမရှိရင် နာမည်အစ 'M' လေးနဲ့ ပန်းရောင်အဝိုင်းလေး ပေါ်အောင် လုပ်ပေးထားပါတယ်။
  const user = {
    isLoggedIn: true,
    name: 'Mg Mg', // ဥပမာ - Mg Mg
    avatarUrl: '' // ပုံရှိရင် လင့်ခ်ထည့်ရန် (ဥပမာ - '/profile.jpg')
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-[#2b214d]/95 backdrop-blur-md rounded-[2rem] px-2 py-2 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 border border-white/10">
      
      {/* 1. Home */}
      <Link href="/" className={`relative flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full transition-all duration-300 ${pathname === '/' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
        <svg className={`w-6 h-6 mb-1 ${pathname === '/' ? 'text-white' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
        </svg>
        <span className={`text-[10px] font-medium ${pathname === '/' ? 'text-white' : 'text-gray-400'}`}>Home</span>
      </Link>

      {/* 2. History */}
      <Link href="/history" className={`relative flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full transition-all duration-300 ${pathname === '/history' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
        <svg className={`w-6 h-6 mb-1 ${pathname === '/history' ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className={`text-[10px] font-medium ${pathname === '/history' ? 'text-white' : 'text-gray-400'}`}>History</span>
      </Link>

      {/* 3. Wallet (With Pink Glow Effect) */}
      <Link href="/wallet" className={`relative flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full transition-all duration-300 ${pathname === '/wallet' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
        {pathname === '/wallet' && (
          <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-md -z-10"></div>
        )}
        <svg className={`w-6 h-6 mb-1 ${pathname === '/wallet' ? 'text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 7V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h-2v2H5V5h14v2h2zm-2 8.5v-3c0-.83-.67-1.5-1.5-1.5h-5.5c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5h5.5c.83 0 1.5-.67 1.5-1.5zm-5.5-.5h4v-1h-4v1z"/>
        </svg>
        <span className={`text-[10px] font-medium ${pathname === '/wallet' ? 'text-pink-400' : 'text-gray-400'}`}>Wallet</span>
      </Link>

      {/* 4. Inbox */}
      <Link href="/inbox" className={`relative flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full transition-all duration-300 ${pathname === '/inbox' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
        <svg className={`w-6 h-6 mb-1 ${pathname === '/inbox' ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className={`text-[10px] font-medium ${pathname === '/inbox' ? 'text-white' : 'text-gray-400'}`}>Inbox</span>
      </Link>

      {/* 5. Account (Profile Picture or Initial) */}
      <Link href="/account" className={`relative flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full transition-all duration-300 ${pathname === '/account' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
        <div className="w-7 h-7 mb-1 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.5)] border border-white/20">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-[13px] font-bold">{user.name.charAt(0)}</span>
          )}
        </div>
        <span className={`text-[10px] font-medium ${pathname === '/account' ? 'text-white' : 'text-gray-400'}`}>Account</span>
      </Link>

    </div>
  );
}

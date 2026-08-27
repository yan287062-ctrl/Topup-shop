"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { 
      id: 'home', 
      label: 'Home',
      href: '/', 
      icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> 
    },
    { 
      id: 'wallet', 
      label: 'Wallet',
      href: '/wallet', 
      icon: (
        <>
          <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
          <path d="M4 6v12c0 1.1.9 2 2 2h14v-4H6a2 2 0 0 1-2-2V6z" />
          <path d="M20 12v4h-4a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2h4z" />
        </>
      ) 
    },
    { 
      id: 'checker', 
      label: 'Checker',
      href: '/checker', 
      icon: (
        <>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </>
      ) 
    },
    { 
      id: 'account', 
      label: 'Account',
      href: '/account', 
      icon: (
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </>
      ) 
    },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-50">
      <div className="bg-[#1f1d2b]/95 backdrop-blur-md px-3 py-2.5 rounded-full flex items-center justify-between w-full max-w-[360px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className="flex flex-col items-center justify-center space-y-1 w-16"
            >
              <div className={`p-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-white text-gray-900 shadow-lg scale-110' : 'text-gray-400 hover:bg-white/10'}`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  {item.icon}
                </svg>
              </div>
              <span className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

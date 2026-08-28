'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';

export default function AccountPage() {
  const user = {
    name: 'Mibb Game',
    email: 'gamer2040@gmail.com',
    avatar: '', 
  };

  const menuItems = [
    { name: 'ပထမ', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', link: '/' },
    { name: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', link: '/account', active: true },
    { name: 'ငွေပေးချေမှု မှတ်တမ်း', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', link: '/history' },
    { name: 'စာများ', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', link: '/inbox' },
    { name: 'လက်ကျန်ငွေဖြည့်', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', link: '/wallet' },
    { name: 'လက်ကျန်ငွေ မှတ်တမ်း', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', link: '/history' },
    { name: 'အဆင့်တိုးမြှင့်', icon: 'M5 10l7-7m0 0l7 7m-7-7v18', link: '#' },
    { name: 'ဆက်တင်များ', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', link: '/account/settings' },
  ];

  return (
    <main className="min-h-screen bg-[#070814] pb-28 font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 mt-6 flex flex-col md:flex-row gap-6">
        
        {/* Sidebar / Menu List */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-[#131422] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
            
            <div className="p-5 flex items-center gap-3 border-b border-white/5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white font-bold text-lg shadow-lg">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>MG</span>
                )}
              </div>
              <div className="overflow-hidden">
                <h2 className="text-white font-bold text-sm truncate">{user.name}</h2>
                <p className="text-gray-500 text-[10px] truncate">{user.email}</p>
              </div>
            </div>

            <div className="p-3 space-y-1">
              {menuItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.link}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium transition-all ${
                    item.active 
                    ? 'bg-pink-600/20 text-pink-500 border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.1)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                  </svg>
                  {item.name}
                </Link>
              ))}
            </div>

          </div>
        </div>

        {/* Dashboard Content Area */}
        <div className="flex-1 space-y-6">
          <h1 className="text-xl font-bold text-white mb-4">ပြန်လည်ကြိုဆိုပါသည် ။</h1>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#131422] p-5 rounded-3xl border border-white/5 shadow-lg">
              <p className="text-gray-500 text-[10px] font-bold mb-1">စုစုပေါင်းငွေပေးချေမှု</p>
              <p className="text-white text-2xl font-bold">0</p>
            </div>
            <div className="bg-[#131422] p-5 rounded-3xl border border-white/5 shadow-lg">
              <p className="text-gray-500 text-[10px] font-bold mb-1">စုစုပေါင်း သုံးစွဲမှု</p>
              <p className="text-white text-2xl font-bold">0</p>
            </div>
            <div className="bg-[#131422] p-5 rounded-3xl border border-white/5 shadow-lg">
              <p className="text-gray-500 text-[10px] font-bold mb-1">ပျမ်းမျှ / မှားယွင်းမှု</p>
              <p className="text-white text-2xl font-bold">0</p>
            </div>
            <div className="bg-[#131422] p-5 rounded-3xl border border-white/5 shadow-lg">
              <p className="text-gray-500 text-[10px] font-bold mb-1">ဘဏ္ဍာရေးအကောင့်သစ်</p>
              <p className="text-white text-2xl font-bold">-</p>
            </div>
          </div>

          <div className="bg-[#131422] p-5 rounded-3xl border border-white/5 shadow-lg mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-sm font-bold">နောက်ဆုံးလာသော ငွေပေးချေမှု</h3>
              <Link href="/history" className="text-pink-500 text-[10px] hover:underline">အားလုံးကြည့်ရန် →</Link>
            </div>
            
            <div className="p-8 text-center bg-[#0a0b14] rounded-2xl border border-white/5">
               <p className="text-gray-500 text-xs">ငွေပေးချေမှု မရှိပါ သို့မဟုတ် Filter ပြန်လည်သတ်မှတ်ပါ။ →</p>
            </div>
          </div>
          
        </div>

      </div>

      <BottomNav />
    </main>
  );
}

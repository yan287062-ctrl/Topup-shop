'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { supabase } from '../../lib/supabase';

export default function InboxPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 လောလောဆယ် Database မချိတ်ရသေးခင် အလွတ်ကြီးမဖြစ်အောင် အသင့်ပြထားမည့် စာများ (Dummy Data) 🌟
  const notifications = [
    {
      id: 1,
      type: 'system',
      title: 'Welcome to Paing Gyi Game Shop! 🎉',
      message: 'ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုကို အသုံးပြုပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ်။ ဂိမ်း Diamond နှင့် Package များကို ယုံကြည်စိတ်ချစွာ အမြန်ဆုံး ဝယ်ယူနိုင်ပါပြီ။',
      date: 'Just now',
      isRead: false,
    },
    {
      id: 2,
      type: 'promo',
      title: 'Special Promotion & Giveaways!',
      message: 'မကြာမီမှာ Paing Gyi Game Shop မှ အထူးပရိုမိုးရှင်းများနှင့် မဲဖောက်ပေးမည့် အစီအစဉ်များ ရှိတာမို့ စောင့်မျှော်ပေးကြပါဦးခင်ဗျာ။',
      date: '1 day ago',
      isRead: true,
    }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <main className="min-h-screen pb-28 relative bg-[#CAF0F8] font-sans">
      
      <div className="relative z-10">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 mt-6 md:mt-10">
          
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-[32px] font-black text-[#023E8A] tracking-tight">Inbox</h1>
              <p className="text-xs md:text-sm text-[#023E8A]/70 font-medium mt-1">Your notifications and messages</p>
            </div>
            <div className="bg-[#023E8A] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm">
              {notifications.filter(n => !n.isRead).length} New
            </div>
          </div>

          {/* Body Section */}
          {isLoading ? (
            <div className="text-center py-10 text-[#023E8A]/50 animate-pulse text-sm font-medium">
              Loading messages...
            </div>
          ) : !userEmail ? (
            // Login မလုပ်ရသေးလျှင် ပြမည့်ပုံစံ
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 text-center border border-white shadow-sm mt-10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#023E8A]/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-[#023E8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-[#023E8A] mb-2">Please Login First</h2>
              <p className="text-[#023E8A]/70 text-xs md:text-sm mb-6 max-w-sm mx-auto">You need to login to view your personal inbox and order notifications.</p>
              <Link href="/login" className="inline-block bg-[#023E8A] text-white px-8 py-3 md:py-3.5 rounded-xl text-sm font-bold shadow-lg hover:bg-[#03045E] transition-all">
                Go to Login
              </Link>
            </div>
          ) : (
            // Login လုပ်ပြီးပါက ပြမည့် Message List
            <div className="space-y-3 md:space-y-4">
              {notifications.map((notif) => (
                <div key={notif.id} className={`relative p-4 md:p-5 rounded-[1.25rem] md:rounded-3xl transition-all duration-300 shadow-sm border ${notif.isRead ? 'bg-white/80 border-white/60' : 'bg-white border-[#00B4D8]/30 shadow-[0_5px_15px_rgba(0,180,216,0.1)]'}`}>
                  
                  {/* Unread Red Dot */}
                  {!notif.isRead && (
                    <div className="absolute top-4 right-4 md:top-5 md:right-5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                  )}
                  
                  <div className="flex gap-3 md:gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner mt-0.5 ${notif.type === 'promo' ? 'bg-[#FBB02D]/20 text-[#FBB02D]' : 'bg-[#00B4D8]/20 text-[#00B4D8]'}`}>
                      {notif.type === 'promo' ? (
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
                      ) : (
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="pr-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 mb-1">
                        <h3 className={`text-sm md:text-base font-bold ${notif.isRead ? 'text-[#023E8A]/80' : 'text-[#023E8A]'}`}>{notif.title}</h3>
                        <span className="text-[9px] md:text-[10px] text-[#023E8A]/50 font-medium">{notif.date}</span>
                      </div>
                      <p className="text-xs md:text-sm text-[#023E8A]/70 leading-relaxed mt-1 md:mt-1.5">{notif.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="relative z-50">
        <BottomNav />
      </div>
      
    </main>
  );
}
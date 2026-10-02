'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';

// 🌟 TypeScript က အနီရောင်မျဉ်းမပြအောင် Marquee ကို ကြိုတင်ကြေညာထားခြင်းဖြစ်ပါသည် 🌟
const Marquee = 'marquee' as any;

export default function Navbar() {
  const [user, setUser] = useState<any>(null); 
  const [balance, setBalance] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        if (session.user.email) fetchBalance(session.user.email); 
      }
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        if (session.user.email) fetchBalance(session.user.email);
      } else {
        setUser(null);
        setBalance(0);
      }
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  const fetchBalance = async (userEmail: string) => {
    if (!userEmail) return; 
    try {
      const { data } = await supabase.from('users_wallet').select('balance').eq('email', userEmail).single();
      if (data) setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowModal(false);
    window.location.reload(); 
  };

  const getUserInitials = (name?: string, email?: string) => {
    if (name) return name.substring(0, 2).toUpperCase();
    if (email) return email.substring(0, 2).toUpperCase();
    return 'PG';
  };

  return (
    <>
      <nav className="sticky top-4 mx-auto w-[95%] max-w-6xl z-50 mb-4">
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg rounded-full px-3 py-2 md:px-6 md:py-3 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 relative">
             <div className="w-9 h-9 md:w-12 md:h-12 relative rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100 flex items-center justify-center flex-shrink-0">
                <img 
                  src="/painggyi-logo-clear.png" 
                  alt="PG"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-pink-600 font-black text-xs md:text-sm">PG</span>';
                  }}
                />
             </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center bg-white/50 backdrop-blur-sm rounded-full p-1 border border-white/60 gap-1 relative">
            
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                pathname === '/' 
                ? 'bg-white shadow-md text-gray-800' 
                : 'text-gray-600 hover:bg-white/60 hover:text-gray-800'
              }`}
            >
              Home
            </Link>
            
            <Link 
              href="/all-games" 
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                pathname === '/all-games' 
                ? 'bg-white shadow-md text-gray-800' 
                : 'text-gray-600 hover:bg-white/60 hover:text-gray-800'
              }`}
            >
              All Games
            </Link>
            
            <Link 
              href="/check-region" 
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 whitespace-nowrap ${
                pathname === '/check-region' 
                ? 'bg-white shadow-md text-[#023E8A]' 
                : 'text-gray-600 hover:bg-white/60 hover:text-gray-800'
              }`}
            >
               Region Check
            </Link>

          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link 
              href="/history" 
              className={`border px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-bold transition-colors shadow-sm whitespace-nowrap ${
                pathname === '/history'
                ? 'bg-white border-white text-[#023E8A]'
                : 'bg-white/60 border-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              Track Order
            </Link>
            
            <button 
              onClick={() => setShowModal(true)}
              className="bg-pink-50 border border-pink-200 text-pink-600 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] md:text-sm font-bold hover:bg-pink-100 transition-colors shadow-sm whitespace-nowrap"
            >
              {user ? `${balance.toLocaleString()} Ks` : '0 Ks'}
            </button>
            
            {user ? (
              <button onClick={() => setShowModal(true)} className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-[10px] md:text-sm border-2 border-white shadow-md flex-shrink-0">
                {getUserInitials(user.user_metadata?.full_name, user.email)}
              </button>
            ) : (
              <Link href="/login" className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-full text-[9px] sm:text-[10px] md:text-sm font-black transition-all shadow-md border border-pink-300 whitespace-nowrap">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* 🌟 ဤအပိုင်းသည် Home Page တွင်သာ ပေါ်စေရန် pathname ကို စစ်ထားပါသည် 🌟 */}
      {pathname === '/' && (
        <div className="mx-auto w-[95%] max-w-4xl z-40 mb-8 relative">
          
          {/* ==================== 1. Announcement Bar ==================== */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center mb-4">
            
            {/* Admin Status */}
            <div className="flex items-center gap-2 bg-[#4A5C82]/10 border border-[#4A5C82]/20 px-4 py-2 rounded-full whitespace-nowrap shadow-sm">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.6)]"></div>
              <span className="text-[#4A5C82] text-xs font-extrabold tracking-wide">Admin online</span>
            </div>

            {/* Marquee Text */}
            <div className="flex-1 bg-[#E4D5B7]/50 border border-[#4A5C82]/20 rounded-full overflow-hidden flex items-center px-4 py-2 w-full shadow-sm">
              <span className="text-[#D99B48] mr-3 text-sm">📢</span>
              
              {/* 🌟 အနီရောင်မပြတော့သော Marquee ကို အသုံးပြုထားပါသည် 🌟 */}
              <Marquee scrollamount="4" className="text-xs text-[#4A5C82] font-bold mt-0.5 tracking-wide">
                ငွေကြိုဖြည့်စရာမလိုဘဲ ငွေစာရင်းလွှဲပြေစာပြ၍ တိုက်ရိုက်ဝယ်ယူနိုင်ပါသည်။ &nbsp; • &nbsp; Wallet ထဲ ငွေဖြည့်ထားပါက 24 နာရီလုံး အချိန်မရွေး Auto Topup စနစ်ဖြင့် စက္ကန့်ပိုင်းအတွင်း ရရှိပါမည်။
              </Marquee>
            </div>
          </div>

          {/* ==================== 2. Category Filter Bar ==================== */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide bg-[#4A5C82]/5 p-2 rounded-2xl border border-[#4A5C82]/10">
             
             {/* Active Item */}
             <button className="flex items-center gap-2 bg-[#D99B48] text-[#E4D5B7] px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shadow-[3px_3px_0px_rgba(74,92,130,0.2)] transition hover:-translate-y-0.5">
                <span>⭐</span> Favorit
             </button>
             
             {/* Inactive Items */}
             <button className="flex items-center gap-2 text-[#4A5C82] hover:bg-[#4A5C82]/10 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition">
                <span>🔥</span> Popular Games
             </button>
             
             <button className="flex items-center gap-2 text-[#4A5C82] hover:bg-[#4A5C82]/10 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition">
                <span>🎮</span> Topup Games
             </button>
             
             <button className="flex items-center gap-2 text-[#4A5C82] hover:bg-[#4A5C82]/10 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition">
                <span>🎫</span> Gift Card & Voucher
             </button>
             
             <button className="flex items-center gap-2 text-[#4A5C82] hover:bg-[#4A5C82]/10 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition">
                <span>💎</span> App items
             </button>

             {/* See More Link */}
             <button className="ml-auto flex items-center gap-1.5 text-[#4A5C82] text-xs font-extrabold whitespace-nowrap px-3 hover:text-[#D99B48] transition uppercase">
                See More <span>→</span>
             </button>
          </div>
        </div>
      )}

      {/* Profile / Wallet Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 w-full max-w-sm shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-lg">✕</button>
            
            <h3 className="text-lg font-black text-gray-800 mb-4">My Account</h3>
            
            {user ? (
              <div>
                <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {getUserInitials(user.user_metadata?.full_name, user.email)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-gray-800 text-sm font-bold truncate">{user.user_metadata?.full_name || 'Member'}</p>
                    <p className="text-gray-500 text-[10px] truncate">{user.email}</p>
                  </div>
                </div>

                <div>
                  <div className="bg-pink-50 border border-pink-100 p-4 rounded-2xl mb-5 text-center">
                     <p className="text-pink-600/80 text-[10px] uppercase tracking-wider mb-1 font-bold">Current Balance</p>
                     <p className="text-pink-600 text-3xl font-black mb-1">{balance.toLocaleString()} Ks</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/wallet" onClick={() => setShowModal(false)} className="flex-1 bg-pink-500 text-white flex items-center justify-center py-3 rounded-xl text-xs font-bold hover:bg-pink-600 shadow-md transition-colors">
                      Top Up Wallet
                    </Link>
                    <button onClick={handleLogout} className="px-4 bg-gray-100 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-xs mb-6 font-medium">Please log in to check your wallet balance and manage your account.</p>
                <Link href="/login" onClick={() => setShowModal(false)} className="block w-full bg-pink-500 text-white py-3 rounded-xl text-xs font-bold hover:bg-pink-600 shadow-md">
                  Go to Login Page
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
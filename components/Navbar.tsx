'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';

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
      <nav className="sticky top-4 mx-auto w-[95%] max-w-6xl z-50 mb-8">
        
        <div className="relative border border-white/20 shadow-xl rounded-full px-3 py-2 md:px-6 md:py-3 flex items-center justify-between overflow-hidden">
          
          <div className="absolute inset-0 bg-[url('/nav-bg.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

          <Link href="/" className="flex items-center gap-2 relative z-10">
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

          <div className="hidden md:flex items-center bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/30 gap-1 relative z-10">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                pathname === '/' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-white hover:bg-white/30 hover:text-white'
              }`}
            >
              Home
            </Link>
            
            <Link 
              href="/all-games" 
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                pathname === '/all-games' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-white hover:bg-white/30 hover:text-white'
              }`}
            >
              All Games
            </Link>
            
            <Link 
              href="/check-region" 
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 whitespace-nowrap ${
                pathname === '/check-region' 
                ? 'bg-white shadow-sm text-[#023E8A]' 
                : 'text-white hover:bg-white/30 hover:text-white'
              }`}
            >
               Region Check
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 relative z-10">
            <Link 
              href="/history" 
              className={`border px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-bold transition-colors shadow-sm whitespace-nowrap ${
                pathname === '/history'
                ? 'bg-white border-transparent text-[#023E8A]'
                : 'bg-white/20 border-white/40 text-white backdrop-blur-sm hover:bg-white/40'
              }`}
            >
              Track Order
            </Link>
            
            <button 
              onClick={() => setShowModal(true)}
              className="bg-pink-500/90 border border-pink-400 text-white px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] md:text-sm font-bold hover:bg-pink-600 transition-colors shadow-sm whitespace-nowrap backdrop-blur-sm"
            >
              {user ? `${balance.toLocaleString()} Ks` : '0 Ks'}
            </button>
            
            {user ? (
              <button onClick={() => setShowModal(true)} className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-[10px] md:text-sm border-2 border-white shadow-md flex-shrink-0">
                {getUserInitials(user.user_metadata?.full_name, user.email)}
              </button>
            ) : (
              <Link href="/login" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-full text-[9px] sm:text-[10px] md:text-sm font-black transition-all shadow-md border border-pink-400 whitespace-nowrap">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {pathname === '/' && (
        <div className="mx-auto w-[95%] max-w-5xl z-40 mb-2 mt-4 relative">
          
          <div className="w-full mb-6 md:mb-8 rounded-3xl overflow-hidden shadow-lg border-2 border-white/50 relative group">
             <img 
               src="https://via.placeholder.com/1200x400/2D3A54/D99B48?text=Your+Banner+Here" 
               alt="Main Banner" 
               className="w-full h-[150px] sm:h-[200px] md:h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-[#4A5C82] hover:bg-white shadow-md transition hidden md:flex font-bold">❮</button>
             <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-[#4A5C82] hover:bg-white shadow-md transition hidden md:flex font-bold">❯</button>
             
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center mb-4">
            <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full whitespace-nowrap shadow-sm">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.6)]"></div>
              <span className="text-gray-700 text-xs font-extrabold tracking-wide">Admin online</span>
            </div>

            <div className="flex-1 bg-white border border-gray-200 rounded-full overflow-hidden flex items-center px-4 py-2 w-full shadow-sm">
              <span className="text-pink-500 mr-3 text-sm">📢</span>
              <div 
                className="flex-1 overflow-hidden flex items-center"
                dangerouslySetInnerHTML={{
                  __html: '<marquee scrollamount="4" class="text-xs text-gray-700 font-bold mt-0.5 tracking-wide">ငွေကြိုဖြည့်စရာမလိုဘဲ ငွေစာရင်းလွှဲပြေစာပြ၍ တိုက်ရိုက်ဝယ်ယူနိုင်ပါသည်။ &nbsp; • &nbsp; Wallet ထဲ ငွေဖြည့်ထားပါက 24 နာရီလုံး အချိန်မရွေး Auto Topup စနစ်ဖြင့် စက္ကန့်ပိုင်းအတွင်း ရရှိပါမည်။</marquee>'
                }}
              />
            </div>
          </div>
        </div>
      )}

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
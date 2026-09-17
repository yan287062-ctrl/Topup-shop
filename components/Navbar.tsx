'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState<any>(null); 
  const [balance, setBalance] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

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
      {/* 🌟 fixed အစား sticky ပြောင်းပြီး mb-8 ဖြင့် အောက်ကစာများကို တွန်းချထားပါသည် 🌟 */}
      <nav className="sticky top-4 mx-auto w-[95%] max-w-6xl z-50 mb-8">
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg rounded-full px-4 py-2 md:px-6 md:py-3 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 relative">
             <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100 flex items-center justify-center">
                <img 
                  src="/painggyi-logo.jpg" 
                  alt="PG"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-pink-600 font-black text-sm">PG</span>';
                  }}
                />
             </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center bg-white/50 backdrop-blur-sm rounded-full p-1 border border-white/60">
            <Link href="/" className="px-5 py-2 rounded-full text-sm font-bold text-gray-800 hover:bg-white shadow-sm transition-all">Home</Link>
            <Link href="/" className="px-5 py-2 rounded-full text-sm font-bold text-gray-600 hover:bg-white transition-all">All Games</Link>
            <Link href="/history" className="px-5 py-2 rounded-full text-sm font-bold text-gray-600 hover:bg-white transition-all">Track Order</Link>
          </div>

          {/* Right Side Actions (Wallet & Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/history" className="bg-white/60 border border-white/80 text-gray-700 px-3.5 py-2 rounded-full text-[10px] font-bold hover:bg-white transition-colors hidden sm:block shadow-sm">
              Track Order
            </Link>
            
            <button 
              onClick={() => setShowModal(true)}
              className="bg-pink-50 border border-pink-200 text-pink-600 px-3.5 py-2 rounded-full text-[10px] md:text-sm font-bold hover:bg-pink-100 transition-colors shadow-sm"
            >
              {user ? `${balance.toLocaleString()} Ks` : '0 Ks'}
            </button>
            
            {user ? (
              <button onClick={() => setShowModal(true)} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-xs md:text-sm border-2 border-white shadow-md">
                {getUserInitials(user.user_metadata?.full_name, user.email)}
              </button>
            ) : (
              <Link href="/login" className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-sm font-black transition-all shadow-md border border-pink-300">
                Sign In
              </Link>
            )}
          </div>

        </div>
      </nav>

      {/* Profile / Wallet Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 w-full max-w-sm shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-lg">✕</button>
            
            <h3 className="text-lg font-black text-gray-800 mb-4">My Account</h3>
            
            {user ? (
              <div>
                <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">
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
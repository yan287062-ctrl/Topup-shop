'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState<any>(null); // Supabase User Data
  const [balance, setBalance] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        fetchBalance(session.user.email); // ဖုန်းနံပါတ်အစား Email ဖြင့် တိုက်ရိုက်ရှာမည်
      }
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchBalance(session.user.email);
      } else {
        setUser(null);
        setBalance(0);
      }
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  // Email ဖြင့် Balance ရှာမည့် Function
  const fetchBalance = async (userEmail: string) => {
    try {
      // Database ထဲက users_wallet table တွင် email ဖြင့် တိုက်ရိုက်တိုက်စစ်မည်
      const { data, error } = await supabase
        .from('users_wallet')
        .select('balance')
        .eq('email', userEmail)
        .single();
        
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

  const getUserInitials = (name: string, email: string) => {
    if (name) return name.substring(0, 2).toUpperCase();
    if (email) return email.substring(0, 2).toUpperCase();
    return 'PG';
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 py-4 md:px-8 bg-[#070814]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <img src="/logo.png" alt="Paing Gyi Shop" className="w-full h-full object-cover" 
              onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=PG&background=ec4899&color=fff'; }}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-black text-sm tracking-widest uppercase">
              Paing Gyi <span className="text-pink-500">shop</span>
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/history" className="bg-[#131422] border border-white/10 text-gray-300 px-3.5 py-2 rounded-full text-[10px] font-bold hover:bg-white/5 transition-colors hidden sm:block">
            Track Order
          </Link>
          
          <button 
            onClick={() => setShowModal(true)}
            className="bg-pink-600/20 border border-pink-500/30 text-pink-400 px-3.5 py-2 rounded-full text-[10px] font-bold hover:bg-pink-600/30 transition-colors shadow-[0_0_10px_rgba(236,72,153,0.2)]"
          >
            {user ? `${balance.toLocaleString()} Ks` : '0 Ks'}
          </button>
          
          {user ? (
            <button onClick={() => setShowModal(true)} className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-xs border-2 border-pink-500/50 shadow-[0_0_10px_rgba(236,72,153,0.4)]">
              {getUserInitials(user.user_metadata?.full_name, user.email)}
            </button>
          ) : (
            <Link href="/login" className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-full text-[10px] font-bold transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)]">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Profile / Wallet Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="bg-[#131422] p-6 rounded-3xl border border-white/10 w-full max-w-sm shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg">✕</button>
            
            <h3 className="text-lg font-bold text-white mb-4">My Account</h3>
            
            {user ? (
              <div>
                <div className="flex items-center gap-3 mb-6 bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    {getUserInitials(user.user_metadata?.full_name, user.email)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-white text-sm font-bold truncate">{user.user_metadata?.full_name || 'Member'}</p>
                    <p className="text-gray-400 text-[10px] truncate">{user.email}</p>
                  </div>
                </div>

                <div>
                  <div className="bg-[#0a0b14] border border-white/5 p-4 rounded-2xl mb-5 text-center shadow-inner">
                     <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Current Balance</p>
                     <p className="text-pink-500 text-3xl font-black mb-1">{balance.toLocaleString()} Ks</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/wallet" onClick={() => setShowModal(false)} className="flex-1 bg-pink-600 text-white flex items-center justify-center py-3 rounded-xl text-xs font-bold hover:bg-pink-500 shadow-lg transition-colors">
                      Top Up Wallet
                    </Link>
                    <button onClick={handleLogout} className="px-4 bg-red-500/10 text-red-400 text-xs font-bold rounded-xl hover:bg-red-500/20 border border-red-500/20 transition-colors">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400 text-xs mb-6">Please log in to check your wallet balance and manage your account.</p>
                <Link href="/login" onClick={() => setShowModal(false)} className="block w-full bg-pink-600 text-white py-3 rounded-xl text-xs font-bold hover:bg-pink-500 shadow-lg">
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

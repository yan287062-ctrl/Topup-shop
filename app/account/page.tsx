'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';

export default function AccountPage() {
  // နမူနာ User Data (နောက်ပိုင်း Database/Auth နှင့် ချိတ်ရန်)
  const user = {
    name: 'Mg Mg',
    email: 'mgmg@gmail.com',
    phone: '+95 9 123 456 789',
    balance: 50000,
    avatar: '', 
    role: 'VIP Member'
  };

  return (
    <main className="min-h-screen bg-[#070814] pb-28 font-sans">
      <Navbar />

      <div className="max-w-md mx-auto px-4 mt-6 space-y-6">
        
        {/* Profile Info Card */}
        <div className="bg-[#131422] rounded-3xl p-6 border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)] border-2 border-[#131422]">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-2xl font-bold">{user.name.charAt(0)}</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#131422]"></div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white tracking-wide">{user.name}</h2>
              <p className="text-gray-400 text-xs mt-0.5">{user.email}</p>
              <div className="inline-block mt-2 px-2.5 py-1 bg-pink-500/20 border border-pink-500/30 rounded-lg text-pink-400 text-[9px] font-bold uppercase tracking-wider">
                {user.role}
              </div>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-800 rounded-3xl p-6 shadow-[0_10px_30px_rgba(236,72,153,0.3)] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
          <p className="text-pink-200 text-xs font-medium uppercase tracking-wider mb-1">Total Balance</p>
          <div className="flex justify-between items-end">
            <h3 className="text-3xl font-extrabold tracking-tight">K {user.balance.toLocaleString()}</h3>
            <Link href="/wallet" className="bg-white text-pink-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-pink-50 transition-colors shadow-lg">
              Top Up
            </Link>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-[#131422] rounded-3xl border border-white/5 shadow-xl overflow-hidden divide-y divide-white/5">
          
          {/* Edit Profile */}
          <Link href="#" className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0a0b14] flex items-center justify-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <span className="text-gray-300 text-sm font-medium">Edit Profile</span>
            </div>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </Link>

          {/* Transaction History */}
          <Link href="/history" className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0a0b14] flex items-center justify-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <span className="text-gray-300 text-sm font-medium">Transaction History</span>
            </div>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </Link>

          {/* Help & Support */}
          <Link href="#" className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0a0b14] flex items-center justify-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <span className="text-gray-300 text-sm font-medium">Help & Support</span>
            </div>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </Link>

          {/* Logout */}
          <button className="w-full flex items-center justify-between p-4 hover:bg-red-500/10 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500/20 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </div>
              <span className="text-red-500 text-sm font-bold">Logout</span>
            </div>
          </button>

        </div>

      </div>

      <BottomNav />
    </main>
  );
}

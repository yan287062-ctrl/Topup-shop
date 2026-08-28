'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'topups' | 'prices'>('orders');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'painggyi123') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#070814] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-[#131422] rounded-3xl border border-white/5 p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Paing Gyi Admin</h1>
            <p className="text-gray-400 text-xs">Please login with admin credentials.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-pink-500 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-pink-500 focus:outline-none transition-colors" />
            </div>
            {loginError && <p className="text-red-500 text-xs text-center font-medium">Invalid Username or Password!</p>}
            <button type="submit" className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all mt-2">
              Login
            </button>
            <div className="text-center mt-4">
              <Link href="/" className="text-gray-500 text-xs hover:text-white transition-colors">← Back to Store</Link>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070814] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header & Tabs */}
        <div className="bg-[#131422] p-4 rounded-3xl border border-white/5 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-white font-bold text-sm">Paing Gyi <span className="text-pink-500">Admin</span></h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'orders' ? 'bg-pink-600 text-white' : 'bg-[#0a0b14] text-gray-400 hover:text-white'}`}>
              စောင့်ဆိုင်းစာရင်း
            </button>
            <button onClick={() => setActiveTab('topups')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'topups' ? 'bg-pink-600 text-white' : 'bg-[#0a0b14] text-gray-400 hover:text-white'}`}>
              ငွေဖြည့်တောင်းဆိုမှုများ
            </button>
            <button onClick={() => setActiveTab('prices')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'prices' ? 'bg-pink-600 text-white' : 'bg-[#0a0b14] text-gray-400 hover:text-white'}`}>
              ဈေးနှုန်းပြင်ဆင်ရန်
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="bg-red-600/20 text-red-400 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600/30 transition-all ml-2">
              Logout
            </button>
          </div>
        </div>

        {/* Empty Content Areas for Tabs */}
        <div className="bg-[#131422] rounded-3xl border border-white/5 p-8 shadow-2xl min-h-[500px] flex items-center justify-center">

          {activeTab === 'orders' && (
            <div className="text-center">
              <div className="text-4xl mb-4">📦</div>
              <h2 className="text-white text-lg font-bold mb-2">စောင့်ဆိုင်းစာရင်း</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">ဒီနေရာမှာ User တွေ ဝယ်ယူထားတဲ့ ဂိမ်း Package (ဥပမာ- Diamonds, UC) စာရင်းတွေ ပေါ်လာပါမယ်။</p>
            </div>
          )}

          {activeTab === 'topups' && (
            <div className="text-center">
              <div className="text-4xl mb-4">💳</div>
              <h2 className="text-white text-lg font-bold mb-2">ငွေဖြည့်တောင်းဆိုမှုများ</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">ဒီနေရာမှာ Wallet ထဲ ငွေဖြညဖို့ တောင်းဆိုထားတဲ့ Screenshot တွေနဲ့ အချက်အလက်တွေ ပေါ်လာပါမယ်။</p>
            </div>
          )}

          {activeTab === 'prices' && (
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h2 className="text-white text-lg font-bold mb-2">ဈေးနှုန်းပြင်ဆင်ရန်</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">ဒီနေရာမှာ ဂိမ်း Item တွေရဲ့ ဈေးနှုန်းတွေကို Admin က ဝင်ရောက်ပြင်ဆင်လို့ ရပါမယ်။</p>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}

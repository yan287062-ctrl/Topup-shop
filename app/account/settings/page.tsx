'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import BottomNav from '../../../components/BottomNav';

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [username, setUsername] = useState('Mibb');
  const [fullName, setFullName] = useState('Mibb Game');
  const [email, setEmail] = useState('gamer2040@gmail.com');
  const [whatsapp, setWhatsapp] = useState('');
  const [saved, setSaved] = useState(false);

  const user = {
    name: 'Mibb Game',
    email: 'gamer2040@gmail.com',
  };

  const menuItems = [
    { name: 'ပထမ', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', link: '/' },
    { name: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', link: '/account' },
    { name: 'ငွေပေးချေမှု မှတ်တမ်း', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', link: '/history' },
    { name: 'စာများ', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', link: '/inbox' },
    { name: 'လက်ကျန်ငွေဖြည့်', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', link: '/wallet' },
    { name: 'လက်ကျန်ငွေ မှတ်တမ်း', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', link: '/history' },
    { name: 'အဆင့်တိုးမြှင့်', icon: 'M5 10l7-7m0 0l7 7m-7-7v18', link: '#' },
    { name: 'ဆက်တင်များ', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', link: '/account/settings', active: true },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="min-h-screen bg-[#070814] pb-28 font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 mt-6 flex flex-col md:flex-row gap-6">
        
        {/* Sidebar / Menu List */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-[#131422] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
            <div className="p-5 flex items-center gap-3 border-b border-white/5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white font-bold text-lg shadow-lg">
                <span>MG</span>
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

        {/* Settings Main Content Area */}
        <div className="flex-1 space-y-6">
          
          <div>
            <h1 className="text-xl font-bold text-white mb-1">Account Settings</h1>
            <p className="text-gray-400 text-xs">Manage personal info & account security.</p>
          </div>

          {/* Profile / Security Tabs */}
          <div className="flex gap-2 bg-[#131422] p-1.5 rounded-2xl border border-white/5 w-fit">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'profile' ? 'bg-pink-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              Profile
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'security' ? 'bg-pink-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              Security
            </button>
          </div>

          {/* Settings Card */}
          <div className="bg-[#131422] rounded-3xl border border-white/5 p-6 shadow-2xl space-y-6">
            
            {activeTab === 'profile' ? (
              <form onSubmit={handleSave} className="space-y-6">
                
                <div>
                  <h3 className="text-white text-sm font-bold mb-1">Profile Information</h3>
                  <p className="text-gray-500 text-[11px]">Update your personal data.</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-600 to-pink-400 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    MG
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Username</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500" 
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Username cannot be changed.</p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 pr-20" 
                      />
                      <span className="absolute right-3 top-3 bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded-md border border-green-500/30">
                        ✓ Verified
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Whatsapp Number</label>
                    <input 
                      type="text" 
                      placeholder="Add via form below"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500" 
                    />
                    <p className="text-[10px] text-gray-500 mt-1">OTP will be sent via WhatsApp.</p>
                  </div>

                </div>

                <div>
                  <button 
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                  >
                    {saved ? 'Saved Successfully ✓' : 'Save Changes'}
                  </button>
                </div>

              </form>
            ) : (
              <div className="space-y-4">
                <h3 className="text-white text-sm font-bold">Security Settings</h3>
                <p className="text-gray-400 text-xs">Update your password and security credentials.</p>
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500" />
                  </div>
                  <button className="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)] mt-2">
                    Update Password
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Telegram Connect Card */}
          <div className="bg-[#131422] rounded-3xl border border-white/5 p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-bold text-sm mb-1">Telegram</h4>
              <p className="text-gray-400 text-xs">Connect your Telegram to check balance, orders & status from our bot.</p>
            </div>
            <button className="bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-lg whitespace-nowrap">
              Connect Telegram
            </button>
          </div>

        </div>

      </div>

      <BottomNav />
    </main>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase'; // သင့်ရဲ့ Supabase ချိတ်ဆက်သည့်လမ်းကြောင်း

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // ဖောင်ဒေတာများ
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Email & Password ဖြင့် ဝင်မည့်/စာရင်းသွင်းမည့် လုပ်ဆောင်ချက်
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        // Sign In (Login ဝင်ခြင်း)
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) throw error;
        
        // အောင်မြင်ပါက ပင်မစာမျက်နှာသို့ ပြန်သွားမည်
        window.location.href = '/'; 

      } else {
        // Sign Up (အကောင့်အသစ်ဖွင့်ခြင်း)
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        if (error) throw error;
        
        // အောင်မြင်ပါက Alert ပြပြီး Login သို့ ပြောင်းပေးမည်
        alert('Account created successfully! Please sign in.');
        setIsLogin(true);
        setPassword(''); // Password အကွက်ကို ရှင်းလင်းပေးမည်
      }
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070814] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Glow Effects (မူလ Design အတိုင်း) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Login Card (မူလ Design အတိုင်း) */}
      <div className="w-full max-w-[400px] bg-[#131422]/80 backdrop-blur-2xl rounded-[2rem] border border-white/5 p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.5)] relative z-10">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-transform hover:scale-105">
              <img src="/logo.png" alt="Paing Gyi Shop" className="w-full h-full object-cover bg-black" 
                onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=PG&background=ec4899&color=fff'; }}
              />
            </div>
          </Link>
        </div>

        {/* Headings */}
        <div className="mb-6">
          <p className="text-pink-500 text-[10px] font-bold tracking-widest uppercase mb-2">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </p>
          <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
            {isLogin ? 'Continue to ' : 'Create Account for '}
            <span className="text-pink-400 font-serif italic">Paing Gyi Game Shop</span>
          </h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            Faster top ups, saved history, member discounts active immediately.
          </p>
        </div>

        {/* Error Message ပြရန်နေရာ */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Form Fields (ဖုန်းနံပါတ်အစား Email ဖြင့် ပြောင်းထားသည်) */}
        <form onSubmit={handleAuth} className="space-y-4">
          
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                required={!isLogin}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name" 
                className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors" 
              />
            </div>
          )}

          {/* Email Input (ယခင် ဖုန်းနံပါတ်နေရာ) */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com" 
              className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors" 
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors" 
            />
          </div>

          {/* Main Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-pink-500 hover:bg-pink-400 text-white font-bold text-sm py-3.5 rounded-xl shadow-[0_4px_15px_rgba(236,72,153,0.4)] transition-all mt-4 disabled:opacity-70"
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        {/* Toggle & Terms */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 mb-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" // form ထဲမှာ မဟုတ်တော့ဘဲ button type သတ်မှတ်ထားသည်
              onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }} 
              className="text-pink-500 font-bold hover:underline transition-all"
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>
          
          <p className="text-[10px] text-gray-500 leading-relaxed max-w-[280px] mx-auto">
            By {isLogin ? 'signing in' : 'creating an account'}, you agree to our{' '}
            <Link href="#" className="text-pink-500 hover:underline">Terms & Conditions</Link> and{' '}
            <Link href="#" className="text-pink-500 hover:underline">Privacy Policy</Link>.
          </p>
        </div>

      </div>
    </main>
  );
}

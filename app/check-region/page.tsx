'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import Link from 'next/link';

export default function CheckRegionPage() {
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [idCheckResult, setIdCheckResult] = useState<{ status: 'idle' | 'success' | 'error', name: string, region: string, flag: string }>({ status: 'idle', name: '', region: '', flag: '' });
  
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIdCheckResult({ status: 'idle', name: '', region: '', flag: '' });

    if (userId.trim() && zoneId.trim()) {
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
      setIsCheckingId(true);

      checkTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await fetch(`https://api.isan.eu.org/nickname/ml?id=${userId}&zone=${zoneId}`);
          if (!response.ok) throw new Error('API Error');
          
          const data = await response.json();
          
          if (!data.name || data.name === "User not found" || data.error) {
            setIdCheckResult({ status: 'error', name: '', region: '', flag: '' });
          } else {
            const flagMap: Record<string, string> = { "MM": "🇲🇲", "ID": "🇮🇩", "PH": "🇵🇭", "MY": "🇲🇾", "SG": "🇸🇬", "TH": "🇹🇭", "VN": "🇻🇳", "GLOBAL": "🌐" };
            const regionCode = data.region?.toUpperCase() || "GLOBAL";
            const emoji = flagMap[regionCode] || "🌐";
            
            setIdCheckResult({ 
              status: 'success', 
              name: data.name, 
              region: regionCode,
              flag: emoji
            });
          }
        } catch (error) {
          setIdCheckResult({ status: 'error', name: '', region: '', flag: '' });
        } finally {
          setIsCheckingId(false);
        }
      }, 1000); 
    } else {
      setIsCheckingId(false);
    }

    return () => {
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    };
  }, [userId, zoneId]);

  return (
    <main className="min-h-screen pb-28 relative bg-[#CAF0F8] font-sans">
      <div className="relative z-10">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 mt-8 md:mt-12 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00B4D8]/20 text-[#023E8A] text-xs font-bold mb-4 border border-[#00B4D8]/30">
            <span className="mr-1">🎯</span> Official API Check
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-[#023E8A] mb-3">MLBB <span className="text-[#00B4D8]">Region Checker</span></h1>
          <p className="text-[#023E8A]/70 text-xs md:text-sm mb-8 max-w-lg mx-auto">
            Check your Mobile Legends account's region & nickname using just the User ID and Server (Zone) ID. Data comes straight from the official server.
          </p>

          <div className="bg-[#023E8A] rounded-[2rem] p-6 md:p-8 shadow-2xl border border-[#00B4D8]/20 mb-6 text-left">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-full sm:w-1/2">
                <label className="text-[10px] font-bold text-[#CAF0F8] mb-2 block uppercase tracking-wider">User ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. 123456789" 
                  className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" 
                  value={userId} 
                  onChange={(e) => setUserId(e.target.value)} 
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="text-[10px] font-bold text-[#CAF0F8] mb-2 block uppercase tracking-wider">Server (Zone) ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. 1234" 
                  className="w-full bg-[#CAF0F8]/10 border border-[#00B4D8]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00B4D8] transition-colors" 
                  value={zoneId} 
                  onChange={(e) => setZoneId(e.target.value)} 
                />
              </div>
            </div>

            {/* 🌟 Auto Checking Indicator 🌟 */}
            {isCheckingId && (
              <div className="w-full p-4 rounded-xl border border-[#00B4D8]/30 bg-[#00B4D8]/10 flex flex-col items-center justify-center gap-2 text-[#00B4D8] text-xs font-bold h-24">
                 <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 Checking Account Info...
              </div>
            )}

            {/* 🌟 Result Box 🌟 */}
            {!isCheckingId && idCheckResult.status !== 'idle' && (
              <div className={`w-full p-5 rounded-xl border ${idCheckResult.status === 'success' ? 'bg-[#10b981]/10 border-[#10b981]/30' : 'bg-red-500/10 border-red-500/30'}`}>
                {idCheckResult.status === 'success' ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl drop-shadow-lg">{idCheckResult.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-lg">{idCheckResult.name}</span>
                        <span className="text-[#10b981] text-xs font-black uppercase tracking-wider">{idCheckResult.region}</span>
                      </div>
                    </div>
                    <span className="bg-[#10b981] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> VALID
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">❌</span>
                      <span className="text-red-400 font-bold text-base">Account not found</span>
                    </div>
                    <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                      INVALID
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                   <div className="flex flex-col">
                     <span className="text-white/50 text-[10px] uppercase font-bold tracking-wider">User ID</span>
                     <span className="text-white text-sm font-medium">{userId || '-'}</span>
                   </div>
                   <div className="flex flex-col text-right">
                     <span className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Server (Zone) ID</span>
                     <span className="text-white text-sm font-medium">{zoneId || '-'}</span>
                   </div>
                </div>
              </div>
            )}
            
            {/* Empty State when no ID is entered */}
            {!isCheckingId && idCheckResult.status === 'idle' && (
               <div className="w-full p-4 rounded-xl border border-dashed border-[#CAF0F8]/20 bg-[#CAF0F8]/5 flex flex-col items-center justify-center gap-2 text-[#CAF0F8]/50 text-xs h-24">
                 Enter your ID above to auto-check.
               </div>
            )}
          </div>

          {/* Info Cards below the checker */}
          <div className="space-y-3 text-left">
            <div className="bg-white p-4 rounded-[1.25rem] shadow-sm border border-[#00B4D8]/10 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#CAF0F8] flex items-center justify-center text-[#023E8A] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 className="text-[#023E8A] font-bold text-sm mb-1">How to find your User ID & Server</h3>
                <p className="text-[#023E8A]/60 text-xs">Open MLBB &gt; tap your profile in the top-left. Your account ID is shown under your name in the format <b>123456789 (1234)</b>.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-[1.25rem] shadow-sm border border-[#00B4D8]/10 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#CAF0F8] flex items-center justify-center text-[#023E8A] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <div>
                <h3 className="text-[#023E8A] font-bold text-sm mb-1">Safe & no login</h3>
                <p className="text-[#023E8A]/60 text-xs">We only read public data (nickname & region). No password needed, nothing is stored.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-[1.25rem] shadow-sm border border-[#00B4D8]/10 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#CAF0F8] flex items-center justify-center text-[#023E8A] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div className="flex-1">
                <h3 className="text-[#023E8A] font-bold text-sm mb-1">Want to top up too?</h3>
                <p className="text-[#023E8A]/60 text-xs mb-2">Found your account? Top up MLBB diamonds delivered in seconds.</p>
                <Link href="/topup/mlbb" className="inline-block px-4 py-2 bg-[#FBB02D] text-[#023E8A] text-xs font-bold rounded-lg hover:bg-[#e8a329] transition-colors">
                  Top up MLBB
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <div className="relative z-50">
        <BottomNav />
      </div>
    </main>
  );
}
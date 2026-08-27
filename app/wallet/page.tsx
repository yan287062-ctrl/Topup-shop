'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function WalletPage() {
  const [amount, setAmount] = useState<number>(50000);
  const [selectedMethod, setSelectedMethod] = useState('Wave Pay');
  const [step, setStep] = useState<'form' | 'detail'>('form');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const presetAmounts = [50000, 100000, 200000, 500000, 1000000];
  
  const paymentMethods = [
    { id: 'kpay', name: 'KBZ Pay', acc: '09777882089', holder: 'Khoon Sint Nay Chi', img: '/kpay.png' },
    { id: 'wave', name: 'Wave Pay', acc: '09777882089', holder: 'Khoon Sint Nay Chi', img: '/wave.png' },
    { id: 'ayapay', name: 'AYA Pay', acc: '09777882089', holder: 'Khoon Sint Nay Chi', img: '/ayapay.png' },
    { id: 'uabpay', name: 'UAB Pay', acc: '09777882089', holder: 'Khoon Sint Nay Chi', img: '/uabpay.png' }
  ];

  const currentMethodObj = paymentMethods.find(m => m.name === selectedMethod) || paymentMethods[1];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0].name);
    }
  };

  return (
    <main className="min-h-screen bg-[#070814] pb-28 font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 mt-4">
        
        {step === 'form' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#131422] p-6 rounded-3xl border border-white/5 shadow-2xl">
                <h1 className="text-xl font-bold text-white mb-1">Top Up Balance</h1>
                <p className="text-gray-400 text-xs mb-6">Top up your account balance using available payment methods.</p>

                {/* Amount Section */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-gray-300 block mb-2">Top Up Amount</label>
                  <p className="text-[10px] text-pink-500 mb-2">Minimum K3,000.</p>
                  
                  <div className="relative mb-3">
                    <span className="absolute left-4 top-3.5 text-pink-500 font-bold">K</span>
                    <input 
                      type="number" 
                      min="3000"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-[#0a0b14] border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                          amount === amt 
                          ? 'bg-pink-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.4)]' 
                          : 'bg-[#0a0b14] border border-white/10 text-gray-300 hover:border-pink-500/50'
                        }`}
                      >
                        {amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-2">Payment Method</label>
                  <p className="text-[10px] text-gray-400 mb-3">Choose one method below.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {paymentMethods.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMethod(m.name)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          selectedMethod === m.name 
                          ? 'bg-pink-950/30 border-pink-500' 
                          : 'bg-[#0a0b14] border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white flex items-center justify-center p-1 overflow-hidden shadow-sm">
                          <img src={m.img} alt={m.name} className="w-full h-full object-contain" 
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `<span class="text-gray-800 font-bold text-xs">${m.name[0]}</span>`;
                            }}
                          />
                        </div>
                        <span className="text-xs text-white font-medium block">{m.name}</span>
                        <span className="text-[9px] text-gray-400">Free</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#131422] p-5 rounded-3xl border border-white/5 shadow-2xl">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-3">Summary</h3>
                
                <div className="space-y-3 mb-6 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Balance to add</span>
                    <span className="text-white font-bold">K {amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Admin fee</span>
                    <span className="text-white">K 0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method</span>
                    <span className="text-pink-400 font-medium">{selectedMethod}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-white/10 pt-4 mb-6">
                  <span className="text-white font-bold text-sm">Total to pay</span>
                  <span className="text-pink-500 font-extrabold text-lg">K {amount.toLocaleString()}</span>
                </div>

                <button 
                  onClick={() => setStep('detail')}
                  disabled={amount < 3000}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                    amount >= 3000 
                    ? 'bg-pink-600 text-white hover:bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Confirm Top Up
                </button>
              </div>

              {/* RECENT TOP UPS - Removed Demo Data */}
              <div className="bg-[#131422] p-5 rounded-3xl border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Recent Top Ups</h4>
                  <Link href="/history" className="text-pink-500 text-xs cursor-pointer hover:underline">All →</Link>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-[#0a0b14] p-6 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center">
                    <p className="text-gray-500 text-[10px]">No recent top ups yet.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="bg-[#131422] p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="bg-pink-600/20 border border-pink-500/30 text-pink-400 text-center py-2.5 rounded-2xl text-xs font-bold mb-6">
                Complete within 00 : 14 : 59
              </div>

              <div className="mb-6 bg-[#0a0b14] p-4 rounded-2xl border border-white/5">
                <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-3">Payment Information</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method</span>
                    <span className="text-white font-medium">{selectedMethod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Send to Account</span>
                    <span className="text-pink-400 font-mono font-bold">{currentMethodObj.acc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account holder</span>
                    <span className="text-white font-medium">{currentMethodObj.holder}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3 mt-3">
                    <span className="text-white font-bold">Total to pay</span>
                    <span className="text-pink-500 font-extrabold text-base">K {amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 bg-[#0a0b14] p-4 rounded-2xl border border-white/5">
                <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Payment Proof</h4>
                <p className="text-gray-500 text-[10px] mb-4">Once transferred, upload your payment screenshot below for admin verification.</p>
                
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="w-full sm:w-auto bg-[#1a1b2e] border border-white/10 hover:border-pink-500 text-white text-xs font-medium px-4 py-2.5 rounded-xl cursor-pointer text-center">
                    Choose File
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <span className="text-gray-400 text-xs truncate max-w-xs">
                    {screenshot ? screenshot : 'No file chosen'}
                  </span>
                </div>

                <button 
                  onClick={() => setIsUploaded(true)}
                  className={`w-full mt-4 py-3 rounded-xl font-bold text-xs transition-all ${
                    isUploaded 
                    ? 'bg-green-600 text-white' 
                    : 'bg-pink-600 hover:bg-pink-500 text-white shadow-[0_0_10px_rgba(236,72,153,0.4)]'
                  }`}
                >
                  {isUploaded ? 'Proof Uploaded Successfully ✓' : 'Upload Proof'}
                </button>
              </div>

              <div className="mb-6 bg-[#0a0b14] p-4 rounded-2xl border border-white/5">
                <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-3">Order Summary</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Invoice</span>
                    <span className="text-white font-mono">DP260825460371AE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Item</span>
                    <span className="text-white">Top Up Balance</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Balance Amount</span>
                    <span className="text-white">K {amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 bg-[#0a0b14] p-4 rounded-2xl border border-white/5">
                <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-3">Payment Summary</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method</span>
                    <span className="text-white">{selectedMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-yellow-500 font-bold">Waiting</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3 mt-3">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-pink-500 font-extrabold text-base">K {amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setStep('form')}
                  className="flex-1 bg-[#1a1b2e] hover:bg-[#25273c] text-white py-3 rounded-xl text-xs font-bold border border-white/10 text-center"
                >
                  Top Up Again
                </button>
                <Link 
                  href="/"
                  className="flex-1 bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-xl text-xs font-bold text-center shadow-lg"
                >
                  Back to Home
                </Link>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}

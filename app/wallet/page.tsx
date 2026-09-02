'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabase';

export default function WalletPage() {
  const [userEmail, setUserEmail] = useState<string>(''); // ဖုန်းနံပါတ်အစား Email ကိုသုံးမည်
  const [amount, setAmount] = useState<number>(50000);
  const [selectedMethod, setSelectedMethod] = useState('Wave Pay');
  const [step, setStep] = useState<'form' | 'detail'>('form');
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [invoiceCopied, setInvoiceCopied] = useState(false);

  const [invoiceCode, setInvoiceCode] = useState('');

  useEffect(() => {
    generateInvoiceCode();
    // လက်ရှိ Login ဝင်ထားသော User ၏ Email ကို အလိုအလျောက် ယူမည်
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    };
    fetchUser();
  }, []);

  const generateInvoiceCode = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();
    setInvoiceCode(`DP${year}${month}${day}${randomHex}`);
  };

  const presetAmounts = [50000, 100000, 200000, 500000, 1000000];
  
  const paymentMethods = [
    { id: 'kpay', name: 'KBZ Pay', acc: '09755008854', holder: 'U Ye Paing Oo', img: '/kpay.png' },
    { id: 'wave', name: 'Wave Pay', acc: '09967241375', holder: 'U Ye Paing Oo', img: '/wave.png' },
    { id: 'ayapay', name: 'AYA Pay', acc: '09967241375', holder: 'U Ye Paing Oo', img: '/ayapay.png' },
    { id: 'uabpay', name: 'UAB Pay', acc: '09967241375', holder: 'U Ye Paing Oo', img: '/uabpay.png' }
  ];

  const currentMethodObj = paymentMethods.find(m => m.name === selectedMethod) || paymentMethods[1];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSlipFile(e.target.files[0]);
    }
  };

  const handleCopy = (text: string, type: 'acc' | 'invoice') => {
    navigator.clipboard.writeText(text);
    if (type === 'acc') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setInvoiceCopied(true);
      setTimeout(() => setInvoiceCopied(false), 2000);
    }
  };

  const submitTopup = async () => {
    if (!slipFile) {
      alert("ကျေးဇူးပြု၍ ငွေလွှဲပြေစာ (Screenshot) တင်ပေးပါ။");
      return;
    }
    
    setIsUploading(true);
    
    try {
      const fileExt = slipFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('receipts').upload(fileName, slipFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('receipts').getPublicUrl(fileName);

      // Database ထဲသို့ phone အစား email ကို သိမ်းဆည်းမည်
      const { error: insertError } = await supabase.from('wallet_history').insert([{
        email: userEmail, // <--- ဖုန်းနံပါတ်အစား Email ကို ထည့်သွင်းလိုက်ပါပြီ
        amount: amount,
        type: selectedMethod,
        status: 'pending',
        slip_url: publicUrl,
        invoice_code: invoiceCode
      }]);

      if (insertError) throw insertError;
      
      setIsUploaded(true);
      alert("ငွေဖြည့်တောင်းဆိုမှု အောင်မြင်ပါသည်။ ဤဘောက်ချာကုဒ် (" + invoiceCode + ") ဖြင့် သင့်မှတ်တမ်းကို ပြန်ရှာနိုင်ပါသည်။");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsUploading(false);
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

                {/* Email & Invoice Code Section (Phone ကို ဖယ်ရှားလိုက်ပါပြီ) */}
                <div className="mb-6 bg-[#0a0b14] p-4 rounded-2xl border border-white/5">
                  <label className="text-xs font-bold text-gray-300 block mb-2">Your Account Email</label>
                  <p className="text-[10px] text-gray-400 mb-3">ဤအကောင့်ထဲသို့ ငွေဖြည့်သွင်းမည်ဖြစ်ပါသည်။</p>
                  
                  {/* အလိုအလျောက် ယူထားသော Email ကို ပြသမည့် အကွက် */}
                  <div className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold mb-4 opacity-80 cursor-not-allowed">
                    {userEmail || 'Loading email...'}
                  </div>

                  {/* Invoice Code ပြသမည့် အကွက် */}
                  <label className="text-xs font-bold text-gray-300 block mb-2">Invoice Code (ဘောက်ချာကုဒ်)</label>
                  <p className="text-[10px] text-pink-500 mb-2">ငွေဖြည့်မှတ်တမ်း ပြန်လည်ရှာဖွေရာတွင် အသုံးပြုရန်။</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-3 text-pink-400 font-mono text-sm tracking-wider shadow-inner">
                      {invoiceCode}
                    </div>
                    <button 
                      onClick={() => handleCopy(invoiceCode, 'invoice')}
                      className={`px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        invoiceCopied ? 'bg-green-600 text-white' : 'bg-pink-600 hover:bg-pink-500 text-white'
                      }`}
                    >
                      {invoiceCopied ? 'Copied ✓' : 'Copy Code'}
                    </button>
                  </div>
                </div>

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
                    <span className="text-gray-400">Account Email</span>
                    {/* ဖုန်းနံပါတ်အစား Email ကို ပြသမည့်နေရာ */}
                    <span className="text-white font-bold">{userEmail || 'Not logged in'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Invoice Code</span>
                    <span className="text-pink-400 font-mono font-medium">{invoiceCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Balance to add</span>
                    <span className="text-white font-bold">K {amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method</span>
                    <span className="text-white font-medium">{selectedMethod}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-white/10 pt-4 mb-6">
                  <span className="text-white font-bold text-sm">Total to pay</span>
                  <span className="text-pink-500 font-extrabold text-lg">K {amount.toLocaleString()}</span>
                </div>

                <button 
                  onClick={() => setStep('detail')}
                  disabled={amount < 3000 || !userEmail}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                    (amount >= 3000 && userEmail)
                    ? 'bg-pink-600 text-white hover:bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {!userEmail ? 'Please Login First' : 'Confirm Top Up'}
                </button>
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
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-gray-400">Invoice Code</span>
                    <span className="text-pink-400 font-mono font-bold tracking-wider">{invoiceCode}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400">Method</span>
                    <span className="text-white font-medium">{selectedMethod}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400">Send to Account</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono font-bold">{currentMethodObj.acc}</span>
                      
                      <button 
                        onClick={() => handleCopy(currentMethodObj.acc, 'acc')}
                        className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                        title="Copy Account Number"
                      >
                        {copied ? (
                          <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
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
                    {slipFile ? slipFile.name : 'No file chosen'}
                  </span>
                </div>

                <button 
                  onClick={submitTopup}
                  disabled={isUploaded || isUploading || !slipFile}
                  className={`w-full mt-4 py-3 rounded-xl font-bold text-xs transition-all ${
                    isUploaded 
                    ? 'bg-green-600 text-white cursor-not-allowed' 
                    : (!slipFile || isUploading)
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-pink-600 hover:bg-pink-500 text-white shadow-[0_0_10px_rgba(236,72,153,0.4)]'
                  }`}
                >
                  {isUploading ? 'Uploading...' : (isUploaded ? 'Proof Uploaded Successfully ✓' : 'Upload Proof & Request')}
                </button>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => { 
                    setStep('form'); 
                    setIsUploaded(false); 
                    setSlipFile(null); 
                    generateInvoiceCode(); 
                  }}
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

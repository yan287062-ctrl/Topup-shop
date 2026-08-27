'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import { useParams } from 'next/navigation';

export default function TopupPage() {
  const params = useParams();
  const id = params?.id as string;

  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  // MLBB Packages
  const mlbbPackages = [
    { id: 'mlbb_1', name: '55 Diamonds', price: 3461 }, { id: 'mlbb_2', name: '165 Diamonds', price: 10372 },
    { id: 'mlbb_3', name: '275 Diamonds', price: 16636 }, { id: 'mlbb_4', name: '565 Diamonds', price: 34160 },
    { id: 'mlbb_5', name: 'Weekly Pass', price: 6600 }, { id: 'mlbb_6', name: 'Weekly Pass x 2', price: 13200 },
    { id: 'mlbb_7', name: 'Weekly Pass x 3', price: 19800 }, { id: 'mlbb_8', name: 'Weekly Pass x 4', price: 26400 },
    { id: 'mlbb_9', name: 'Weekly Pass x 5', price: 33000 }, { id: 'mlbb_10', name: 'Twilight Pass', price: 35712 },
    { id: 'mlbb_11', name: 'Weekly Elite Bundle', price: 3461 }, { id: 'mlbb_12', name: 'Monthly Epic Bundle', price: 17434 },
    { id: 'mlbb_13', name: '86 Diamonds', price: 5457 }, { id: 'mlbb_14', name: '172 Diamonds', price: 10824 },
    { id: 'mlbb_15', name: '257 Diamonds', price: 15678 }, { id: 'mlbb_16', name: '343 Diamonds', price: 21134 },
    { id: 'mlbb_17', name: '429 Diamonds', price: 26502 }, { id: 'mlbb_18', name: '514 Diamonds', price: 31355 },
    { id: 'mlbb_19', name: '600 Diamonds', price: 36812 }, { id: 'mlbb_20', name: '705 Diamonds', price: 42588 },
    { id: 'mlbb_21', name: '792 Diamonds', price: 48045 }, { id: 'mlbb_22', name: '878 Diamonds', price: 53412 },
    { id: 'mlbb_23', name: '963 Diamonds', price: 58266 }, { id: 'mlbb_24', name: '1049 Diamonds', price: 63722 },
    { id: 'mlbb_25', name: '1135 Diamonds', price: 69090 }, { id: 'mlbb_26', name: '1220 Diamonds', price: 73943 },
    { id: 'mlbb_27', name: '1412 Diamonds', price: 85176 }, { id: 'mlbb_28', name: '1584 Diamonds', price: 96000 },
    { id: 'mlbb_29', name: '1669 Diamonds', price: 100854 }, { id: 'mlbb_30', name: '1755 Diamonds', price: 106310 },
    { id: 'mlbb_31', name: '1841 Diamonds', price: 111678 }, { id: 'mlbb_32', name: '2195 Diamonds', price: 128918 },
    { id: 'mlbb_33', name: '2538 Diamonds', price: 150052 }, { id: 'mlbb_34', name: '2901 Diamonds', price: 171506 },
    { id: 'mlbb_35', name: '3073 Diamonds', price: 182330 }, { id: 'mlbb_36', name: '3688 Diamonds', price: 215069 },
    { id: 'mlbb_37', name: '3945 Diamonds', price: 230747 }, { id: 'mlbb_38', name: '4031 Diamonds', price: 236204 },
    { id: 'mlbb_39', name: '4566 Diamonds', price: 268482 }, { id: 'mlbb_40', name: '5100 Diamonds', price: 300245 },
    { id: 'mlbb_41', name: '5532 Diamonds', price: 324734 }, { id: 'mlbb_42', name: '6055 Diamonds', price: 354812 },
    { id: 'mlbb_43', name: '6752 Diamonds', price: 398677 }, { id: 'mlbb_44', name: '7030 Diamonds', price: 415366 },
    { id: 'mlbb_45', name: '7727 Diamonds', price: 453651 }, { id: 'mlbb_46', name: '9288 Diamonds', price: 539360 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }));

  // Magic Chess Packages
  const mcggPackages = [
    { id: 'mcgg_1', name: '10', bonus: '+ 1 Diamonds', price: 900 },
    { id: 'mcgg_2', name: '20', bonus: '+ 2 Diamonds', price: 1700 },
    { id: 'mcgg_3', name: '51', bonus: '+ 5 Diamonds', price: 4200 },
    { id: 'mcgg_4', name: 'Double Dia(50+50)or 55', bonus: 'No bonus', price: 4400 },
    { id: 'mcgg_5', name: '102', bonus: '+ 10 Diamonds', price: 8300 },
    { id: 'mcgg_6', name: 'Weekly Card', bonus: 'No bonus', price: 8800 },
    { id: 'mcgg_7', name: 'Double Dia(150+150)or 165', bonus: 'No bonus', price: 13000 },
    { id: 'mcgg_8', name: '203', bonus: '+ 20 Diamonds', price: 16600 },
    { id: 'mcgg_9', name: 'Double Dia(250+250) or 275', bonus: 'No bonus', price: 21500 },
    { id: 'mcgg_10', name: '303', bonus: '+ 33 Diamonds', price: 24900 },
    { id: 'mcgg_11', name: '504', bonus: '+ 66 Diamonds', price: 41400 },
    { id: 'mcgg_12', name: 'Double Dia(500+500)or 565', bonus: 'No bonus', price: 43400 },
    { id: 'mcgg_13', name: '1007', bonus: '+ 156 Diamonds', price: 82900 },
    { id: 'mcgg_14', name: '2015', bonus: '+ 383 Diamonds', price: 165700 },
    { id: 'mcgg_15', name: '5035', bonus: '+ 1007 Diamonds', price: 414100 }
  ];

  const gameConfigs: Record<string, any> = {
    'mobile-legends': {
      name: 'Mobile Legends',
      sub: 'All Server',
      img: '/mlbb.png',
      packages: mlbbPackages
    },
    'magic-chess': {
      name: 'Magic Chess Go Go',
      sub: 'All Server',
      img: '/MCGG.png',
      packages: mcggPackages
    }
  };

  const game = gameConfigs[id];

  const paymentMethods = [
    { id: 'kpay', name: 'KBZ Pay', color: 'bg-blue-600' },
    { id: 'wave', name: 'Wave Pay', color: 'bg-yellow-500' },
    { id: 'ayapay', name: 'AYA Pay', color: 'bg-red-600' },
    { id: 'cbpay', name: 'CB Pay', color: 'bg-orange-500' }
  ];

  if (!game) {
    return (
      <main className="min-h-screen bg-[#070814] flex flex-col items-center justify-center p-4">
        <h1 className="text-white text-2xl font-bold mb-2">Game Not Found</h1>
        <p className="text-gray-400 text-xs mb-6">Requested ID: {id}</p>
        <Link href="/" className="bg-pink-600 text-white px-6 py-2.5 rounded-full font-medium text-sm">Go Back Home</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070814] pb-20">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 mt-2 font-sans">
        <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#1a1b2e] to-[#0f1020] p-6 mb-8 flex flex-col md:flex-row gap-5 items-center border border-white/5 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl -z-10"></div>
          
          <img src={game.img} alt={game.name} className="w-24 h-24 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.3)] object-cover z-10" />
          <div className="z-10 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">{game.name}</h1>
            <p className="text-gray-400 text-sm mt-1">{game.sub}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <span className="bg-white/5 border border-white/10 text-pink-400 px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-1">
                Instant Process
              </span>
              <span className="bg-white/5 border border-white/10 text-pink-400 px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-1">
                100% Safe
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl italic font-light text-pink-500/80">01</span>
                <div className="mb-1">
                  <h2 className="text-lg font-bold text-white">Choose Nominal Amount</h2>
                  <p className="text-gray-400 text-[11px]">Pick the {game.name} amount you want to top up</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {game.packages.map((pkg: any) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg)}
                    className={`relative p-3.5 rounded-2xl text-left transition-all duration-200 overflow-hidden ${
                      selectedPkg?.id === pkg.id 
                      ? 'bg-pink-950/30 border-2 border-pink-500' 
                      : 'bg-[#131422] border-2 border-transparent hover:border-white/10'
                    }`}
                  >
                    {selectedPkg?.id === pkg.id && (
                      <div className="absolute top-0 right-0 bg-pink-500 rounded-bl-xl p-1.5 shadow-md">
                        <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    )}
                    <div className="text-white font-bold text-sm mb-1">{pkg.name}</div>
                    <div className="text-gray-500 text-[10px] mb-3">{pkg.bonus}</div>
                    <div className="text-pink-500 font-extrabold text-sm">{pkg.price.toLocaleString()} Ks</div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl italic font-light text-pink-500/80">02</span>
                <div className="mb-1">
                  <h2 className="text-lg font-bold text-white">Game Account Data</h2>
                  <p className="text-gray-400 text-[11px]">Make sure User ID and Server ID are correct</p>
                </div>
              </div>
              <div className="bg-[#131422] p-5 rounded-3xl border border-white/5">
                <div className="flex flex-col sm:flex-row gap-4 mb-3">
                  <div className="w-full sm:w-1/2">
                    <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">ID <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter ID" 
                      className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">Server No. <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter Server No." 
                      className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl italic font-light text-pink-500/80">03</span>
                <div className="mb-1">
                  <h2 className="text-lg font-bold text-white">Choose Payment Method</h2>
                  <p className="text-gray-400 text-[11px]">Various payment methods available</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`relative p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                      paymentMethod === pm.id 
                      ? 'bg-pink-950/30 border-2 border-pink-500' 
                      : 'bg-[#131422] border-2 border-transparent hover:border-white/10'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${pm.color} flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                      {pm.name.split(' ')[0]}
                    </div>
                    <span className="text-gray-300 text-[10px] font-medium">{pm.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#131422] rounded-3xl border border-white/5 p-5 shadow-2xl">
              <h3 className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-3">Order Summary</h3>
              
              <div className="flex items-center gap-3 mb-5">
                <img src={game.img} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="text-white font-bold text-sm">{game.name}</h4>
                  <p className="text-pink-500 text-[10px]">
                    {selectedPkg ? selectedPkg.name : 'No amount selected'}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Target Account</p>
                  <p className="text-white text-xs font-medium italic">
                    {(userId && zoneId) ? `${userId} (${zoneId})` : 'Not filled'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Payment Method</p>
                  <p className="text-white text-xs font-medium italic">
                    {paymentMethod ? paymentMethods.find(p => p.id === paymentMethod)?.name : 'Not selected'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">{selectedPkg ? selectedPkg.price.toLocaleString() : 0} Ks</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4 mb-6">
                <span className="text-white font-bold text-sm">Total Payment</span>
                <span className="text-pink-500 font-extrabold text-xl">
                  {selectedPkg ? selectedPkg.price.toLocaleString() : 0} Ks
                </span>
              </div>

              <button 
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg ${
                  selectedPkg && userId && zoneId && paymentMethod
                  ? 'bg-pink-600 text-white hover:bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                  : 'bg-[#2a2b3d] text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedPkg || !userId || !zoneId || !paymentMethod}
              >
                {(!selectedPkg || !userId || !zoneId || !paymentMethod) ? 'Complete the data first' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

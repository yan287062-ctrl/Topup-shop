'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

export default function TopupPage({ params }: { params: { id: string } }) {
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [selectedPkg, setSelectedPkg] = useState<any>(null);

  // အစ်ကိုပေးထားသော MLBB ဈေးနှုန်းစာရင်း
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
  ];

  return (
    <main className="min-h-screen bg-[#070814] pb-32">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 mt-2">
        {/* Back Button & Header */}
        <div className="flex items-center space-x-3 mb-6 bg-[#1a1b2e]/60 p-3 rounded-2xl border border-white/10">
          <Link href="/" className="text-gray-400 hover:text-white bg-white/5 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <img src="/mlbb.png" alt="MLBB" className="w-12 h-12 rounded-xl object-cover border border-white/10" />
          <div>
            <h1 className="text-white font-bold text-sm sm:text-base">Mobile Legends</h1>
            <p className="text-pink-500 text-[10px] sm:text-xs">Myanmar (Global)</p>
          </div>
        </div>

        {/* Step 1: User ID */}
        <div className="bg-[#131422] p-4 sm:p-5 rounded-2xl mb-4 border border-white/5 shadow-lg">
          <div className="flex items-center mb-4">
            <span className="bg-pink-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mr-3 shadow-[0_0_10px_rgba(236,72,153,0.4)]">1</span>
            <h2 className="text-white text-sm font-semibold">အကောင့်အချက်အလက် ဖြည့်ပါ</h2>
          </div>
          <div className="flex space-x-3">
            <input 
              type="text" 
              placeholder="User ID" 
              className="w-2/3 bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Zone ID" 
              className="w-1/3 bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
              value={zoneId}
              onChange={(e) => setZoneId(e.target.value)}
            />
          </div>
          <p className="text-gray-500 text-[10px] mt-2 ml-1">ဥပမာ: 12345678 (1234)</p>
        </div>

        {/* Step 2: Select Package */}
        <div className="bg-[#131422] p-4 sm:p-5 rounded-2xl mb-8 border border-white/5 shadow-lg">
          <div className="flex items-center mb-4">
            <span className="bg-pink-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mr-3 shadow-[0_0_10px_rgba(236,72,153,0.4)]">2</span>
            <h2 className="text-white text-sm font-semibold">ပမာဏ ရွေးချယ်ပါ</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {mlbbPackages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg)}
                className={`relative p-3 rounded-xl border text-left transition-all duration-200 ${
                  selectedPkg?.id === pkg.id 
                  ? 'bg-pink-900/20 border-pink-500' 
                  : 'bg-black/20 border-white/10 hover:border-white/30'
                }`}
              >
                {selectedPkg?.id === pkg.id && (
                  <div className="absolute top-0 right-0 bg-pink-500 rounded-bl-lg rounded-tr-xl p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-white font-bold text-xs mb-1">{pkg.name}</div>
                <div className="text-pink-400 text-xs font-medium">{pkg.price.toLocaleString()} Ks</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Checkout Bar */}
      <div className="fixed bottom-0 w-full bg-[#1a1b2e]/95 backdrop-blur-md border-t border-white/10 p-4 z-50 flex justify-between items-center shadow-[0_-10px_30px_rgb(0,0,0,0.5)]">
        <div>
          <p className="text-gray-400 text-[10px]">ကျသင့်ငွေ</p>
          <p className="text-pink-500 font-bold text-lg">
            {selectedPkg ? `${selectedPkg.price.toLocaleString()} Ks` : '0 Ks'}
          </p>
        </div>
        <button 
          className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
            selectedPkg && userId && zoneId
            ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedPkg || !userId || !zoneId}
        >
          ဝယ်ယူမည်
        </button>
      </div>
    </main>
  );
}

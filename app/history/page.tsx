'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';

export default function HistoryPage() {
  // Demo Data များကို ဖယ်ရှားလိုက်ပြီး Database ချိတ်ဆက်ရန် အလွတ် (Empty Array) တည်ဆောက်ထားပါသည်
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest');

  // Status badge colors styling
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Success': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Filter Logic
  const filteredData = transactions.filter(item => {
    const matchesFilter = filter === 'All' || item.status === filter;
    const matchesSearch = item.invoice.toLowerCase().includes(search.toLowerCase()) || 
                          item.game.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#070814] pb-28 font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 mt-6">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white tracking-wide">Transaction History</h1>
          <p className="text-pink-500 text-xs mt-1">{filteredData.length} transactions recorded.</p>
        </div>

        {/* Filters & Search Area */}
        <div className="bg-[#131422] p-4 sm:p-5 rounded-3xl border border-white/5 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search invoice or game..." 
                className="w-full bg-[#0a0b14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs focus:outline-none focus:border-pink-500 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Success', 'Pending', 'Failed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-medium transition-all ${
                    filter === status 
                    ? 'bg-pink-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.4)]' 
                    : 'bg-[#0a0b14] border border-white/10 text-gray-400 hover:text-white hover:border-pink-500/50'
                  }`}
                >
                  {status}
                </button>
              ))}
              
              {/* Sort Dropdown */}
              <div className="ml-auto md:ml-2">
                 <select 
                  className="bg-[#0a0b14] border border-white/10 text-gray-300 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-pink-500"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                 >
                   <option value="Newest">Newest</option>
                   <option value="Oldest">Oldest</option>
                 </select>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-[#131422] rounded-3xl border border-white/5 shadow-xl overflow-hidden">
          
          {/* Table Header (Desktop View) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#1a1b2e]/50 border-b border-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
            <div className="col-span-4">Item</div>
            <div className="col-span-4">Invoice</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-center">Status</div>
          </div>

          {/* List Items */}
          {filteredData.length > 0 ? (
            <div className="divide-y divide-white/5">
              {filteredData.map((tx) => (
                <div key={tx.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:px-6 sm:py-5 hover:bg-white/[0.02] transition-colors items-center relative">
                  
                  {/* Mobile Status Dot */}
                  <div className={`md:hidden absolute top-4 right-4 w-2 h-2 rounded-full ${tx.status === 'Success' ? 'bg-green-500' : tx.status === 'Failed' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>

                  <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                    <img src={tx.img} alt={tx.game} className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-sm" />
                    <div>
                      <h4 className="text-white text-sm font-bold truncate max-w-[200px]">{tx.package}</h4>
                      <p className="text-gray-500 text-[10px] mt-0.5 truncate max-w-[200px]">{tx.game} {tx.server !== '-' ? tx.server : ''}</p>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-4 flex flex-col justify-center">
                    <span className="text-gray-400 text-[10px] md:hidden mb-1 uppercase">Invoice</span>
                    <p className="text-pink-400 text-xs font-mono font-medium">{tx.invoice}</p>
                    <p className="text-gray-500 text-[10px] mt-0.5">{tx.date}</p>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex flex-col md:items-end justify-center">
                    <span className="text-gray-400 text-[10px] md:hidden mb-1 uppercase">Price</span>
                    <p className="text-white text-sm font-bold">K {tx.price.toLocaleString()}</p>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-center gap-4 mt-2 md:mt-0">
                    <div className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${getStatusStyle(tx.status)}`}>
                      {tx.status}
                    </div>
                    <button className="text-gray-500 hover:text-white p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            /* Empty State UI (No Data) */
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-[#0a0b14] rounded-full flex items-center justify-center mb-5 border border-white/5 shadow-inner">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-white text-base font-bold mb-2">No Transactions Yet</h3>
              <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
                You haven't made any top-up transactions. Once you do, your purchase history will appear here.
              </p>
            </div>
          )}
          
        </div>
      </div>
      
      {/* Persistent Bottom Nav */}
      <BottomNav />
    </main>
  );
}

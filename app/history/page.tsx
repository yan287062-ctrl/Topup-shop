'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { supabase } from '../../lib/supabase';

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const getGameImage = (gameName: string) => {
    const name = gameName?.toLowerCase() || '';
    if (name.includes('mobile legends')) return '/mlbb.png';
    if (name.includes('magic chess')) return '/MCGG.png';
    if (name.includes('pubg')) return '/pubg.png';
    if (name.includes('uc pack')) return '/Pubgucpack.png';
    if (name.includes('telegram')) return '/telegram.png';
    if (name.includes('heartopia')) return '/heartopia.png';
    if (name.includes('smile')) return '/smile_coin.png';
    return '/mlbb.png';
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = search.trim();
    if (!searchTerm) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      // ၁။ ဂိမ်းအော်ဒါများ ရှာခြင်း (Player ID သို့မဟုတ် Invoice Code ဖြင့် ရှာမည်)
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .or(`player_id.eq.${searchTerm},invoice_code.eq.${searchTerm}`);

      // ၂။ Wallet ငွေဖြည့်မှတ်တမ်းများ ရှာခြင်း (ဖုန်းနံပါတ် သို့မဟုတ် Invoice Code ဖြင့် ရှာမည်)
      const { data: walletData } = await supabase
        .from('wallet_history')
        .select('*')
        .or(`phone.eq.${searchTerm},invoice_code.eq.${searchTerm}`);

      let combined: any[] = [];

      if (ordersData) {
        const mappedOrders = ordersData.map(o => ({
          id: `ord-${o.id}`,
          game: o.game_name,
          package: o.item_name,
          server: o.zone_id || '-',
          price: o.price,
          status: o.status === 'done' ? 'Success' : 'Pending',
          date: new Date(o.created_at).toLocaleString(),
          rawDate: new Date(o.created_at).getTime(),
          invoice: o.invoice_code || `ORD-${o.id}`,
          img: getGameImage(o.game_name)
        }));
        combined = [...combined, ...mappedOrders];
      }

      if (walletData) {
        const mappedWallet = walletData.map(w => ({
          id: `wal-${w.id}`,
          game: 'Wallet Topup',
          package: 'Balance Topup',
          server: '-',
          price: w.amount,
          status: w.status === 'done' ? 'Success' : 'Pending',
          date: new Date(w.created_at).toLocaleString(),
          rawDate: new Date(w.created_at).getTime(),
          invoice: w.invoice_code || `WAL-${w.id}`,
          img: '/wallet.png'
        }));
        combined = [...combined, ...mappedWallet];
      }

      setTransactions(combined);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Success': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const displayData = transactions
    .filter(item => filter === 'All' || item.status === filter)
    .sort((a, b) => sortOrder === 'Newest' ? b.rawDate - a.rawDate : a.rawDate - b.rawDate);

  return (
    <main className="min-h-screen bg-[#070814] pb-28 font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white tracking-wide">Transaction History</h1>
          <p className="text-pink-500 text-xs mt-1">Check your latest orders and topups here.</p>
        </div>

        <div className="bg-[#131422] p-4 sm:p-5 rounded-3xl border border-white/5 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            
            <form onSubmit={handleSearch} className="relative w-full md:w-1/2 flex gap-2">
              <input 
                type="text" 
                placeholder="Invoice Code, Game ID (သို့) ဖုန်းနံပါတ် ဖြင့်ရှာပါ..." 
                className="w-full bg-[#0a0b14] border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-pink-500 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
              <button type="submit" disabled={isSearching} className="bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                {isSearching ? 'ရှာနေသည်...' : 'ရှာမည်'}
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Success', 'Pending'].map((status) => (
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

        <div className="bg-[#131422] rounded-3xl border border-white/5 shadow-xl overflow-hidden min-h-[300px]">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#1a1b2e]/50 border-b border-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
            <div className="col-span-4">Item</div>
            <div className="col-span-4">Invoice</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-center">Status</div>
          </div>

          {!hasSearched ? (
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-[#0a0b14] rounded-full flex items-center justify-center mb-5 border border-white/5 shadow-inner">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-white text-base font-bold mb-2">မှတ်တမ်း ရှာဖွေရန်</h3>
              <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
                သင်ဝယ်ယူထားသော မှတ်တမ်းများကို ကြည့်ရှုရန် အပေါ်က အကွက်တွင် သင်၏ Invoice Code, Game ID (သို့) ဖုန်းနံပါတ်ကို ရိုက်ထည့်ပြီး ရှာဖွေပါ။
              </p>
            </div>
          ) : displayData.length > 0 ? (
            <div className="divide-y divide-white/5">
              {displayData.map((tx) => (
                <div key={tx.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:px-6 sm:py-5 hover:bg-white/[0.02] transition-colors items-center relative">
                  
                  <div className={`md:hidden absolute top-4 right-4 w-2 h-2 rounded-full ${tx.status === 'Success' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>

                  <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                    <img src={tx.img} alt={tx.game} className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-sm" />
                    <div>
                      <h4 className="text-white text-sm font-bold truncate max-w-[200px]">{tx.package}</h4>
                      <p className="text-gray-500 text-[10px] mt-0.5 truncate max-w-[200px]">{tx.game} {tx.server !== '-' ? `(${tx.server})` : ''}</p>
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
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-[#0a0b14] rounded-full flex items-center justify-center mb-5 border border-white/5 shadow-inner text-2xl">
                📭
              </div>
              <h3 className="text-white text-base font-bold mb-2">မှတ်တမ်း မရှိပါ</h3>
              <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
                ဒီ အချက်အလက်ဖြင့် ဝယ်ယူထားသော မှတ်တမ်း မတွေ့ရှိပါ။ မှန်ကန်စွာ ရိုက်ထည့်ထားခြင်း ရှိမရှိ ပြန်စစ်ကြည့်ပါ။
              </p>
            </div>
          )}
          
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

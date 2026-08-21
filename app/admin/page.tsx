'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'topups' | 'mapping'>('topups');
  const [orders, setOrders] = useState<any[]>([]);
  const [topups, setTopups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin', { cache: 'no-store' });
      const data = await res.json();
      setOrders(data.orders || []);
      setTopups(data.topups || []);
    } catch (e) {
      console.error('Error fetching:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (id: string, status: string, email: string, amount: number) => {
    if (!confirm('သေချာပါသလား?')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_topup', id, status, email, amount })
      });
      const result = await res.json();
      if (result.success) {
        alert('အောင်မြင်ပါသည်!');
        fetchData();
      } else {
        alert('အမှား: ' + (result.error || ''));
      }
    } catch (e) {
      alert('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d18] text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-lg">Admin Panel</h1>
        <button onClick={() => router.push('/')} className="bg-red-600 px-3 py-1 rounded-lg text-xs font-bold">Logout</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'orders' ? 'bg-blue-600' : 'bg-[#0e1726]'}`}>အော်ဒါများ</button>
        <button onClick={() => setActiveTab('topups')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'topups' ? 'bg-blue-600' : 'bg-[#0e1726]'}`}>ငွေဖြည့်တောင်းဆိုမှုများ</button>
        <button onClick={() => setActiveTab('mapping')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'mapping' ? 'bg-blue-600' : 'bg-[#0e1726]'}`}>Mapping</button>
      </div>

      {/* Topups Tab */}
      {activeTab === 'topups' && (
        <div className="space-y-3">
          {topups.map((t: any) => (
            <div key={t.id} className="bg-[#0e1726] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
              <div>
                <p className="text-sm font-bold">{t.email}</p>
                <p className="text-xs text-gray-400">{t.amount} Ks | Status: <span className="text-yellow-500">{t.status}</span></p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleAction(t.id, 'approved', t.email, t.amount)}
                  disabled={t.status === 'approved' || loading}
                  className="bg-green-600 hover:bg-green-500 px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-50"
                >
                  လက်ခံမည်
                </button>
                <button 
                  onClick={() => handleAction(t.id, 'rejected', t.email, t.amount)}
                  disabled={t.status === 'rejected' || loading}
                  className="bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-50"
                >
                  ငြင်းပယ်မည်
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

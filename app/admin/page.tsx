'use client';
import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [topups, setTopups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin', { cache: 'no-store' });
      const data = await res.json();
      setTopups(data.topups || []);
    } catch (e) {
      console.error('Error fetching:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (id: string, status: string, email: string, amount: number) => {
    if (!confirm('ဒီအော်ဒါကို ' + (status === 'approved' ? 'လက်ခံ' : 'ငြင်းပယ်') + ' မည်လား?')) return;
    
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
        alert('အမှားဖြစ်သွားသည်: ' + (result.error || ''));
      }
    } catch (e) {
      alert('Network Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d18] text-white p-4">
      <h2 className="text-lg font-bold mb-4">ငွေဖြည့်တောင်းဆိုမှုများ</h2>
      <div className="space-y-3">
        {topups.length === 0 ? <p className="text-sm text-gray-500">မရှိသေးပါ</p> : topups.map((t: any) => (
          <div key={t.id} className="bg-[#0e1726] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold">{t.email}</p>
              <p className="text-xs text-gray-400">{t.amount} Ks | <span className="text-yellow-500">{t.status}</span></p>
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
    </div>
  );
}

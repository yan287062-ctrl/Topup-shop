'use client';
import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [topups, setTopups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin', { cache: 'no-store' });
      const data = await res.json();
      console.log('Data fetched:', data);
      setTopups(data.topups || []);
    } catch (e) {
      console.error('Error:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const testClick = (id: string) => {
    console.log('Button clicked for ID:', id);
    alert('ခလုတ်ကို နှိပ်လို့ ရပါတယ်! ID: ' + id);
  };

  return (
    <div className="min-h-screen bg-[#070d18] text-white p-4">
      <h2 className="text-lg font-bold mb-4">ငွေဖြည့်တောင်းဆိုမှုများ (Debug Mode)</h2>
      <div className="space-y-3">
        {topups.map((t: any) => (
          <div key={t.id} className="bg-[#0e1726] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold">{t.email}</p>
              <p className="text-xs text-gray-400">{t.amount} Ks | {t.status}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => testClick(t.id)}
                className="bg-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                Test ခလုတ်
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

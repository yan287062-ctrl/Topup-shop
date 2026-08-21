'use client';
import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [topups, setTopups] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin', { cache: 'no-store' });
      const data = await res.json();
      setTopups(data.topups || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAction = async (id: string, status: string, email: string, amount: number) => {
    if (!confirm('သေချာပါသလား?')) return;
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_topup', id, status, email, amount })
      });
      if ((await res.json()).success) {
        alert('အောင်မြင်ပါသည်');
        fetchData();
      }
    } catch (e) {
      alert('Error');
    }
  };

  return (
    <div className="min-h-screen bg-[#070d18] text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <a href="/" className="bg-red-600 px-4 py-2 rounded-lg text-xs">Logout</a>
      </div>

      <div className="flex gap-2 mb-6">
        <button className="bg-blue-600 px-4 py-2 rounded-lg text-xs">ငွေဖြည့်တောင်းဆိုမှုများ</button>
      </div>

      <div className="overflow-x-auto bg-[#0e1726] rounded-xl border border-gray-800">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="p-3">User Email</th>
              <th className="p-3">ငွေပမာဏ</th>
              <th className="p-3">အခြေအနေ</th>
              <th className="p-3">လုပ်ဆောင်ချက်</th>
            </tr>
          </thead>
          <tbody>
            {topups.map((t: any) => (
              <tr key={t.id} className="border-b border-gray-800">
                <td className="p-3">{t.email}</td>
                <td className="p-3">{t.amount} Ks</td>
                <td className="p-3 text-yellow-500">{t.status}</td>
                <td className="p-3 flex gap-2">
                  <button 
                    onClick={() => handleAction(t.id, 'approved', t.email, t.amount)}
                    className="bg-green-600 px-2 py-1 rounded"
                  >လက်ခံ</button>
                  <button 
                    onClick={() => handleAction(t.id, 'rejected', t.email, t.amount)}
                    className="bg-red-600 px-2 py-1 rounded"
                  >ငြင်းပယ်</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

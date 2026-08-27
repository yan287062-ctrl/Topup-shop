import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
  const games = [
    { id: 'mobile-legends', name: 'Mobile Legends', sub: 'Myanmar (Global)', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&q=80' },
    { id: 'magic-chess', name: 'Magic Chess', sub: 'Myanmar (Global)', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&q=80' },
    { id: 'pubg-uc', name: 'PUBG UC', sub: 'Global', img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&q=80' },
    { id: 'uc-pack', name: 'UC pack', sub: 'Global', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&q=80' },
    { id: 'heartopia', name: 'Heartopia', sub: 'Game Topup', img: 'https://images.unsplash.com/photo-1612287233002-8f92024b4554?w=300&q=80' },
    { id: 'telegram', name: 'Telegram Premium', sub: 'Social App', img: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=300&q=80' },
    { id: 'smile-coin', name: 'Smile Coin', sub: 'Game Currency', img: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=300&q=80' },
  ];

  return (
    <main className="min-h-screen bg-[#0f1020] pb-24">
      {/* Navbar အပေါ်ဘား */}
      <Navbar />

      {/* ခေါင်းစဉ် */}
      <div className="max-w-5xl mx-auto px-4 mb-4">
        <h2 className="text-gray-300 text-xs sm:text-sm font-medium">ရရှိနိုင်သော ဂိမ်းနှင့် ဝန်ဆောင်မှုများ:</h2>
      </div>

      {/* ဂိမ်းကတ်များ Grid (၄ ခု တစ်တန်း၊ ဒေါင်လိုက်မရှည်ဘဲ အချိုးကျသော ပုံစံ) */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {games.map((game) => (
          <Link 
            key={game.id} 
            href={`/topup/${game.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-md transition-transform duration-200 hover:scale-[1.02] flex flex-col"
          >
            {/* အပေါ်ပိုင်း ပုံစံ (ဒေါင်လိုက်မရှည်ဘဲ အနေတော် h-24) */}
            <div className="w-full h-24 sm:h-28 relative overflow-hidden bg-gray-100">
              <img src={game.img} alt={game.name} className="w-full h-full object-cover" />
            </div>
            {/* အောက်ပိုင်း စာသားများ */}
            <div className="p-2.5 flex flex-col justify-between flex-1">
              <h3 className="text-gray-900 font-bold text-xs sm:text-sm truncate">{game.name}</h3>
              <p className="text-gray-500 text-[10px] sm:text-xs truncate mt-0.5">{game.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

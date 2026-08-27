import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
  const games = [
    { id: 'mobile-legends', name: 'Mobile Legend', sub: 'Myanmar (Global)', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&q=80' },
    { id: 'magic-chess', name: 'Magic Chess', sub: 'Myanmar (Global)', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&q=80' },
    { id: 'pubg-uc', name: 'PUBG UC', sub: 'Global', img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&q=80' },
    { id: 'uc-pack', name: 'UC pack', sub: 'Global', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&q=80' },
    { id: 'heartopia', name: 'Heartopia', sub: 'Game Topup', img: 'https://images.unsplash.com/photo-1612287233002-8f92024b4554?w=300&q=80' },
    { id: 'telegram', name: 'Telegram Premium', sub: 'Social App', img: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=300&q=80' },
    { id: 'smile-coin', name: 'Smile coin', sub: 'Game Currency', img: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=300&q=80' },
  ];

  return (
    <main className="min-h-screen bg-[#070814] pb-28 relative">
      {/* Navbar အပေါ်ဘား */}
      <Navbar />

      {/* ခေါင်းစဉ် */}
      <div className="max-w-4xl mx-auto px-4 mb-3">
        <h2 className="text-gray-300 text-xs sm:text-sm font-medium">ရရှိနိုင်သော ဂိမ်းနှင့် ဝန်ဆောင်မှုများ:</h2>
      </div>

      {/* ဂိမ်းကတ်များ Grid (၄ ခု တစ်တန်း၊ ဒေါင်လိုက်မရှည်ဘဲ အနေတော် ပြီး လေးထောင့်ဆန်ဆန်) */}
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {games.map((game) => (
          <Link 
            key={game.id} 
            href={`/topup/${game.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform duration-200 hover:scale-[1.02] flex flex-col"
          >
            {/* အပေါ်ပိုင်း ပုံ (အမြင့်ကို အနေတော် h-20 သို့မဟုတ် h-24 သဖြင့် ဒေါင်လိုက်မရှည်တော့ပါ) */}
            <div className="w-full h-20 sm:h-24 relative overflow-hidden bg-gray-100">
              <img src={game.img} alt={game.name} className="w-full h-full object-cover" />
            </div>
            {/* အောက်ပိုင်း စာသား */}
            <div className="p-2 flex flex-col justify-between flex-1">
              <h3 className="text-gray-900 font-bold text-xs truncate">{game.name}</h3>
              <p className="text-gray-500 text-[10px] truncate mt-0.5">{game.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

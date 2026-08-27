import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
  const games = [
    { id: 'mobile-legends', name: 'Mobile Legend', sub: 'Myanmar (Global)', img: '/mlbb.png' },
    { id: 'magic-chess', name: 'Magic Chess', sub: 'Myanmar (Global)', img: '/MCGG.png' },
    { id: 'pubg-uc', name: 'PUBG UC', sub: 'Global', img: '/pubg.png' },
    { id: 'uc-pack', name: 'UC pack', sub: 'Global', img: '/Pubgucpack.png' },
    { id: 'heartopia', name: 'Heartopia', sub: 'Game Topup', img: '/heartopia.png' },
    { id: 'telegram', name: 'Telegram Premium', sub: 'Social App', img: '/telegram.png' },
    { id: 'smile-coin', name: 'Smile coin', sub: 'Game Currency', img: '/smile_coin.png' },
  ];

  return (
    <main 
      className="min-h-screen pb-28 relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/bg.gif')" }}
    >
      <div className="absolute inset-0 bg-[#070814]/70 z-0"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 mb-3 mt-4">
          <h2 className="text-gray-200 text-xs sm:text-sm font-medium">ရရှိနိုင်သော ဂိမ်းနှင့် ဝန်ဆောင်မှုများ:</h2>
        </div>

        <div className="max-w-4xl mx-auto px-4 grid grid-cols-4 gap-2 sm:gap-3">
          {games.map((game) => (
            <Link 
              key={game.id} 
              href={`/topup/${game.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-200 hover:scale-[1.05] flex flex-col border border-white/20"
            >
              <div className="w-full h-16 sm:h-20 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src={game.img} alt={game.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-1.5 sm:p-2 flex flex-col justify-between flex-1 bg-white">
                <h3 className="text-gray-900 font-bold text-[9px] sm:text-[11px] truncate">{game.name}</h3>
                <p className="text-gray-500 text-[7px] sm:text-[9px] truncate mt-0.5">{game.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

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
      className="min-h-screen pb-28 relative bg-cover bg-center bg-fixed font-sans"
      style={{ backgroundImage: "url('/bg.gif')" }}
    >
      <div className="absolute inset-0 bg-[#070b19]/60 backdrop-blur-[2px] z-0"></div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#00f2fe]/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 mb-3 mt-4">
          <h2 className="text-gray-200 text-xs sm:text-sm font-semibold tracking-wide">
            ရရှိနိုင်သော ဂိမ်းနှင့် ဝန်ဆောင်မှုများ:
          </h2>
        </div>

        <div className="max-w-4xl mx-auto px-4 grid grid-cols-4 gap-2 sm:gap-3">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/topup/${game.id}`}
              className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:bg-white/20 hover:border-[#00f2fe]/50 flex flex-col group"
            >
              {/* ပုံကို လေးထောင့်အပြည့်ပေါ်စေရန် Padding များကို ဖြုတ်လိုက်ပါပြီ */}
              <div className="w-full h-16 sm:h-20 relative bg-black/40">
                <img 
                  src={game.img} 
                  alt={game.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              
              <div className="p-1.5 sm:p-2 flex flex-col justify-between flex-1 bg-black/20 backdrop-blur-sm border-t border-white/10">
                <h3 className="text-white font-bold text-[9px] sm:text-[11px] truncate">{game.name}</h3>
                <p className="text-[#00f2fe] font-semibold text-[7px] sm:text-[9px] truncate mt-0.5">{game.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

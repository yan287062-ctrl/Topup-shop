import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
  // အစ်ကိုပေးထားသော ဂိမ်းစာရင်းနှင့် ပုံအမည်များ
  const games = [
    { name: "Mobile Legend", subtitle: "Myanmar (Global)", image: "mlbb.png", href: "/topup/mlbb" },
    { name: "Magic Chess", subtitle: "Myanmar (Global)", image: "MCGG.png", href: "/topup/magic-chess" },
    { name: "PUBG UC", subtitle: "Global", image: "pubg.png", href: "/topup/pubg" },
    { name: "UC pack", subtitle: "Global", image: "Pubgucpack.png", href: "/topup/uc-pack" },
    { name: "Heartopia", subtitle: "Game Topup", image: "heartopia.png", href: "/topup/heartopia" },
    { name: "Telegram Premium", subtitle: "Social App", image: "telegram.png", href: "/topup/telegram" },
    { name: "Smile coin", subtitle: "Game Currency", image: "smile_coin.png", href: "/topup/smile-coin" },
  ];

  return (
    <main 
      className="min-h-screen relative flex flex-col pb-20"
      style={{
        backgroundImage: "url('/bg.gif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      {/* Navbar ကို အပေါ်ဆုံးမှ အုပ်ထားမည် */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* ဂိမ်းရွေးချယ်ရန် ကတ်များ (Grid System) */}
      <div className="relative z-10 flex-grow px-4 mt-6 max-w-md mx-auto w-full">
        <h2 className="text-white text-base font-bold mb-4 drop-shadow-md">
          ရရှိနိုင်သော ဂိမ်းနှင့် ဝန်ဆောင်မှုများ
        </h2>
        
        {/* ဖုန်းတွင် ၂ ကွက်၊ မျက်နှာပြင်ကျယ်လျှင် ၃ ကွက် ပေါ်မည် */}
        <div className="grid grid-cols-4 gap-2 md:grid-cols-4">
          {games.map((game, index) => (
            <Link 
              href={game.href} 
              key={index} 
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.5)] transform transition-transform hover:scale-105 active:scale-95"
            >
              {/* အပေါ်တစ်ဝက်: ဂိမ်းပုံ */}
              <div className="h-28 w-full relative bg-gray-200">
                <img 
                  src={`/${game.image}`} 
                  alt={game.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* အောက်တစ်ဝက်: စာသားများ */}
              <div className="p-3 bg-white">
                <h3 className="text-gray-900 font-bold text-[13px] truncate">
                  {game.name}
                </h3>
                <p className="text-gray-500 text-[11px] mt-0.5 truncate">
                  {game.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

'use client';

export default function ChatWidget() {
  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 flex items-end gap-3 pointer-events-none">
      
      <div className="bg-gray-800/90 backdrop-blur-sm text-white py-2 px-4 rounded-2xl shadow-lg mb-2 pointer-events-auto border border-gray-700/50">
        <p className="text-xs font-black tracking-wide">Need Help?</p>
        <p className="text-[10px] text-gray-300 font-medium">Tap to chat</p>
      </div>
      
      <a
        href="https://t.me/Paing_Gyi203" 
        target="_blank"
        rel="noopener noreferrer" 
        className="w-14 h-14 bg-gradient-to-br from-[#b073ff] to-[#6035f2] rounded-full flex items-center justify-center shadow-xl relative transform transition-transform hover:scale-105 pointer-events-auto cursor-pointer"
      >
        <svg className="w-7 h-7 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span className="absolute bottom-0 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
      </a>
      
    </div>
  );
}
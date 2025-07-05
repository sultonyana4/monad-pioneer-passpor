import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-12 flex flex-col items-center text-gray-300 text-sm bg-white/10 backdrop-blur-md border-t border-cyan-400/20 shadow-inner">
      <div className="mb-2 flex items-center gap-2">
        <span className="font-bold text-cyan-400 text-lg tracking-wide">Monad Pioneer's Passport</span>
        <span className="text-gray-500">&copy; {new Date().getFullYear()}</span>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <span className="text-cyan-400 font-bold">React</span>
        <span className="text-fuchsia-400 font-bold">RainbowKit</span>
        <span className="text-blue-400 font-bold">Wagmi</span>
        <span className="text-green-400 font-bold">Tailwind CSS</span>
        <span className="text-gray-500">by <span className="hover:text-fuchsia-400 transition-colors">sultonyana4</span></span>
      </div>
    </footer>
  );
}

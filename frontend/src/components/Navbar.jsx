import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white/10 backdrop-blur-md border-b border-cyan-400/20 shadow-lg z-20 sticky top-0">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="inline-block drop-shadow">
            <rect x="5" y="8" width="26" height="20" rx="7" fill="#23272e" stroke="#00f5d4" strokeWidth="2.5" />
            <text x="18" y="22" textAnchor="middle" dominantBaseline="middle" fontFamily="monospace" fontWeight="bold" fontSize="13" fill="#00f5d4">MONAD</text>
          </svg>
          <span className="text-cyan-400 font-extrabold text-2xl tracking-tight hover:text-fuchsia-400 transition-colors duration-200 cursor-pointer drop-shadow-lg">Monad Passport</span>
        </span>
      </div>
      <div className="hover:scale-105 transition-transform duration-200">
        <ConnectButton />
      </div>
    </nav>
  );
}

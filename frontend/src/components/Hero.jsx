import React from 'react';

export default function Hero({ onMintClick, isConnected }) {
  return (
    <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center text-center py-24 px-4 bg-gradient-to-b from-[#0D1117] to-[#1a1a1a] overflow-hidden">
      {/* Aurora/gradient background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="w-full h-full bg-gradient-to-tr from-cyan-400/20 via-fuchsia-500/10 to-blue-700/20 blur-2xl animate-pulse" />
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" width="700" height="340" viewBox="0 0 700 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="350" cy="170" rx="300" ry="100" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(350 170) scale(300 100)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00f5d4" stopOpacity="0.18" />
              <stop offset="1" stopColor="#23272e" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto">
        <div className="mb-10 animate-fade-in-up w-full">
          <div className="mx-auto w-fit rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl border border-cyan-400/30 p-6 flex flex-col items-center gap-2">
            <svg width="120" height="120" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="30" width="110" height="80" rx="18" fill="#23272e" stroke="#00f5d4" strokeWidth="4" />
              <text x="70" y="75" textAnchor="middle" dominantBaseline="middle" fontFamily="monospace" fontWeight="bold" fontSize="28" fill="#00f5d4">MONAD</text>
              <rect x="30" y="50" width="80" height="40" rx="8" fill="#181c23" stroke="#58A6FF" strokeWidth="2" />
              <text x="70" y="75" textAnchor="middle" dominantBaseline="middle" fontFamily="monospace" fontWeight="bold" fontSize="16" fill="#58A6FF">PASSPORT</text>
            </svg>
            <span className="mt-2 text-xs uppercase tracking-widest text-cyan-300 font-semibold bg-cyan-900/30 px-3 py-1 rounded-full shadow">On-chain NFT</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent animate-fade-in-up drop-shadow-lg">
          Monad Pioneer's Passport
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mb-10 animate-fade-in-up delay-100 drop-shadow">
          <span className="bg-white/10 px-2 py-1 rounded-xl">Mint your on-chain passport and prove you are a true Monad pioneer.</span><br />
          <span className="text-cyan-200">All NFT art and data are fully on-chain, forever.</span>
        </p>
        <button
          onClick={onMintClick}
          disabled={!isConnected}
          className="px-12 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-gray-900 font-extrabold text-xl shadow-2xl hover:from-cyan-300 hover:to-fuchsia-300 transition-all duration-200 disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed animate-fade-in-up delay-200 border-2 border-cyan-200/40 hover:scale-105"
        >
          {isConnected ? 'Mint Your Passport' : 'Connect Wallet to Mint'}
        </button>
      </div>
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(.39,.575,.565,1) both;
        }
        .animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

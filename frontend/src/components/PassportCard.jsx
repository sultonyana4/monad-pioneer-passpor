import React from 'react';

export default function PassportCard({ svg, tokenId, mintedAt, hasFirstStamp, onClaimStamp, isClaiming, isOwner }) {
  return (
    <div className="w-full max-w-md mx-auto bg-[#181c23] rounded-2xl shadow-xl p-6 flex flex-col items-center mt-8 border border-cyan-900">
      <div className="w-full flex justify-center mb-4">
        {/* Render SVG NFT */}
        <div className="bg-[#23272e] rounded-xl p-2 border border-cyan-700">
          <div dangerouslySetInnerHTML={{ __html: svg }} className="w-[350px] h-[200px]" />
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">Passport #{tokenId}</h2>
        <p className="text-gray-400 text-sm mb-2">Minted: {mintedAt}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${hasFirstStamp ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
            {hasFirstStamp ? 'First Stamp Claimed' : 'No Stamp Yet'}
          </span>
        </div>
        {isOwner && !hasFirstStamp && (
          <button
            onClick={onClaimStamp}
            disabled={isClaiming}
            className="px-6 py-2 rounded-lg bg-fuchsia-400 text-gray-900 font-bold text-base shadow hover:bg-fuchsia-300 transition-colors disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            {isClaiming ? 'Claiming...' : 'Claim First Stamp'}
          </button>
        )}
      </div>
    </div>
  );
}

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { 
  useAccount, 
  useSimulateContract, 
  useWriteContract, 
  useWaitForTransactionReceipt,
  useContractRead 
} from 'wagmi';
import { contractAddress, contractAbi } from './contract.js';

function App() {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 pt-24">
      <header className="absolute top-4 right-4">
        <ConnectButton />
      </header>
      <main className="text-center w-full max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">Monad Pioneer's Passport</h1>
        <p className="text-xl text-gray-400 mb-8">Mint your on-chain passport and prove you were here.</p>
        
        {isConnected ? <MintSection /> : <p className="text-yellow-400">Please connect your wallet to mint.</p>}

        {isConnected && <OwnedPassport address={address} />}
      </main>
    </div>
  );
}

// Komponen untuk Minting
function MintSection() {
  // 1. Simulasikan transaksi untuk mendapatkan request object
  const { data: simulation } = useSimulateContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mintPassport',
  });

  // 2. Dapatkan fungsi untuk mengirim transaksi
  const { data: hash, writeContract } = useWriteContract();

  // 3. Tunggu transaksi selesai
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  return (
    <div className="mb-12">
      <button
        disabled={!simulation?.request || isLoading}
        onClick={() => writeContract(simulation.request)}
        className="bg-cyan-400 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-300 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Minting...' : 'Mint Your Passport'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-2 text-green-300">
          Successfully minted! Your passport will appear below.
        </div>
      )}
    </div>
  );
}

// Komponen untuk menampilkan NFT yang dimiliki
function OwnedPassport({ address }) {
  const { data: balance } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  });

  if (!balance || balance === 0n) {
    return <p className="text-gray-500 mt-8">You don't own a passport yet.</p>;
  }
  
  // Untuk simplicity, kita asumsikan user hanya punya 1 NFT dengan ID 0
  const tokenId = 0n; 

  return <PassportCard tokenId={tokenId} />;
}

// Komponen untuk menampilkan satu kartu NFT dan aksinya
function PassportCard({ tokenId }) {
  const { data: tokenUriData } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'tokenURI',
    args: [tokenId],
    watch: true, // Otomatis refresh jika stempel di-claim
  });

  // Simulasikan fungsi claim stamp
  const { data: claimSimulation } = useSimulateContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'claimFirstStamp',
    args: [tokenId],
  });

  const { data: claimHash, writeContract: claimWrite } = useWriteContract();
  const { isLoading: isClaiming, isSuccess: isClaimSuccess } = useWaitForTransactionReceipt({ hash: claimHash });

  let svgImage = null;
  if (tokenUriData) {
    try {
      const jsonString = atob(tokenUriData.substring(29));
      const jsonData = JSON.parse(jsonString);
      svgImage = jsonData.image;
    } catch (e) {
      console.error("Error parsing token URI", e);
    }
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col items-center gap-4 mt-8">
      <h2 className="text-2xl font-bold">Your Passport</h2>
      {svgImage ? (
        <img src={svgImage} alt={`Passport #${tokenId.toString()}`} className="w-full max-w-sm rounded-md shadow-lg" />
      ) : (
        <div className="w-full max-w-sm h-48 bg-gray-700 animate-pulse rounded-md"></div>
      )}
      <button
        disabled={!claimSimulation?.request || isClaiming}
        onClick={() => claimWrite(claimSimulation.request)}
        className="bg-purple-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-400 transition-colors disabled:bg-gray-600"
      >
        {isClaiming ? 'Claiming Stamp...' : 'Claim First Stamp'}
      </button>
      {isClaimSuccess && <p className="text-green-400 mt-2">Stamp claimed successfully!</p>}
    </div>
  );
}

export default App;
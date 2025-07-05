import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Menggunakan .jsx
import './index.css';

// Import library yang dibutuhkan
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

// Definisikan custom chain untuk Monad Testnet
const monadTestnet = {
  id: 10143,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MON',
    symbol: 'MON',
  },
  rpcUrls: {
    public: { http: ['https://testnet-rpc.monad.xyz'] },
    default: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://testnet.monadexplorer.com' },
  },
  testnet: true,
};



// Konfigurasi wagmi & rainbowkit terbaru (v2+)
const config = getDefaultConfig({
  appName: 'Monad Pioneer Passport',
  projectId: '',
  chains: [monadTestnet],
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={[monadTestnet]}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);

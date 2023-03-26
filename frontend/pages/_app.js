import * as React from 'react';
import NextHead from 'next/head';
import '../styles/globals.css';

// Imports
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { useIsMounted } from '../hooks';

export const scrollTestnet = {
   id: 534353,
   name: "Scroll Testnet",
   network: "scroll-testnet",
   nativeCurrency: {
       name: "Ether",
       symbol: "ETH",
       decimals: 18,
  },
   rpcUrls: {
       default: {
           http:  ["https://alpha-rpc.scroll.io/l2"],
      },
       public: {
           http:  ["https://alpha-rpc.scroll.io/l2"],
      },
  },
   blockExplorers: {
       default: {
           name: "Blockscout",
           url: "https://blockscout.scroll.io",
      },
  },
   testnet: true,
};

const { chains, provider } = configureChains(
  [scrollTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({ http: "https://alpha-rpc.scroll.io/l2" }),
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'WillGuard',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = ({ Component, pageProps }) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <NextHead>
          <title>WillGaurd</title>
        </NextHead>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;

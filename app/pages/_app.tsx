import '../styles/globals.css';
import { useMemo } from 'react';
import type { AppProps } from 'next/app';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { NETWORK, ENDPOINT } from '../utils/config';

require('@solana/wallet-adapter-react-ui/styles.css');

const wallets = [
  new PhantomWalletAdapter(),
  new GlowWalletAdapter(),
  new SlopeWalletAdapter(),
  new SolflareWalletAdapter({ network: NETWORK }),
  new TorusWalletAdapter(),
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConnectionProvider endpoint={ENDPOINT}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;

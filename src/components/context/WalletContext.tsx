import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { WalletError } from '@tronweb3/tronwallet-abstract-adapter';
import { useWallet, WalletProvider as TronWalletProvider } from "@tronweb3/tronwallet-adapter-react-hooks";
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import { BitKeepAdapter, OkxWalletAdapter, TokenPocketAdapter, TronLinkAdapter } from "@tronweb3/tronwallet-adapters";
import { WalletConnectAdapter } from "@tronweb3/tronwallet-adapter-walletconnect";
import { LedgerAdapter } from "@tronweb3/tronwallet-adapter-ledger";
import toast from 'react-hot-toast';

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletError, setWalletError] = useState<WalletError | null>(null);

  function onError(e: WalletError) {
    setWalletError(e);
    toast.error(e.message);
  }

  const adapters = useMemo(() => {
    const tronLinkAdapter = new TronLinkAdapter();
    const walletConnectAdapter = new WalletConnectAdapter({
      network: "Shasta", // Cambia según la red que estés usando
      options: {
        relayUrl: "wss://relay.walletconnect.com",
        projectId: "aad580d9ee323f22b059fd5c5a67242c",
        metadata: {
          name: "Real Estate",
          description: "AppKit Example",
          url: "https://reown.com/appkit",  // Cambia a tu URL
          icons: ["https://assets.reown.com/reown-profile-pic.png"],
        },
      },
      web3ModalConfig: {
        themeMode: "dark",
        themeVariables: {
          "--w3m-z-index": "1000",
        },
      },
    });
    const ledger = new LedgerAdapter({ accountNumber: 2 });
    const bitKeepAdapter = new BitKeepAdapter();
    const tokenPocketAdapter = new TokenPocketAdapter();
    const okxwalletAdapter = new OkxWalletAdapter();
    return [
      tronLinkAdapter,
      bitKeepAdapter,
      tokenPocketAdapter,
      okxwalletAdapter,
      walletConnectAdapter,
      ledger,
    ];
  }, []);

  return (
      <TronWalletProvider
        onError={onError}
        autoConnect={true}
        disableAutoConnectOnLoad={true}
        adapters={adapters}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </TronWalletProvider>
  );
};

export function useWalletContext() {
  const context = useWallet();
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
// src/components/Navbar.tsx
import React, { useMemo } from 'react';
import { useWallet, WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletSelectButton, WalletDisconnectButton } from '@tronweb3/tronwallet-adapter-react-ui';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapters';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';

const Navbar: React.FC = () => {
    const { connected, wallet } = useWallet();

    // Configuración de los adaptadores de billetera
    const adapters = useMemo(() => {
        return [
            new TronLinkAdapter(),
            new WalletConnectAdapter({
                network: 'Nile',
                options: {
                    relayUrl: 'wss://relay.walletconnect.com',
                    projectId: '5fc507d8fc7ae913fff0b8071c7df231',
                    metadata: {
                        name: 'Test DApp',
                        description: 'JustLend WalletConnect',
                        url: 'https://your-dapp-url.org/',
                        icons: ['https://your-dapp-url.org/mainLogo.svg'],
                    },
                },
            }),
        ];
    }, []);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Real Estate DApp
                </Typography>
                {!connected ? (
                    <>
                        <WalletSelectButton />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: '10px' }}
                            onClick={() => console.log('Connecting...')}
                        >
                            Connect Wallet
                        </Button>
                    </>
                ) : (
                    <>
                        <span>Wallet: {wallet?.adapter.name}</span>
                        <WalletDisconnectButton />
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
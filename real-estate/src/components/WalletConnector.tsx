// import React, { useState } from 'react';
// import { Button } from '@mui/material';
// import { WalletService } from '../services/WalletService';
// import toast from 'react-hot-toast';

// const WalletConnector = ({ setUserAddress }) => {
//     const connectWallet = async () => {
//         try {
//             const connectedAddress = await WalletService.connect();
//             setUserAddress(connectedAddress);
//             toast.success('Wallet conectada: ' + connectedAddress);
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     return (
//         <div>
//             <Button variant="contained" onClick={connectWallet}>
//                 Conectar Wallet
//             </Button>
//         </div>
//     );
// };

// export default WalletConnector;

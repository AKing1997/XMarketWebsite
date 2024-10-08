import React, { useEffect, useState } from 'react';
import { tokenService } from "../services/tokenService";
import { useWalletContext } from "../components/context/WalletContext";
import { Box, Button, TextField, Typography, Paper, Snackbar, Alert } from "@mui/material";

export const RealEstateToken = () => {
  const { connected, address } = useWalletContext();

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [totalSupply, setTotalSupply] = useState('0');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [decimals, setDecimals] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  // Estado para Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const loadAccount = async () => {
      if (connected) {
        setAccount(address);
        await updateBalance(address);
        await updateTotalSupply();
        await updateTokenDetails();
      }
    };

    loadAccount();
  }, [connected, address]);

  const updateBalance = async (address) => {
    const balance = await tokenService.balanceOf(address);
    setBalance(balance.toString());
  };

  const updateTotalSupply = async () => {
    const supply = await tokenService.totalSupply();
    setTotalSupply(supply.toString());
  };

  const updateTokenDetails = async () => {
    const name = await tokenService.name();
    const symbol = await tokenService.symbol();
    const decimal = await tokenService.decimals();
    setTokenName(name);
    setTokenSymbol(symbol);
    setDecimals(decimal);
  };

  const handleTransfer = async () => {
    try {
      await tokenService.transfer(recipient, amount);
      setSnackbarMessage('Transfer successful');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      await updateBalance(account);
    } catch (error) {
      console.error('Transfer failed:', error);
      setSnackbarMessage('Transfer failed');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        {/* Información del Token */}
        <Typography variant="body1"><strong>Account:</strong> {account}</Typography>
        <Typography variant="body1"><strong>Balance:</strong> {balance}</Typography>
        <Typography variant="body1"><strong>Total Supply:</strong> {totalSupply}</Typography>
        <Typography variant="body1"><strong>Name:</strong> {tokenName}</Typography>
        <Typography variant="body1"><strong>Symbol:</strong> {tokenSymbol}</Typography>
        <Typography variant="body1"><strong>Decimals:</strong> {decimals}</Typography>
      </Paper>

      {/* Formulario de Transferencia */}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>Transfer Tokens</Typography>
        <TextField
          label="Recipient Address"
          variant="outlined"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleTransfer}
          fullWidth
        >
          Transfer
        </Button>
      </Paper>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RealEstateToken;
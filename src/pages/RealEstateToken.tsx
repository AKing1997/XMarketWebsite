import { useEffect, useState } from "react";
import { tokenService } from "../services/tokenService";
import { useWalletContext } from "../components/context/WalletContext";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

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
  }, [connected, address]); // Dependencias para volver a ejecutar el efecto al cambiar la dirección

  const updateBalance = async (address) => {
    const balance = await tokenService.balanceOf(address);
    setBalance(balance.toString()); // Convertir BigNumber a string
  };

  const updateTotalSupply = async () => {
    const supply = await tokenService.totalSupply();
    setTotalSupply(supply.toString()); // Convertir BigNumber a string
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
      alert('Transfer successful');
      await updateBalance(account); // Actualizar el balance después de la transferencia
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transfer failed');
    }
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
    </Box>
  );
};
import React, { useEffect, useState } from 'react';
import { realEstateAssetService } from '../services/realEstateAssetService';
import { useWalletContext } from '../components/context/WalletContext';
import { Box, Button, Typography, Paper, TextField, Grid, Snackbar, Alert } from '@mui/material';

const RealEstateAsset: React.FC = () => {
  const { connected, address } = useWalletContext();

  const [balance, setBalance] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [assetName, setAssetName] = useState<string>('');
  const [assetLocation, setAssetLocation] = useState<string>('');
  const [assetValue, setAssetValue] = useState<number>(0);

  // Estado para Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBalance = await realEstateAssetService.balanceOf(address);
        const fetchedTotalSupply = await realEstateAssetService.totalSupply();
        const fetchedName = await realEstateAssetService.name();
        const fetchedSymbol = await realEstateAssetService.symbol();

        setBalance(fetchedBalance.toNumber());
        setTotalSupply(fetchedTotalSupply.toNumber());
        setName(fetchedName);
        setSymbol(fetchedSymbol);
      } catch (err) {
        setError(err.message);
      }
    };

    if (connected && address) {
      fetchData();
    }
  }, [connected, address]);

  const handleCreateAsset = async () => {
    try {
      if (assetName && assetLocation && !isNaN(assetValue)) {
        await realEstateAssetService.createAsset(assetName, assetLocation, assetValue);
        setSnackbarMessage('Asset created successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        // Reset form values
        setAssetName('');
        setAssetLocation('');
        setAssetValue(0);
      } else {
        setSnackbarMessage('Please fill in all fields with valid data.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (err) {
      setError(err.message);
      setSnackbarMessage('Error creating asset.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Sección de Detalles del Activo */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
              {name} ({symbol})
            </Typography>
            <Typography variant="body1"><strong>Balance:</strong> {balance}</Typography>
            <Typography variant="body1"><strong>Total Supply:</strong> {totalSupply}</Typography>
            {error && <Typography color="error">{error}</Typography>}
          </Paper>
        </Grid>

        {/* Sección de Crear Activo */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Create Real Estate Asset
            </Typography>
            <TextField
              label="Asset Name"
              variant="outlined"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Asset Location"
              variant="outlined"
              value={assetLocation}
              onChange={(e) => setAssetLocation(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Asset Value"
              variant="outlined"
              type="number"
              value={assetValue}
              onChange={(e) => setAssetValue(Number(e.target.value))}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateAsset}
              fullWidth
            >
              Create Asset
            </Button>
          </Paper>
        </Grid>
      </Grid>

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

export default RealEstateAsset;
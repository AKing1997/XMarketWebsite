import React, { useEffect, useState } from "react";
import { marketService } from "../services/marketService";
import { useWalletContext } from "../components/context/WalletContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  TextField,
  Grid
} from "@mui/material";

const Market: React.FC = () => {
  const { connected, address } = useWalletContext(); // Contexto de la billetera
  const [listings, setListings] = useState([]);
  const [soldAssets, setSoldAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({ tokenId: "", price: "" });
  const [error, setError] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [tabValue, setTabValue] = useState(0); // Controla el Tab activo

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const fetchedListings = await marketService.getAllListings();
        setListings(fetchedListings);
      } catch (err: any) {
        setError(err.message);
      }
    };

    const fetchSoldAssets = async () => {
      try {
        const fetchedSoldAssets = await marketService.getAllSoldAssets();
        setSoldAssets(fetchedSoldAssets);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (connected) {
      fetchListings();
      fetchSoldAssets();
    }
  }, [connected]);

  const handleBuyAsset = async (index: number) => {
    try {
      await marketService.buyAsset(index);
      setSnackbarMessage("Asset bought successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      const fetchedListings = await marketService.getAllListings();
      setListings(fetchedListings);
    } catch (err: any) {
      setError(err.message);
      setSnackbarMessage("Failed to buy asset.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleListAsset = async () => {
    const { tokenId, price } = newAsset;
    if (!tokenId || !price) {
      setSnackbarMessage("Please fill in both fields.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      await marketService.listAsset(Number(tokenId), Number(price));
      setSnackbarMessage("Asset listed successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      const fetchedListings = await marketService.getAllListings();
      setListings(fetchedListings);
      setNewAsset({ tokenId: "", price: "" }); // Limpiar campos
    } catch (err: any) {
      setError(err.message);
      setSnackbarMessage("Failed to list asset.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Real Estate Market
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      {/* Tabs for different sections */}
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="market tabs">
        <Tab label="All Assets" />
        <Tab label="List Asset" />
        <Tab label="Sold Assets" />
      </Tabs>

      {/* Tab Panels */}
      {tabValue === 0 && (
        <Box mt={3}>
          <Grid container spacing={3}>
            {listings.map((listing: any, index) => (
              <Grid item xs={12} sm={6} key={index}> {/* Cambiado 'size' por 'item' y 'xs', 'sm' */}
                <Card>
                  <CardContent>
                    <Typography variant="h6">Token ID: {listing.tokenId}</Typography>
                    <Typography variant="body1">Seller: {listing.seller}</Typography>
                    <Typography variant="body1">Price: {listing.price} TRX</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleBuyAsset(index)}
                      sx={{ marginTop: 2 }}
                    >
                      Buy Asset
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {tabValue === 1 && (
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            List a New Asset
          </Typography>
          <TextField
            label="Token ID"
            value={newAsset.tokenId}
            onChange={(e) => setNewAsset({ ...newAsset, tokenId: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price (in TRX)"
            value={newAsset.price}
            onChange={(e) => setNewAsset({ ...newAsset, price: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleListAsset}
            sx={{ marginTop: 2 }}
          >
            List Asset
          </Button>
        </Box>
      )}

      {tabValue === 2 && (
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Sold Assets
          </Typography>
          <Grid container spacing={3}>
            {soldAssets.map((asset: any, index) => (
              <Grid item xs={12} sm={6} key={index}> {/* Cambiado 'size' por 'item' y 'xs', 'sm' */}
                <Card>
                  <CardContent>
                    <Typography variant="h6">Token ID: {asset.tokenId}</Typography>
                    <Typography variant="body1">Buyer: {asset.buyer}</Typography>
                    <Typography variant="body1">Price: {asset.price} TRX</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Market;
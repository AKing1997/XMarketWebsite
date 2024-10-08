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
  const [listings, setListings] = useState([]); // Lista de activos
  const [soldAssets, setSoldAssets] = useState([]); // Activos vendidos
  const [newAsset, setNewAsset] = useState({ tokenId: "", price: "" }); // Nuevo activo
  const [error, setError] = useState(""); // Mensaje de error
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensaje para Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success"); // Severidad del Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado del Snackbar
  const [tabValue, setTabValue] = useState(0); // Controla el Tab activo

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const fetchedListings = await marketService.getAllListings();
        // Convierte los campos BigNumber a números o cadenas
        setListings(fetchedListings.map(listing => ({
          ...listing,
          price: listing.price.toString(), // Convierte el precio a una cadena
          tokenId: listing.tokenId.toString(), // Convierte el tokenId a una cadena
        })));
      } catch (err: any) {
        setError(err.message);
      }
    };

    const fetchSoldAssets = async () => {
      try {
        const fetchedSoldAssets = await marketService.getAllSoldAssets();
        // Convierte los campos BigNumber a números o cadenas
        setSoldAssets(fetchedSoldAssets.map(asset => ({
          ...asset,
          price: asset.price.toString(), // Convierte el precio a una cadena
          tokenId: asset.tokenId.toString(), // Convierte el tokenId a una cadena
        })));
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
      // Convierte los campos BigNumber a números o cadenas
      setListings(fetchedListings.map(listing => ({
        ...listing,
        price: listing.price.toString(), // Convierte el precio a una cadena
        tokenId: listing.tokenId.toString(), // Convierte el tokenId a una cadena
      })));
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
      // Convierte los campos BigNumber a números o cadenas
      setListings(fetchedListings.map(listing => ({
        ...listing,
        price: listing.price.toString(), // Convierte el precio a una cadena
        tokenId: listing.tokenId.toString(), // Convierte el tokenId a una cadena
      })));
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
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Market
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Listings" />
        <Tab label="Sold Assets" />
        <Tab label="List Asset" />
      </Tabs>
      {tabValue === 0 && (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {listings.map((listing, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Token ID: {listing.tokenId}</Typography>
                  <Typography variant="body1">Seller: {listing.seller}</Typography>
                  <Typography variant="body1">Price: {listing.price}</Typography>
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
      )}
      {tabValue === 1 && (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {soldAssets.map((asset, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Token ID: {asset.tokenId}</Typography>
                  <Typography variant="body1">Buyer: {asset.buyer}</Typography>
                  <Typography variant="body1">Price: {asset.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {tabValue === 2 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">List Asset</Typography>
          <TextField
            label="Token ID"
            value={newAsset.tokenId}
            onChange={e => setNewAsset({ ...newAsset, tokenId: e.target.value })}
            sx={{ width: "100%", marginBottom: 2 }}
          />
          <TextField
            label="Price"
            value={newAsset.price}
            onChange={e => setNewAsset({ ...newAsset, price: e.target.value })}
            sx={{ width: "100%", marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleListAsset}>
            List Asset
          </Button>
        </Box>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Market;
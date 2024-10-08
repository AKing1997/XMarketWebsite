import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useWalletContext } from '../components/context/WalletContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Chip,
} from '@mui/material';
import { tokenService } from '../services/tokenService';
import { realEstateAssetService } from '../services/realEstateAssetService';
import { marketService } from '../services/marketService';
import { digitalIdentityService } from '../services/digitalIdentityService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const { connected, address } = useWalletContext();
  const [balance, setBalance] = useState<number | null>(null);
  const [nftCount, setNftCount] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [marketListings, setMarketListings] = useState<any[]>([]);
  const [soldAssets, setSoldAssets] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedBalance = await tokenService.balanceOf(address);
        const fetchedNftCount = await realEstateAssetService.balanceOf(address);
        const fetchedMarketListings = await marketService.getAllListings();
        const fetchedSoldAssets = await marketService.getAllSoldAssets();
        const fetchedIdentity = await digitalIdentityService.isVerified(address);

        setBalance(fetchedBalance / 1e18);
        setNftCount(fetchedNftCount.toNumber());
        setMarketListings(fetchedMarketListings);
        setSoldAssets(fetchedSoldAssets);
        setIsVerified(fetchedIdentity);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (connected && address) {
      fetchData();
    }

    return () => {
      setBalance(null);
      setNftCount(null);
      setIsVerified(null);
      setMarketListings([]);
      setSoldAssets([]);
      setError('');
    };
  }, [connected, address]);

  const data = {
    labels: ['Balance', 'NFT Count', 'Market Listings', 'Sold Assets'],
    datasets: [
      {
        label: 'User Data',
        data: [
          balance ?? 0,
          nftCount ?? 0,
          marketListings.length,
          soldAssets.length,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Chip
                  label={isVerified ? "Verified" : "Not Verified"}
                  color={isVerified ? "success" : "error"}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Balance: {(balance ?? 0).toFixed(2)} RET</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">NFT Count: {nftCount ?? 0}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Market Listings: {marketListings.length ?? 0}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Sold Assets: {soldAssets.length ?? 0}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5">Data Overview</Typography>
                <Bar data={data} options={{ responsive: true }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
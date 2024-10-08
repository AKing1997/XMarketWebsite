import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { realEstateAssetService } from '../services/realEstateAssetService';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const { connected, address } = useWalletContext();

  const [balance, setBalance] = useState<number>(0);
  const [nftCount, setNftCount] = useState<number>(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBalance = await realEstateAssetService.balanceOf(address);
        const fetchedNftCount = await realEstateAssetService.totalSupply();

        setBalance(fetchedBalance.toNumber());
        setNftCount(fetchedNftCount.toNumber());
      } catch (err) {
        setError(err.message);
      }
    };

    if (connected && address) {
      fetchData();
    }

    // Cleanup function to prevent memory leaks and canvas reuse
    return () => {
      setBalance(0);
      setNftCount(0);
      setError('');
    };
  }, [connected, address]);

  const data = {
    labels: ['Balance', 'NFT Count'],
    datasets: [
      {
        label: 'User Data',
        data: [balance, nftCount],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      },
    ],
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Bar data={data} />
      <p>Balance: {balance}</p>
      <p>NFT Count: {nftCount}</p>
    </div>
  );
};

export default Dashboard;

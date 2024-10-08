import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from 'react';
import { useWalletContext } from '../components/context/WalletContext';
import { digitalIdentityService } from '../services/digitalIdentityService';
import { Button, TextField, Snackbar, Alert, Typography, Chip, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function DigitalIdentity() {
  const [value, setValue] = React.useState('1');
  const [identifier, setIdentifier] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [owner, setOwner] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [unverifiedEntities, setUnverifiedEntities] = useState([]);
  const { address, connected } = useWalletContext();

  // Estado para Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleRequestVerification = async () => {
    if (!connected) {
      setSnackbarMessage('Please connect your wallet!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      await digitalIdentityService.requestVerification(identifier);
      setSnackbarMessage('Verification request sent!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error requesting verification:', error);
      setSnackbarMessage('Failed to request verification');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const checkVerificationStatus = async (address) => {
    try {
      const status = await digitalIdentityService.isVerified(address);
      setVerificationStatus(status);
      setIsVerified(status);
    } catch (error) {
      console.error('Error checking verification status:', error);
    }
  };

  const checkOwnerStatus = async () => {
    try {
      const currentOwner = await digitalIdentityService.owner();
      setOwner(currentOwner);
      const currentAddress = address || '';
      setIsOwner(currentAddress === currentOwner);

      if (currentAddress === currentOwner) {
        fetchUnverifiedEntities();
      }
    } catch (error) {
      console.error('Error fetching owner:', error);
    }
  };

  const fetchUnverifiedEntities = async () => {
    try {
      const contract = await digitalIdentityService.getContract();
      const entities = await contract.entities().call();
      const unverified = entities.filter((entity) => !entity.isVerified);
      setUnverifiedEntities(unverified);
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  };

  const handleVerifyEntity = async () => {
    if (!connected) {
      setSnackbarMessage('Please connect your wallet!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const result = await digitalIdentityService.verifyEntity(identifier);
      console.log('Entity verified:', result);
      setSnackbarMessage('Entity verified successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      fetchUnverifiedEntities();
    } catch (error) {
      console.error('Error verifying entity:', error);
      setSnackbarMessage('Failed to verify entity');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    checkVerificationStatus(address);
    if (identifier) {
      checkVerificationStatus(identifier);
    }
  }, [identifier]);

  useEffect(() => {
    checkOwnerStatus();
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}> 
      {verificationStatus !== null && (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Stack direction="row" spacing={1} sx={{ marginLeft: 2 }}>
            {isVerified ? (
              <Chip
                label="Verified"
                color="success"
                icon={<CheckCircleIcon />}
              />
            ) : (
              <Chip
                label="Not Verified"
                color="error"
                icon={<CancelIcon />}
              />
            )}
          </Stack>
        </Box>
      )}

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Request Digital Identity" value="1" />
            {isOwner && <Tab label="Verify Digital Identity" value="2" />}
            {isOwner && <Tab label="Unverified Entities" value="3" />} {/* Nuevo Tab */}
          </TabList>
        </Box>

        <TabPanel value="1">
          <TextField
            id="outlined-identifier"
            label="Identifier"
            variant="outlined"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRequestVerification}
            style={{ marginTop: '10px' }}
          >
            Request Verification
          </Button>
        </TabPanel>

        {isOwner && (
          <TabPanel value="2">
            <TextField
              id="outlined-identifier"
              label="Identifier"
              variant="outlined"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleVerifyEntity}
              style={{ marginTop: '10px' }}
            >
              Verify Identity
            </Button>
          </TabPanel>
        )}

        {isOwner && (
          <TabPanel value="3">
            <Typography variant="h6" gutterBottom>
              Unverified Entities
            </Typography>
            {unverifiedEntities.length === 0 ? (
              <Typography>No unverified entities found.</Typography>
            ) : (
              <ul>
                {unverifiedEntities.map((entity, index) => (
                  <li key={index}>{entity.identifier}</li>
                ))}
              </ul>
            )}
          </TabPanel>
        )}
      </TabContext>

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
}
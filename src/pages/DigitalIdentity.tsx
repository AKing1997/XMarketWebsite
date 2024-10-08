import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from 'react';
import { useWalletContext } from '../components/context/WalletContext';
import { digitalIdentityService } from '../services/digitalIdentityService';
import { Button, TextField } from '@mui/material';

export default function DigitalIdentity() {
  const [value, setValue] = React.useState('1');
  const [identifier, setIdentifier] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [owner, setOwner] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [unverifiedEntities, setUnverifiedEntities] = useState([]); // Lista de entidades no verificadas
  const { address, connected } = useWalletContext(); // Obtener el contexto de la billetera

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleRequestVerification = async () => {
    if (!connected) {
      alert('Please connect your wallet!');
      return;
    }

    try {
      await digitalIdentityService.requestVerification(identifier);
      alert('Verification request sent!');
    } catch (error) {
      console.error('Error requesting verification:', error);
      alert('Failed to request verification');
    }
  };

  const checkVerificationStatus = async () => {
    try {
      const status = await digitalIdentityService.isVerified(identifier);
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
      alert('Please connect your wallet!');
      return;
    }

    try {
      const result = await digitalIdentityService.verifyEntity(identifier);
      console.log('Entity verified:', result);
      alert('Entity verified successfully!');
      fetchUnverifiedEntities();
    } catch (error) {
      console.error('Error verifying entity:', error);
      alert('Failed to verify entity');
    }
  };

  useEffect(() => {
    if (identifier) {
      checkVerificationStatus();
    }
  }, [identifier]);

  useEffect(() => {
    checkOwnerStatus();
  }, []);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      {verificationStatus !== null && (
            <p>
              Verification status for {identifier}: {isVerified ? 'Verified' : 'Not Verified'}
            </p>
          )}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Request Digital Identity" value="1" />
            {isOwner && <Tab label="Verify Digital Identity" value="2" />}
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
        {isOwner && (<TabPanel value="2">
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
        </TabPanel>)}
      </TabContext>
    </Box>
  );
}
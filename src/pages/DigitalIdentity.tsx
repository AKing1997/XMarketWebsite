import React, { useEffect, useState } from 'react';
import { useWalletContext } from '../components/context/WalletContext';
import { digitalIdentityService } from '../services/digitalIdentityService';

export const DigitalIdentity = () => {
    const [identifier, setIdentifier] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [owner, setOwner] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const { address, connected } = useWalletContext(); // Obtener el contexto de la billetera

    const handleRequestVerification = async () => {
        if (!connected) {
            alert('Please connect your wallet!');
            return;
        }

        try {
            await digitalIdentityService.requestVerification(identifier); // Asegúrate de que requestVerification acepte el wallet
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
        } catch (error) {
            console.error('Error fetching owner:', error);
        }
    };

    // Nuevo método para verificar una entidad
    const handleVerifyEntity = async () => {
        if (!connected) {
            alert('Please connect your wallet!');
            return;
        }

        try {
            const result = await digitalIdentityService.verifyEntity(address);
            console.log('Entity verified:', result);
            alert('Entity verified successfully!');
            checkVerificationStatus(); // Actualiza el estado de verificación
        } catch (error) {
            console.error('Error verifying entity:', error);
            alert('Failed to verify entity');
        }
    };

    // Llama a checkVerificationStatus cuando el identificador cambia
    useEffect(() => {
        if (identifier) {
            checkVerificationStatus();
        }
    }, [identifier]);

    // Llama a checkOwnerStatus al montar el componente
    useEffect(() => {
        checkOwnerStatus();
    }, []);

    return (
        <div>
            <h1>Digital Identity</h1>
            <input
                type="text"
                placeholder="Enter identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
            />
            <button onClick={handleRequestVerification}>
                Request Verification
            </button>
            {verificationStatus !== null && (
                <p>
                    Verification status for {identifier}: {isVerified ? 'Verified' : 'Not Verified'}
                </p>
            )}
            {isOwner && isVerified && <p style={{ color: 'green' }}>Entity is verified!</p>}
            {isOwner && !isVerified && <p style={{ color: 'red' }}>Entity is not verified.</p>}

            {/* Botón para verificar la entidad */}
            <button onClick={handleVerifyEntity}>Verify Entity</button>
        </div>
    );
};
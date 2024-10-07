const contractAddress = 'TARU1xhmYe6YaEtEL6ePieQN1RHir64G4y';

const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "entity",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "identifier",
        "type": "string"
      }
    ],
    "name": "EntityVerified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "entities",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "identifier",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "entityAddress",
        "type": "address"
      }
    ],
    "name": "isVerified",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "identifier",
        "type": "string"
      }
    ],
    "name": "requestVerification",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "entityAddress",
        "type": "address"
      }
    ],
    "name": "verifyEntity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const digitalIdentityService = {
  getContract: async () => {
    const tronWeb: any = window.tronWeb;
    if (!tronWeb) {
      throw new Error('TronLink wallet is not connected. Please install or unlock TronLink.');
    }
  
    // Retornar el contrato
    return await tronWeb.contract(contractABI, contractAddress);
  },

  requestVerification: async (identifier) => {
    const contract = await digitalIdentityService.getContract();
    return await contract.requestVerification(identifier).send();
  },
  
  isVerified: async (address) => {
    const contract = await digitalIdentityService.getContract();
    return await contract.isVerified(address).call();
  },

  verifyEntity: async (entityAddress: string) => {
    try {
      const contract = await digitalIdentityService.getContract();
      const tx = await contract.verifyEntity(entityAddress).send();
      return tx;
    } catch (error) {
      console.error('Error verifying entity:', error);
      throw error;
    }
  },

  owner: async () => {
    const contract = await digitalIdentityService.getContract();
    return await contract.owner().call();
  }
};
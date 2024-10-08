import DigitalIdentityJson from './../contracts/DigitalIdentity.json';
const contractAddress = 'TLMsMxLtt3wrarUs9JHbSC7oNpdb4FdAGJ';

export const digitalIdentityService = {
  getContract: async () => {
    const tronWeb: any = window.tronWeb;
    if (!tronWeb) {
      throw new Error('TronLink wallet is not connected. Please install or unlock TronLink.');
    }
  
    return await tronWeb.contract(DigitalIdentityJson.abi, contractAddress);
  },

  requestVerification: async (identifier) => {
    const contract = await digitalIdentityService.getContract();
    return await contract.requestVerification(identifier).send();
  },

  isVerified: async (address) => {
    const contract = await digitalIdentityService.getContract();
    return await contract.isVerified(address).call();
  },

  verifyEntity: async (entityAddress) => {
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
  },

  changeEntity: async (newIdentifier) => {
    const contract = await digitalIdentityService.getContract();
    return await contract.changeEntity(newIdentifier).send();
  },

  removeEntity: async () => {
    const contract = await digitalIdentityService.getContract();
    return await contract.removeEntity().send();
  },
};
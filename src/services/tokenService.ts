import TokenJson from './../contracts/RealEstateToken.json';
const contractAddress = 'TCfs2yAR2U1yjK8TyH49zjzWkpGumMSqFr';

export const tokenService = {
  getContract: async () => {
    const tronWeb: any = window.tronWeb;
    if (!tronWeb) {
      throw new Error('TronLink wallet is not connected. Please install or unlock TronLink.');
    }
    
    return await tronWeb.contract(TokenJson.abi, contractAddress);
  },

  balanceOf: async (address) => {
    const contract = await tokenService.getContract();
    return await contract.balanceOf(address).call();
  },

  totalSupply: async () => {
    const contract = await tokenService.getContract();
    return await contract.totalSupply().call();
  },

  transfer: async (recipient, amount) => {
    const contract = await tokenService.getContract();
    return await contract.transfer(recipient, amount).send();
  },

  transferFrom: async (from, to, amount) => {
    const contract = await tokenService.getContract();
    return await contract.transferFrom(from, to, amount).send();
  },

  approve: async (spender, amount) => {
    const contract = await tokenService.getContract();
    return await contract.approve(spender, amount).send();
  },

  allowance: async (owner, spender) => {
    const contract = await tokenService.getContract();
    return await contract.allowance(owner, spender).call();
  },

  decimals: async () => {
    const contract = await tokenService.getContract();
    return await contract.decimals().call();
  },

  name: async () => {
    const contract = await tokenService.getContract();
    return await contract.name().call();
  },

  symbol: async () => {
    const contract = await tokenService.getContract();
    return await contract.symbol().call();
  },

  owner: async () => {
    const contract = await tokenService.getContract();
    return await contract.owner().call();
  },

  transferOwnership: async (newOwner) => {
    const contract = await tokenService.getContract();
    return await contract.transferOwnership(newOwner).send();
  },

  renounceOwnership: async () => {
    const contract = await tokenService.getContract();
    return await contract.renounceOwnership().send();
  },
};
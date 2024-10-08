import RealEstateAssetJson from './../contracts/RealEstateAsset.json';

const contractAddress = 'TNPFgBB2hBXHZPbJvh9uUmqciZuEtrPtTM';
export const realEstateAssetService = {
  getContract: async () => {
    const tronWeb: any = window.tronWeb;
    if (!tronWeb) {
      throw new Error('TronLink wallet is not connected. Please install or unlock TronLink.');
    }

    return await tronWeb.contract(RealEstateAssetJson.abi, contractAddress);
  },

  balanceOf: async (address: string) => {
    const contract = await realEstateAssetService.getContract();
    return await contract.balanceOf(address).call();
  },

  totalSupply: async () => {
    const contract = await realEstateAssetService.getContract();
    return await contract.nextTokenId().call(); // Suponiendo que nextTokenId() devuelve el total de tokens
  },

  createAsset: async (name: string, location: string, value: number) => {
    const contract = await realEstateAssetService.getContract();
    return await contract.createAsset(name, location, value).send();
  },

  safeTransferFrom: async (from: string, to: string, tokenId: number) => {
    const contract = await realEstateAssetService.getContract();
    return await contract.safeTransferFrom(from, to, tokenId).send();
  },

  getAssets: async (tokenId: number) => {
    const contract = await realEstateAssetService.getContract();
    const asset = await contract.assets(tokenId).call();
    return {
      name: asset.name,
      location: asset.location,
      value: asset.value.toNumber(),
    };
  },

  name: async () => {
    const contract = await realEstateAssetService.getContract();
    return await contract.name().call();
  },

  symbol: async () => {
    const contract = await realEstateAssetService.getContract();
    return await contract.symbol().call();
  },
};
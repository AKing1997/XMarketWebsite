import { tronWeb } from '../tronweb';
const CONTRACT_ADDRESSES = {
  Migrations: 'TDoxmTzZZts9tuRQ9nTjxdNYAcPH368RHA',
  DigitalIdentity: 'TARU1xhmYe6YaEtEL6ePieQN1RHir64G4y',
  RealEstateToken: 'THVysASgtBi78LEiFKefCZrWyD9eF1fyeH',
  RealEstateAsset: 'TXDqbGMwwfvb5iwhrXvGjQwpaCcRGXnXNw',
  Market: 'TYyptmmn7fP8FkAmPT9QzLTjFTf3pxrbaq',
};

export const contractService = {
  async getContract(contractName) {
    return await tronWeb.contract().at(CONTRACT_ADDRESSES[contractName]);
  },

  async requestVerification(identifier) {
    const contract = await this.getContract('DigitalIdentity');
    return await contract.requestVerification(identifier).send();
  },

  async verifyEntity(entityAddress) {
    const contract = await this.getContract('DigitalIdentity');
    return await contract.verifyEntity(entityAddress).send();
  },

  async isVerified(entityAddress) {
    const contract = await this.getContract('DigitalIdentity');
    return await contract.isVerified(entityAddress).call();
  },

  async transferOwnership(newOwner) {
    const contract = await this.getContract('DigitalIdentity');
    return await contract.transferOwnership(newOwner).send();
  },

  async getOwner() {
    const contract = await this.getContract('DigitalIdentity');
    return await contract.owner().call();
  },

  // Funciones para RealEstateToken
  async createRealEstateToken(name, symbol) {
    const contract = await this.getContract('RealEstateToken');
    return await contract.createToken(name, symbol).send();
  },

  async mintRealEstateToken(to, amount) {
    const contract = await this.getContract('RealEstateToken');
    return await contract.mint(to, amount).send();
  },

  async getRealEstateTokenDetails(tokenId) {
    const contract = await this.getContract('RealEstateToken');
    return await contract.getTokenDetails(tokenId).call();
  },

  // Funciones para RealEstateAsset
  async createRealEstateAsset(tokenId, propertyDetails) {
    const contract = await this.getContract('RealEstateAsset');
    return await contract.createAsset(tokenId, propertyDetails).send();
  },

  async getRealEstateAsset(assetId) {
    const contract = await this.getContract('RealEstateAsset');
    return await contract.getAsset(assetId).call();
  },

  // Funciones para Market
  async listAssetForSale(assetId, price) {
    const contract = await this.getContract('Market');
    return await contract.listForSale(assetId, price).send();
  },

  async buyAsset(assetId) {
    const contract = await this.getContract('Market');
    return await contract.buyAsset(assetId).send();
  },

  async getMarketAssets() {
    const contract = await this.getContract('Market');
    return await contract.getAssets().call();
  },
};
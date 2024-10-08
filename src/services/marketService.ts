  import MarketJson from './../contracts/Market.json'; // ABI del contrato

  const contractAddress = 'TBPLWiaL3eyZS2v6rpdpTTij3ftffKMS1E'; // Dirección del contrato de mercado

  export const marketService = {
    // Obtener contrato del mercado
    getContract: async () => {
      const tronWeb: any = window.tronWeb;
      if (!tronWeb) {
        throw new Error('TronLink wallet is not connected. Please install or unlock TronLink.');
      }
      return await tronWeb.contract(MarketJson.abi, contractAddress);
    },

    // Obtener todos los listados del mercado
    getAllListings: async () => {
      const contract = await marketService.getContract();
      return await contract.getAllListings().call();
    },

    // Comprar un activo del mercado por índice de listado
    buyAsset: async (listingIndex: number) => {
      const contract = await marketService.getContract();
      return await contract.buyAsset(listingIndex).send();
    },

    // Listar un nuevo activo en el mercado
    listAsset: async (tokenId: number, price: number) => {
      const contract = await marketService.getContract();
      return await contract.listAsset(tokenId, price).send();
    },

    // Eliminar un listado del mercado
    removeListing: async (index: number) => {
      const contract = await marketService.getContract();
      return await contract.removeListing(index).send();
    },

    // Obtener un listado por su ID
    getListingById: async (index: number) => {
      const contract = await marketService.getContract();
      return await contract.getListingById(index).call();
    },

    // Obtener todos los activos vendidos
    getAllSoldAssets: async () => {
      const contract = await marketService.getContract();
      return await contract.getAllSoldAssets().call();
    },
  };

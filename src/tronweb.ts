import TronWeb from 'tronweb';
const apiKey = 'f6cd09b8-29b1-4012-9d40-88bd40635401';
export const tronWeb: any = new TronWeb({
  fullHost: 'https://api.shasta.trongrid.io',
  headers: { 'TRON-PRO-API-KEY': apiKey }
});
(window as any).tronWeb1 = tronWeb;

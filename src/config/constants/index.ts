import store from 'store/configureStore';

export function getProduction() {
  return store.store.getState().user.isMainnet;
}
store.store.subscribe(getProduction);

export const getCeloConfigMetamask = (isMainnet: boolean) => [{
  chainId: isMainnet ? '0xA4EC' : '0xAEF3',
  chainName: isMainnet ? 'Celo Mainnet' : 'Alfajores Testnet',
  nativeCurrency: {
    name: 'Celo',
    symbol: 'Celo',
    decimals: 18,
  },
  rpcUrls: isMainnet ? ['https://forno.celo.org'] : ['https://alfajores-forno.celo-testnet.org'],
  blockExplorerUrls: isMainnet ? ['https://explorer.celo.org'] : ['https://alfajores-blockscout.celo-testnet.org'],
}];

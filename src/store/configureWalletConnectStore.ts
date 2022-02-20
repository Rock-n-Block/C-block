import { chainsProxy, contractsProxy } from 'config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getProduction(store: any) {
  contractsProxy.type = store.getState().user.isMainnet ? 'mainnet' : 'testnet';
  chainsProxy['Trust'].chainId = store.getState().user.isMainnet ? 1 : 0;
  chainsProxy['Celo-Chain'].chainId = store.getState().user.isMainnet ? 42220 : 44787;
  chainsProxy['Celo-Chain'].provider.WalletConnect.provider.rpc.rpc = store.getState().user.isMainnet
    ? { 42220: 'https://forno.celo.org/' }
    : { 44787: 'https://alfajores-forno.celo-testnet.org/' };
  chainsProxy['Celo-Chain'].provider.WalletConnect.provider.rpc.chainId = store.getState().user.isMainnet
    ? 42220 : 44787;
  return store.getState().user.isMainnet;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initWalletConnectStore = (store: any) => {
  store.subscribe(() => getProduction(store));
};

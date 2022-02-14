import {
  localStorageKeys,
  Network,
  NetworkNames,
  WalletTypes,
} from '@celo-tools/use-contractkit';
import {
  CeloContract,
  CeloTokenContract, ContractKit, newKit, newKitFromWeb3,
} from '@celo/contractkit';

type Web3Type = Parameters<typeof newKitFromWeb3>[0];

export class CeloExtensionWalletConnector {
  public initialised = false;
  public type = WalletTypes.CeloExtensionWallet;
  public kit: ContractKit;
  public account: string | null = null;

  constructor(network: Network, public feeCurrency: CeloTokenContract) {
    localStorage.setItem(
      localStorageKeys.lastUsedWalletType,
      WalletTypes.CeloExtensionWallet,
    );
    localStorage.setItem(
      localStorageKeys.lastUsedWalletArguments,
      JSON.stringify([feeCurrency]),
    );
    localStorage.setItem(localStorageKeys.lastUsedNetwork, network.name);
    this.kit = newKit(network.rpcUrl);
  }

  async initialise(): Promise<this> {
    const { default: Web3 } = await import('web3');

    const { celo } = window;
    if (!celo) {
      throw new Error('Celo Extension Wallet not installed');
    }
    const web3 = new Web3(celo);
    await celo.enable();

    (
      web3.currentProvider as unknown as {
        publicConfigStore: {
          on: (
            event: string,
            cb: (args: { networkVersion: number }) => void
          ) => void;
        };
      }
    ).publicConfigStore.on('update', ({ networkVersion }) => {
      // TODO: update later
      console.log(networkVersion);
    });

    this.kit = newKitFromWeb3(web3 as unknown as Web3Type);
    const [defaultAccount] = await this.kit.web3.eth.getAccounts();
    this.kit.defaultAccount = defaultAccount;
    this.account = defaultAccount ?? null;

    await this.updateFeeCurrency(this.feeCurrency);
    this.initialised = true;

    return this;
  }
  async updateFeeCurrency(feeContract: CeloTokenContract): Promise<void> {
    this.feeCurrency = feeContract;
    await this.kit.setFeeCurrency(this.feeCurrency);
  }
}
// TODO update to init for main/test net
export const initializeKit = async () => {
  const kit = new CeloExtensionWalletConnector({
    name: NetworkNames.Alfajores,
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    graphQl: '',
    explorer: '',
    chainId: 44787,
  }, CeloContract.StableToken);

  const initializedKit = await kit.initialise();

  return initializedKit;
};

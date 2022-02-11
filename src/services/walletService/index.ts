/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConnectWallet } from '@amfi/connect-wallet';
import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';

import {
  connectWallet as connectWalletConfig,
} from 'config';
import { WalletProviders } from 'types';

export class WalletService {
  public connectWallet: ConnectWallet;

  public walletAddress = '';

  constructor() {
    this.connectWallet = new ConnectWallet();
  }

  public async initWalletConnect(
    chainName: string,
    providerName: WalletProviders,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const { provider, network, settings } = connectWalletConfig(chainName);

      const connecting = this.connectWallet
        .connect(provider[providerName], network, settings)
        .then((connected: boolean | {}) => connected)
        .catch((err: any) => {
          console.error('initWalletConnect providerWallet err: ', err);
        });

      Promise.all([connecting]).then((connect: any) => {
        resolve(connect[0]);
      });
    });
  }

  public logOut(): void {
    this.connectWallet.resetConect();
  }

  public Web3() {
    return this.connectWallet.currentWeb3();
  }

  public setAccountAddress(address: string) {
    this.walletAddress = address;
  }

  public getAccount(): Promise<IConnect | IError | { address: string; }> {
    return this.connectWallet.getAccounts();
  }

  static getMethodInterface(abi: Array<any>, methodName: string) {
    return abi.filter((m) => m.name === methodName)[0];
  }

  encodeFunctionCall(abi: any, data: Array<any>) {
    return this.Web3().eth.abi.encodeFunctionCall(abi, data);
  }

  async createTransaction({
    method,
    data,
    contractAddress,
    contractAbi,
    from,
    value,
  }: {
    method: string;
    data: Array<any>;
    contractAddress: string,
    contractAbi: any,
    to?: string;
    value?: any;
    from: string
  }) {
    const transactionMethod = WalletService.getMethodInterface(
      contractAbi,
      method,
    );

    let signature;
    if (transactionMethod) {
      signature = this.encodeFunctionCall(transactionMethod, data);
    }

    return this.sendTransaction({
      from,
      to: contractAddress,
      data: signature || '',
      value: value || '',
    });
  }

  sendTransaction(transactionConfig: any) {
    return this.Web3().eth.sendTransaction({
      ...transactionConfig,
      from: transactionConfig.from,
    });
  }
}

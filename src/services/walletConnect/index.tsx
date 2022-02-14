/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react';

import { getCeloConfigMetamask, getProduction } from 'config';

import { State, UserState, WalletProviders } from 'types';
import { connectWalletState, disconnectWalletState } from 'store/user/reducer';
import { connect } from 'react-redux';
import { WalletService } from '..';

declare global {
  interface Window {
    ethereum: any;
  }
}

const walletConnectorContext = createContext<{
  connect:(provider: WalletProviders) => void;
  disconnect: () => void;
  walletService: WalletService;
  address: string;
  isContractsExists: boolean;
}>({
      connect: (): void => {},
      disconnect: (): void => {},
      walletService: new WalletService(),
      address: '',
      isContractsExists: false,
    });

class Connector extends React.Component<
any,
{
  provider: WalletService;
  address: string;
  isContractsExists: boolean;
}
> {
  constructor(props: any) {
    super(props);

    this.state = {
      provider: new WalletService(),
      address: '',
      isContractsExists: false,
    };

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  componentDidMount() {
    this.state.provider.connectWallet.initWeb3(
      getProduction()
        ? 'https://forno.celo.org/'
        : 'https://alfajores-forno.celo-testnet.org/',
    );

    if (localStorage.walletconnect) {
      console.log('here');
      this.connect(WalletProviders.walletConnect);
    }
  }

  connect = async (provider: WalletProviders) => {
    if (provider === 'MetaMask' && window?.ethereum) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: getCeloConfigMetamask(this.props.isMainnet),
      });
    }
    if (provider !== 'Celo') {
      try {
        const isConnected = await this.state.provider.initWalletConnect(
          'Celo-Chain',
          provider,
        );
        if (isConnected) {
          const userAccount = await this.state.provider.getAccount();
          this.props.connectWallet({
            // @ts-expect-error: wrong lib types
            address: userAccount?.address,
            wallet: provider,
          });
        }
      } catch (err) {
        console.log(err);
        this.disconnect();
      }
    } else if (window.celo) {
      await window.celo.enable;
      this.props.connectWallet({
        address: window.celo.selectedAddress,
        wallet: 'celo',
      });
    }
  };

  disconnect() {
    delete localStorage.walletconnect;
    this.setState({
      address: '',
    });
  }

  render() {
    return (
      <walletConnectorContext.Provider
        value={{
          walletService: this.state.provider,
          connect: this.connect,
          disconnect: this.disconnect,
          address: this.state.address,
          isContractsExists: this.state.isContractsExists,
        }}
      >
        {this.props.children}
      </walletConnectorContext.Provider>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  connectWallet: (payload: UserState) => dispatch(connectWalletState(payload)),
  disconnectWallet: () => dispatch(disconnectWalletState()),
});

const mapStateToProps = (state: State) => ({
  isMainnet: state.user.isMainnet,
});

export default connect(mapStateToProps, mapDispatchToProps)(Connector);

export function useWalletConnectorContext() {
  return useContext(walletConnectorContext);
}

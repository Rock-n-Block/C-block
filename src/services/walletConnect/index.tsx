/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react';
import { connect } from 'react-redux';

import { getCeloConfigMetamask } from 'config';
import {
  State, UserState, WalletProviders, TNullable,
} from 'types';
import { connectWalletState, disconnectWalletState } from 'store/user/reducer';

import { setNotification } from 'utils';
import { getProduction } from 'store/configureStore';
import { WalletService } from '../walletService';

declare global {
  interface Window {
    ethereum: any;
  }
}

type IWalletConnectorContext = TNullable<{
  connect:(provider: WalletProviders) => void;
  disconnect: () => void;
  walletService: WalletService;
  address: string;
  isContractsExists: boolean;
}>;

const walletConnectorContext = createContext<IWalletConnectorContext>(null);

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
    if (provider !== WalletProviders.celo) {
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

        return;
      } catch (err) {
        console.log(err);
        this.disconnect();
        setNotification({
          type: 'error',
          message: `${provider} is not installed or unlocked`,
        });
      }
    }

    if (window.celo) {
      await window.celo.enable();

      this.props.connectWallet({
        address: window.celo.selectedAddress,
        wallet: WalletProviders.celo,
      });
    } else {
      setNotification({
        type: 'error',
        message: 'Celo extension wallet is not installed or unlocked',
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

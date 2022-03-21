/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { IEvent, IEventError } from '@amfi/connect-wallet/dist/interface';

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
    celo: any;
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

interface OwnProps {}
interface ConnectedProps {
  isMainnet: boolean;
}
interface DispatchProps {
  connectWallet: (payload: Partial<UserState>) => void;
  disconnectWallet: () => void;
}

type TConnectorProps = OwnProps & ConnectedProps & DispatchProps;
type TConnectorState = {
  provider: WalletService;
  address: string;
  isContractsExists: boolean;
};

class Connector extends React.Component<TConnectorProps, TConnectorState> {
  constructor(props: TConnectorProps) {
    super(props);

    this.state = {
      provider: new WalletService(),
      address: '',
      isContractsExists: false,
    };
  }

  componentDidMount() {
    this.state.provider.connectWallet.initWeb3(
      getProduction()
        ? 'https://forno.celo.org/'
        : 'https://alfajores-forno.celo-testnet.org/',
    );

    if (localStorage.walletconnect) {
      this.connect(WalletProviders.walletConnect);
    }
  }

  connect = async (provider: WalletProviders) => {
    if (provider === 'MetaMask' && window.ethereum) {
      // @see https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
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
      } catch (err) {
        console.log(err);
        this.disconnect();
        setNotification({
          type: 'error',
          message: `${provider} is not installed or unlocked`,
        });
      }

      const eventSubs = this.state.provider.connectWallet.eventSubscriber().subscribe(
        (res: IEvent) => {
          if (res.name === 'accountsChanged') {
            this.props.connectWallet({
              address: res.address,
              wallet: provider,
            });
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (err: IEventError) => {
          eventSubs.unsubscribe();
          this.disconnect();
        },
      );
      return;
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

  disconnect = () => {
    delete localStorage.walletconnect;
    this.setState({
      address: '',
    });
    this.props.disconnectWallet();
  };

  render() {
    return (
      <walletConnectorContext.Provider
        value={{
          walletService: this.state.provider,
          address: this.state.address,
          isContractsExists: this.state.isContractsExists,
          connect: this.connect,
          disconnect: this.disconnect,
        }}
      >
        {this.props.children}
      </walletConnectorContext.Provider>
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch: any) => ({
  connectWallet: (payload: UserState) => dispatch(connectWalletState(payload)),
  disconnectWallet: () => dispatch(disconnectWalletState()),
});

const mapStateToProps: MapStateToProps<ConnectedProps, OwnProps> = (state: State) => ({
  isMainnet: state.user.isMainnet,
});

export default connect(mapStateToProps, mapDispatchToProps)(Connector);

export function useWalletConnectorContext() {
  return useContext(walletConnectorContext);
}

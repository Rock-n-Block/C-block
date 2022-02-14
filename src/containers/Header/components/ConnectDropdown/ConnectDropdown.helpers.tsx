import { celoIcon, metamaskIcon, walletConnectIcon } from 'assets/img';
import { WalletProviders } from 'types';

export const connectDropdownData = [
  {
    label: 'WalletConnect',
    connectorWallet: WalletProviders.walletConnect,
    walletIcon: walletConnectIcon,
  },
  {
    label: 'Celo Wallet',
    connectorWallet: WalletProviders.celo,
    walletIcon: celoIcon,
  },
  {
    label: 'Metamask',
    connectorWallet: WalletProviders.metamask,
    walletIcon: metamaskIcon,
  },
];

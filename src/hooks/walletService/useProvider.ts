import { useCallback } from 'react';
import Web3 from 'web3';

import { useShallowSelector } from 'hooks';
import { State, UserState, WalletProviders } from 'types';
import { useWalletConnectorContext } from 'services';
import user from 'store/user/selectors';

export const useProvider = () => {
  const { walletService } = useWalletConnectorContext();
  const { wallet } = useShallowSelector<State, UserState>(user.getUser);
  const getDefaultProvider = useCallback(
    () => (wallet === WalletProviders.celo
      ? new Web3(window.celo)
      : walletService.Web3()),
    [wallet, walletService],
  );
  return { getDefaultProvider };
};

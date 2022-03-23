import { useCallback } from 'react';

import { useWalletConnectorContext } from 'services';
import { contractsHelper } from 'utils';

export const useMyLostKeyContract = () => {
  const { walletService } = useWalletConnectorContext();

  const fetchActiveStatusConfirmData = useCallback((contractAddress: string) => {
    const web3 = walletService.Web3();
    const contract = contractsHelper.getLostKeyContract(web3, contractAddress);
    try {
      return Promise.all(
        [
          'CONFIRMATION_PERIOD' as const,
          'lastRecordedTime' as const,
        ].map((methodName) => contract.methods[methodName]().call()),
      );
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }, [walletService]);

  return {
    fetchActiveStatusConfirmData,
  };
};

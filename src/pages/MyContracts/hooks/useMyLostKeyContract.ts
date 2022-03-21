import { useCallback } from 'react';

import { useWalletConnectorContext } from 'services';
import useShallowSelector from 'hooks/useShallowSelector';
import userSelector from 'store/user/selectors';
import { contractsHelper } from 'utils';

export const useMyLostKeyContract = (
  onSuccessTx: () => void, onErrorTx: () => void, onFinishTx: () => void,
) => {
  const { walletService } = useWalletConnectorContext();
  const { address: userWalletAddress } = useShallowSelector(userSelector.getUser);

  const handleConfirmActiveStatus = useCallback(async (contractAddress: string) => {
    const web3 = walletService.Web3();
    const contract = contractsHelper.getLostKeyContract(web3, contractAddress);
    try {
      await contract.methods.confirm().send({
        from: userWalletAddress,
      });
      onSuccessTx();
    } catch (err) {
      console.log(err);
      onErrorTx();
    } finally {
      onFinishTx();
    }
  }, [onFinishTx, onErrorTx, onSuccessTx, userWalletAddress, walletService]);

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
    handleConfirmActiveStatus,
    fetchActiveStatusConfirmData,
  };
};

import { useCallback } from 'react';

import { useWalletConnectorContext } from 'services';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { TOKEN_ADDRESSES_MAX_COUNT } from 'appConstants';
import { ISetUpModalTokenAddress } from 'components/SetUpModal/SetUpModal.helpers';
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

  const fetchSetUpModalTokenAddresses = useCallback(async (contractAddress: string) => {
    const web3 = walletService.Web3();
    const contract = contractsHelper.getLostKeyContract(web3, contractAddress);

    const tokensAddressesPromises = new Array(TOKEN_ADDRESSES_MAX_COUNT)
      .fill('')
      .map((_, index) => contract.methods.tokensToSend(index).call());
    try {
      const settledTokensAddresses = await Promise.allSettled(
        tokensAddressesPromises,
      );
      const tokensAddresses = settledTokensAddresses
        .filter(({ status }) => status === 'fulfilled')
        .map((item) => item.status === 'fulfilled' && item.value);

      const allowances = await Promise.all(
        tokensAddresses.map((address) => {
          const contract = contractsHelper.getBep20Contract(web3, address);
          return contract.methods.allowance(userWalletAddress, contractAddress).call();
        }),
      );

      return tokensAddresses.map((address, index) => ({
        address,
        allowance: allowances[index],
      } as ISetUpModalTokenAddress));
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }, [userWalletAddress, walletService]);

  const handleAddTokens = useCallback(
    async (contractAddress: string, tokensAddresses: string[]) => {
      const web3 = walletService.Web3();
      const contract = contractsHelper.getLostKeyContract(web3, contractAddress);
      console.log('handleAddTokens', tokensAddresses);
      try {
        await contract.methods.addToken(tokensAddresses).send({
          from: userWalletAddress,
        });
        onSuccessTx();
      } catch (err) {
        console.log(err);
        onErrorTx();
      } finally {
        onFinishTx();
      }
    },
    [onErrorTx, onFinishTx, onSuccessTx, userWalletAddress, walletService],
  );

  return {
    handleConfirmActiveStatus,
    fetchActiveStatusConfirmData,

    handleAddTokens,
    fetchSetUpModalTokenAddresses,
  };
};

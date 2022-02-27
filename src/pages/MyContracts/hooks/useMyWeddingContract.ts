import { useCallback } from 'react';

import { useWalletConnectorContext } from 'services';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { IGetFundsModalTokenAddressField } from 'components/GetFundsModal/GetFundsModal.helpers';
import { weddingAbi } from 'config/abi';

export const useMyWeddingContract = (
  onSuccessTx: () => void, onErrorTx: () => void, onFinishTx: () => void,
) => {
  const { walletService } = useWalletConnectorContext();
  const { address: userWalletAddress } = useShallowSelector(userSelector.getUser);

  const handleGetFundsAfterDivorce = useCallback(
    async (contractAddress: string, tokensAddresses: IGetFundsModalTokenAddressField[]) => {
      const web3 = walletService.Web3();
      const contract = new web3.eth.Contract(weddingAbi, contractAddress);
      try {
        await contract.methods.getFundsAfterDivorce(
          tokensAddresses.map(({ address }) => address),
        ).send({
          from: userWalletAddress,
        });
        onSuccessTx();
      } catch (err) {
        console.log(err);
        onErrorTx();
      } finally {
        onFinishTx();
      }
    }, [onErrorTx, onFinishTx, onSuccessTx, userWalletAddress, walletService],
  );

  return {
    handleGetFundsAfterDivorce,
  };
};

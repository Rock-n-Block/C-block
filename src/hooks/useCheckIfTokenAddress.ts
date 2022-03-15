import { useCallback } from 'react';

import { bep20Abi } from 'config/abi';
import { useWalletConnectorContext } from 'services';

export const useCheckIfTokenAddress = () => {
  const { walletService } = useWalletConnectorContext();

  const checkIfTokenAddress = useCallback(
    async (contractAddress: string) => {
      try {
        const contract = walletService.connectWallet.getContract({
          abi: bep20Abi,
          address: contractAddress,
        });
        await contract.methods.decimals().call();
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    [walletService.connectWallet],
  );
  return {
    checkIfTokenAddress,
  };
};

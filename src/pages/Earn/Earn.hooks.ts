import { useCallback, useMemo } from 'react';

import { useShallowSelector } from 'hooks';
import userSelectors from 'store/user/selectors';
import earnSelectors from 'store/earn/selectors';
import { contractsHelper, getTokenAmountDisplay } from 'utils';
import { TFinishedContract } from 'types';

export const useEarnData = () => {
  const { isMainnet } = useShallowSelector(userSelectors.getUser);
  const finishedContracts = useShallowSelector(earnSelectors.getAllFinishedContracts);

  const hasTableData = useMemo(() => !!finishedContracts.length, [finishedContracts.length]);

  const getRowItemData = useCallback(
    (item: TFinishedContract) => {
      const { rewardAmount } = item;
      const celoDecimals = contractsHelper.getChainNativeCurrency(isMainnet).decimals;
      const deserializedRewardAmount = getTokenAmountDisplay(rewardAmount, celoDecimals);

      return {
        deserializedRewardAmount,
      };
    },
    [isMainnet],
  );

  const handleTransfer = useCallback((item: TFinishedContract) => {
    console.log(item);
  }, []);

  return {
    finishedContracts,
    hasTableData,
    getRowItemData,
    handleTransfer,
  };
};

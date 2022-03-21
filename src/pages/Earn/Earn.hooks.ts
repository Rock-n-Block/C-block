import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useShallowSelector, useWeb3Provider } from 'hooks';
import userSelectors from 'store/user/selectors';
import earnSelectors from 'store/earn/selectors';
import earnActions from 'store/earn/actions';
import earnActionTypes from 'store/earn/actionTypes';
import uiSelector from 'store/ui/selectors';
import { contractsHelper, getTokenAmountDisplay } from 'utils';
import { RequestStatus, TFinishedContract } from 'types';

export const useEarnData = () => {
  const dispatch = useDispatch();
  const { getDefaultProvider } = useWeb3Provider();

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
    dispatch(earnActions.transferReward({
      provider: getDefaultProvider(),
      contractAddress: item.address,
    }));
  }, [dispatch, getDefaultProvider]);

  const getFinishedContracts = useCallback(() => {
    dispatch(earnActions.getFinishedContracts({
      provider: getDefaultProvider(),
    }));
  }, [dispatch, getDefaultProvider]);

  const getFinishedContractsRequestStatus = useShallowSelector(
    uiSelector.getProp(earnActionTypes.GET_FINISHED_CONTRACTS),
  );
  const isGetFinishedContractsLoading = useMemo(
    () => getFinishedContractsRequestStatus === RequestStatus.REQUEST,
    [getFinishedContractsRequestStatus],
  );

  return {
    finishedContracts,
    isGetFinishedContractsLoading,
    hasTableData,
    getRowItemData,
    handleTransfer,
    getFinishedContracts,
  };
};

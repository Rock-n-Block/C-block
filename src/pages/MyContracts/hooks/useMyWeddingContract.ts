import { useCallback } from 'react';
import { noop } from 'lodash';

import useShallowSelector from 'hooks/useShallowSelector';
import uiSelector from 'store/ui/selectors';
import actionTypes from 'store/myContracts/weddingContracts/actionTypes';
import {
  ISpecificWeddingContractData,
  RequestStatus,
  TRequestUiCallbacks,
} from 'types';

export interface IFetchWeddingContractReturnType extends ISpecificWeddingContractData {}

export const useMyWeddingContract = () => {
  const getFundsAfterDivorceRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.GET_FUNDS_AFTER_DIVORCE),
  );
  const getFundsAfterDivorceRequestUi = useCallback(
    ({
      onRequestTx = noop, onSuccessTx = noop, onErrorTx = noop, onFinishTx = noop,
    }: TRequestUiCallbacks) => {
      switch (getFundsAfterDivorceRequestStatus) {
        case RequestStatus.REQUEST: {
          onRequestTx();
          break;
        }
        case RequestStatus.SUCCESS: {
          onSuccessTx();
          onFinishTx();
          break;
        }
        case RequestStatus.ERROR: {
          onErrorTx();
          onFinishTx();
          break;
        }
        default: {
          break;
        }
      }
    }, [getFundsAfterDivorceRequestStatus],
  );

  const initDivorceRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.INIT_DIVORCE),
  );
  const initDivorceRequestUi = useCallback(
    ({
      onRequestTx = noop, onSuccessTx = noop, onErrorTx = noop, onFinishTx = noop,
    }: TRequestUiCallbacks) => {
      switch (initDivorceRequestStatus) {
        case RequestStatus.REQUEST: {
          onRequestTx();
          break;
        }
        case RequestStatus.SUCCESS: {
          onSuccessTx();
          onFinishTx();
          break;
        }
        case RequestStatus.ERROR: {
          onErrorTx();
          onFinishTx();
          break;
        }
        default: {
          break;
        }
      }
    }, [initDivorceRequestStatus],
  );

  const approveDivorceRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.APPROVE_DIVORCE),
  );
  const approveDivorceRequestUi = useCallback(
    ({
      onRequestTx = noop, onSuccessTx = noop, onErrorTx = noop, onFinishTx = noop,
    }: TRequestUiCallbacks) => {
      switch (approveDivorceRequestStatus) {
        case RequestStatus.REQUEST: {
          onRequestTx();
          break;
        }
        case RequestStatus.SUCCESS: {
          onSuccessTx();
          onFinishTx();
          break;
        }
        case RequestStatus.ERROR: {
          onErrorTx();
          onFinishTx();
          break;
        }
        default: {
          break;
        }
      }
    }, [approveDivorceRequestStatus],
  );

  const rejectDivorceRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.REJECT_DIVORCE),
  );
  const rejectDivorceRequestUi = useCallback(
    ({
      onRequestTx = noop, onSuccessTx = noop, onErrorTx = noop, onFinishTx = noop,
    }: TRequestUiCallbacks) => {
      switch (rejectDivorceRequestStatus) {
        case RequestStatus.REQUEST: {
          onRequestTx();
          break;
        }
        case RequestStatus.SUCCESS: {
          onSuccessTx();
          onFinishTx();
          break;
        }
        case RequestStatus.ERROR: {
          onErrorTx();
          onFinishTx();
          break;
        }
        default: {
          break;
        }
      }
    }, [rejectDivorceRequestStatus],
  );

  const initWithdrawalRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.INIT_WITHDRAWAL),
  );
  const initWithdrawalRequestUi = useCallback(
    ({
      onRequestTx = noop, onSuccessTx = noop, onErrorTx = noop, onFinishTx = noop,
    }: TRequestUiCallbacks) => {
      switch (initWithdrawalRequestStatus) {
        case RequestStatus.REQUEST: {
          onRequestTx();
          break;
        }
        case RequestStatus.SUCCESS: {
          onSuccessTx();
          onFinishTx();
          break;
        }
        case RequestStatus.ERROR: {
          onErrorTx();
          onFinishTx();
          break;
        }
        default: {
          break;
        }
      }
    }, [initWithdrawalRequestStatus],
  );

  const approveWithdrawalRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.APPROVE_WITHDRAWAL),
  );
  const approveWithdrawalRequestUi = useCallback(
    ({
      onRequestTx = noop, onSuccessTx = noop, onErrorTx = noop, onFinishTx = noop,
    }: TRequestUiCallbacks) => {
      switch (approveWithdrawalRequestStatus) {
        case RequestStatus.REQUEST: {
          onRequestTx();
          break;
        }
        case RequestStatus.SUCCESS: {
          onSuccessTx();
          onFinishTx();
          break;
        }
        case RequestStatus.ERROR: {
          onErrorTx();
          onFinishTx();
          break;
        }
        default: {
          break;
        }
      }
    }, [approveWithdrawalRequestStatus],
  );

  const rejectWithdrawalRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.REJECT_WITHDRAWAL),
  );
  const rejectWithdrawalRequestUi = useCallback(
    ({
      onRequestTx = noop, onSuccessTx = noop, onErrorTx = noop, onFinishTx = noop,
    }: TRequestUiCallbacks) => {
      switch (rejectWithdrawalRequestStatus) {
        case RequestStatus.REQUEST: {
          onRequestTx();
          break;
        }
        case RequestStatus.SUCCESS: {
          onSuccessTx();
          onFinishTx();
          break;
        }
        case RequestStatus.ERROR: {
          onErrorTx();
          onFinishTx();
          break;
        }
        default: {
          break;
        }
      }
    }, [rejectWithdrawalRequestStatus],
  );

  return {
    getFundsAfterDivorceRequestUi,

    initWithdrawalRequestUi,
    approveWithdrawalRequestUi,
    rejectWithdrawalRequestUi,

    initDivorceRequestUi,
    approveDivorceRequestUi,
    rejectDivorceRequestUi,
  };
};

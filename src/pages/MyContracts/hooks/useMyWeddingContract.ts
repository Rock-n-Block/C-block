import { useCallback } from 'react';
import { noop } from 'lodash';

import { useWalletConnectorContext } from 'services';
import { useShallowSelector } from 'hooks';
import uiSelector from 'store/ui/selectors';
// import userSelector from 'store/user/selectors';
// import { IGetFundsModalTokenAddressField } from 'components/GetFundsModal/GetFundsModal.helpers';
import { weddingAbi } from 'config/abi';
import actionTypes from 'store/myContracts/weddingContracts/actionTypes';
import {
  ISpecificWeddingContractData,
  RequestStatus,
  TRequestUiCallbacks,
} from 'types';
import {
  IGetContractsWeddingContractWithContractCreationField, IGetContractsWeddingContractWithSpecificField,
} from '../MyContracts.helpers';

export interface IFetchWeddingContractReturnType extends ISpecificWeddingContractData {}

export const useMyWeddingContract = () => {
  const { walletService } = useWalletConnectorContext();

  const getWeddingContract = useCallback(
    (contractAddress: string) => {
      const web3 = walletService.Web3();
      const contract = new web3.eth.Contract(weddingAbi, contractAddress);
      return contract;
    }, [walletService],
  );

  const fetchWeddingContract = useCallback(
    async (contractAddress: string) => {
      const contract = getWeddingContract(contractAddress);

      try {
        const callsPromises = [
          'activeWithdrawalProposal',
          // 'divorceDisputed',
          'divorceProposedBy',
          'divorceTimestamp',
          'withdrawalProposalPending',
        ].map((methodName) => contract.methods[methodName]().call());
        const [
          activeWithdrawalProposal,
          // divorceDisputed,
          divorceProposedBy,
          divorceTimestamp,
          withdrawalProposalPending,
        ] = await Promise.all(callsPromises);
        return {
          activeWithdrawalProposal,
          divorceProposedBy,
          divorceTimestamp,
          withdrawalProposalPending,
        } as IFetchWeddingContractReturnType;
      } catch (err) {
        console.log(err);
        return undefined;
      }
    }, [getWeddingContract],
  );

  const transformMergeWeddingContractsAndSpecificData = (
    weddings: IGetContractsWeddingContractWithContractCreationField[],
    weddingsSpecificData: IFetchWeddingContractReturnType[],
  ) => weddings.map((wedding, index) => {
    const specificData = weddingsSpecificData[index];
    return {
      ...wedding,
      specificContractData: {
        ...specificData,
      },
    };
  }) as IGetContractsWeddingContractWithSpecificField[];

  const getWeddingContractsWithSpecificData = useCallback(
    async (
      weddings: IGetContractsWeddingContractWithContractCreationField[],
    ) => {
      const promises = weddings.map((wedding) => fetchWeddingContract(wedding.address));
      const fetchedSpecificWeddingsData = await Promise.all(promises);
      console.log(fetchedSpecificWeddingsData);
      return transformMergeWeddingContractsAndSpecificData(weddings, fetchedSpecificWeddingsData);
    },
    [fetchWeddingContract],
  );

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

    getWeddingContractsWithSpecificData,

    initWithdrawalRequestUi,
    approveWithdrawalRequestUi,
    rejectWithdrawalRequestUi,

    initDivorceRequestUi,
    approveDivorceRequestUi,
    rejectDivorceRequestUi,
  };
};

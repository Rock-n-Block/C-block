import { all, call } from '@redux-saga/core/effects';
import Web3 from 'web3';

import { IFetchWeddingContractReturnType } from 'pages/MyContracts/hooks';
import { IGetContractsWeddingContractWithContractCreationField } from 'pages/MyContracts/MyContracts.helpers';
import { contractsHelper, getRidOfIndexesInResultObject } from 'utils';
import {
  transformMergeWeddingContractsAndSpecificData,
} from './getWeddingContracts.helpers';

function* fetchWeddingContractSaga(provider: Web3, contractAddress: string) {
  const contract = contractsHelper.getWeddingContract(provider, contractAddress);

  try {
    const callsPromises = [
      'activeWithdrawalProposal' as const,
      'divorceProposedBy' as const,
      'divorceTimestamp' as const,
      'withdrawalProposalPending' as const,
    ].map((methodName) => call(contract.methods[methodName]().call));
    const [
      activeWithdrawalProposal,
      divorceProposedBy,
      divorceTimestamp,
      withdrawalProposalPending,
    ] = yield all(callsPromises);

    return {
      activeWithdrawalProposal: getRidOfIndexesInResultObject(activeWithdrawalProposal),
      divorceProposedBy,
      divorceTimestamp,
      withdrawalProposalPending,
    } as IFetchWeddingContractReturnType;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export function* getWeddingContractsWithSpecificDataSaga(
  provider: Web3,
  weddings: IGetContractsWeddingContractWithContractCreationField[],
) {
  const promises = weddings.map((wedding) => call(
    fetchWeddingContractSaga, provider, wedding.address,
  ));
  const fetchedSpecificWeddingsData = yield all(promises);

  return transformMergeWeddingContractsAndSpecificData(
    weddings,
    fetchedSpecificWeddingsData,
  );
}

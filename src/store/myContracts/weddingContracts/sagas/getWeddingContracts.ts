import { all, call } from '@redux-saga/core/effects';
import Web3 from 'web3';

import { IFetchWeddingContractReturnType } from 'pages/MyContracts/hooks';
import { IGetContractsWeddingContractWithContractCreationField } from 'pages/MyContracts/MyContracts.helpers';
import { getRidOfIndexesInResultObject } from 'utils';
import {
  getWeddingContract,
  transformMergeWeddingContractsAndSpecificData,
} from './getWeddingContracts.helpers';

function* fetchWeddingContractSaga(provider: Web3, contractAddress: string) {
  const contract = getWeddingContract(provider, contractAddress);

  try {
    const callsPromises = [
      'activeWithdrawalProposal',
      'divorceProposedBy',
      'divorceTimestamp',
      'withdrawalProposalPending',
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

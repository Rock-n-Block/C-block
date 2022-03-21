import { all, call } from '@redux-saga/core/effects';
import Web3 from 'web3';

import { IGetContractsWillContractWithContractCreationField } from 'pages/MyContracts/MyContracts.helpers';
import { ISpecificWillContractData } from 'types';
import { contractsHelper } from 'utils';
import {
  transformMergeWillContractsAndSpecificData,
} from './getWillContracts.helpers';

function* fetchWillContractSaga(provider: Web3, contractAddress: string) {
  const contract = contractsHelper.getWillContract(provider, contractAddress);

  try {
    const callsPromises = [
      'isLostKey' as const,
      'terminated' as const,
    ].map((methodName) => call(contract.methods[methodName]().call));
    const [
      isLostKey,
      terminated,
    ]: boolean[] = yield all(callsPromises);

    return {
      isLostKey,
      terminated,
    } as ISpecificWillContractData;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export function* getWillContractsWithSpecificDataSaga(
  provider: Web3,
  lastwills: IGetContractsWillContractWithContractCreationField[],
) {
  const promises = lastwills.map((will) => call(
    fetchWillContractSaga, provider, will.address,
  ));
  const fetchedSpecificLastWillsData = yield all(promises);

  return transformMergeWillContractsAndSpecificData(
    lastwills,
    fetchedSpecificLastWillsData,
  );
}

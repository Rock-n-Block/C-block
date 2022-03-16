import { all, call } from '@redux-saga/core/effects';
import Web3 from 'web3';

import { IGetContractsLostKeyContractWithContractCreationField } from 'pages/MyContracts/MyContracts.helpers';
import { ISpecificLostKeyContractData } from 'types';
import { contractsHelper } from 'utils';
import {
  transformMergeLostKeyContractsAndSpecificData,
} from './getLostKeyContracts.helpers';

function* fetchLostKeyContractSaga(provider: Web3, contractAddress: string) {
  const contract = contractsHelper.getLostKeyContract(provider, contractAddress);

  try {
    const callsPromises = [
      'isLostKey',
      'terminated',
    ].map((methodName) => call(contract.methods[methodName]().call));
    const [
      isLostKey,
      terminated,
    ] = yield all(callsPromises);

    return {
      isLostKey,
      terminated,
    } as ISpecificLostKeyContractData;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export function* getLostKeyContractsWithSpecificDataSaga(
  provider: Web3,
  lostkeys: IGetContractsLostKeyContractWithContractCreationField[],
) {
  const promises = lostkeys.map((lostkey) => call(
    fetchLostKeyContractSaga, provider, lostkey.address,
  ));
  const fetchedSpecificLostKeysData = yield all(promises);

  return transformMergeLostKeyContractsAndSpecificData(
    lostkeys,
    fetchedSpecificLostKeysData,
  );
}

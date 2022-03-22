import { call } from 'redux-saga/effects';
import Web3 from 'web3';

import { contractsHelper } from 'utils';

export function* checkIfTokenAddress(provider: Web3, contractAddress: string) {
  try {
    const contract = contractsHelper.getBep20Contract(provider, contractAddress);
    yield call(
      contract.methods.decimals().call,
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

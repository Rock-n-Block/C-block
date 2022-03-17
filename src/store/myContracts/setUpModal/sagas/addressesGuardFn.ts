import { call, put } from '@redux-saga/core/effects';
import type Web3 from 'web3';

import { myContractsReducer } from 'store/myContracts/reducer';
import { ISetUpModalTokenAddress, ISetUpModalTokenAddressField } from 'types';
import { setNotification, shortenPhrase } from 'utils';
import { checkIfTokenAddress } from './checkIfTokenAddress';

export function* addressesGuardFn(
  provider: Web3,
  contractAddress: string,
  addresses: ISetUpModalTokenAddress[],
  { id: fieldId, address }: ISetUpModalTokenAddressField,
) {
  // filter items due to can be ['', '', '0x111], and it will result as 'has no unique items'
  const addressesArray = addresses.map(({ address }) => address).filter((item) => item);
  const hasUniqueAddresses = addressesArray.length === new Set(addressesArray).size;
  if (!hasUniqueAddresses) {
    setNotification({
      type: 'warning',
      message: `Provided ${shortenPhrase(address)} token's address is already added`,
    });
    yield put(
      myContractsReducer.actions.setUpModalResetField({
        contractAddress,
        fieldId,
      }),
    );
    return false;
  }

  const isTokenAddress = yield call(checkIfTokenAddress, provider, address);
  if (!isTokenAddress) {
    setNotification({
      type: 'warning',
      message: 'Provided token address is invalid',
    });
    yield put(
      myContractsReducer.actions.setUpModalResetField({
        contractAddress,
        fieldId,
      }),
    );
    return false;
  }
  return true;
}

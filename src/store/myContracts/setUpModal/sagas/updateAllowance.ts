import {
  call, put, select, takeLatest,
} from '@redux-saga/core/effects';

import myContractsSelector from 'store/myContracts/selectors';
import userSelector from 'store/user/selectors';
import { setUpModalSetAddresses } from 'store/myContracts/reducer';
import { UserState, ISetUpModalTokenAddressField } from 'types';
import { contractsHelper } from 'utils';

import { addressesGuardFn } from './addressesGuardFn';
import { updateAllowance } from '../actions';
import actionTypes from '../actionTypes';

function* updateAllowanceSaga(
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type,
    payload: {
      provider,
      contractAddress,
      tokenAddressField,
    },
  }: ReturnType<typeof updateAllowance>,
) {
  const addresses: ISetUpModalTokenAddressField[] = yield select(
    myContractsSelector.getSetUpModalAddresses(contractAddress),
  );
  const isValidated = yield call(
    addressesGuardFn,
    provider,
    contractAddress,
    addresses,
    tokenAddressField,
  );
  if (!isValidated) return;

  const { address: userWalletAddress }: UserState = yield select(
    userSelector.getUser,
  );
  const { id, address } = tokenAddressField;
  try {
    const contract = contractsHelper.getBep20Contract(provider, address);
    const allowance = yield call(
      contract.methods.allowance(userWalletAddress, contractAddress).call,
    );
    yield put(
      setUpModalSetAddresses({
        contractAddress,
        addresses: addresses.map((item) => (item.id === id ? {
          id,
          address,
          allowance,
          isAdded: false,
        } : item)),
      }),
    );
  } catch (err) {
    console.log(err);
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SETUP_MODAL_UPDATE_ALLOWANCE, updateAllowanceSaga);
}

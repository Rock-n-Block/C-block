import {
  select, put, call, takeLatest,
} from '@redux-saga/core/effects';

import myContractsSelector from 'store/myContracts/selectors';
import { ISetUpModalTokenAddressField, Modals } from 'types';

import { setActiveModal } from 'store/modals/reducer';
import { approveSaga } from 'store/erc20/sagas/approveSaga';
import erc20ActionTypes from 'store/erc20/actionTypes';
import { setUpModalSetAddresses } from 'store/myContracts/reducer';
import apiActions from 'store/ui/actions';
import { MAX_UINT_256 } from 'appConstants';
import { setUpModalApprove } from '../actions';
import actionTypes from '../actionTypes';

function* setUpModalApproveSaga(
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type,
    payload: {
      provider,
      contractAddress,
      tokenAddressField,
    },
  }: ReturnType<typeof setUpModalApprove>,
) {
  yield put(apiActions.request(type));
  const addresses: ISetUpModalTokenAddressField[] = yield select(
    myContractsSelector.getSetUpModalAddresses(contractAddress),
  );

  const { id, address } = tokenAddressField;

  try {
    yield put(setActiveModal({
      activeModal: Modals.SendTxPending,
      open: true,
    }));

    yield call(approveSaga, {
      type: erc20ActionTypes.APPROVE,
      payload: {
        provider,
        spender: contractAddress,
        amount: MAX_UINT_256,
        tokenAddress: address,
      },
    });

    yield put(
      setUpModalSetAddresses({
        contractAddress,
        addresses: addresses.map((item) => (item.id === id ? {
          id,
          address,
          allowance: MAX_UINT_256,
          isAdded: false,
        } : item)),
      }),
    );

    yield put(setActiveModal({
      activeModal: Modals.SendTxSuccess,
      open: true,
    }));
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(setActiveModal({
      activeModal: Modals.SendTxRejected,
      open: true,
    }));
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SETUP_MODAL_APPROVE, setUpModalApproveSaga);
}

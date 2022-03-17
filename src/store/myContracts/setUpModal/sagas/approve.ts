import {
  select, put, call, takeLatest,
} from '@redux-saga/core/effects';

import myContractsSelector from 'store/myContracts/selectors';
import { ISetUpModalTokenAddressField, Modals } from 'types';

import { setActiveModal } from 'store/modals/reducer';
import contractFormsActionTypes from 'store/contractForms/actionTypes';
import { MAX_UINT_256 } from 'appConstants';
import { myContractsReducer } from 'store/myContracts/reducer';
import { approveSaga } from 'store/contractForms/sagas/approveSaga';
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
      type: contractFormsActionTypes.APPROVE,
      payload: {
        provider,
        spender: contractAddress,
        amount: MAX_UINT_256,
        tokenAddress: address,
      },
    });

    yield put(
      myContractsReducer.actions.setUpModalSetAddresses({
        contractAddress,
        addresses: addresses.map((item) => (item.id === id ? {
          id,
          address,
          allowance: MAX_UINT_256,
        } : item)),
      }),
    );

    yield put(setActiveModal({
      activeModal: Modals.SendTxSuccess,
      open: true,
    }));
  } catch (err) {
    console.log(err);
    yield put(setActiveModal({
      activeModal: Modals.SendTxRejected,
      open: true,
    }));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SETUP_MODAL_APPROVE, setUpModalApproveSaga);
}

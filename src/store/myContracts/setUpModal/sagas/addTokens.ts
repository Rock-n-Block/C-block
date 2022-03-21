import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import userSelector from 'store/user/selectors';
import apiActions from 'store/ui/actions';
import { setActiveModal } from 'store/modals/reducer';

import { Modals } from 'types';
import { contractsHelper } from 'utils';
import actionTypes from '../actionTypes';
import { setUpModalAddTokens, getSetUpModalTokenAddresses } from '../actions';

function* setUpModalAddTokensSaga({
  type,
  payload: {
    provider,
    contractAddress,
    tokensAddresses,
  },
}: ReturnType<typeof setUpModalAddTokens>) {
  try {
    yield put(apiActions.request(type));
    yield put(setActiveModal({
      activeModal: Modals.SendTxPending,
      open: true,
    }));

    const { address: userWalletAddress } = yield select(userSelector.getUser);
    const contract = contractsHelper.getLostKeyContract(provider, contractAddress);

    yield call(
      contract.methods.addToken(tokensAddresses).send,
      {
        from: userWalletAddress,
      },
    );

    yield put(setActiveModal({
      activeModal: Modals.SendTxSuccess,
      open: true,
    }));
    yield put(
      getSetUpModalTokenAddresses({
        provider,
        contractAddress,
      }),
    );
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
  yield takeLatest(actionTypes.SETUP_MODAL_ADD_TOKENS, setUpModalAddTokensSaga);
}

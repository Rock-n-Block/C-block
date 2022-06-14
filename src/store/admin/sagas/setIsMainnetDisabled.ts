import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { baseApi } from 'store/api/apiRequestBuilder';

import apiActions from 'store/ui/actions';
import adminActions from '../actions';
import actionTypes from '../actionTypes';
import { setIsMainnetDisabled } from '../reducer';

function* setIsMainnetDisabledSaga({
  type,
  payload: {
    isMainnetDisabled,
  },
}: ReturnType<typeof adminActions.setIsMainnetDisabled>) {
  try {
    yield put(apiActions.request(type));

    yield call(
      baseApi.setIsMainnetDisabled,
      {
        mainnet_enabled: !isMainnetDisabled,
      },
    );
    yield put(
      setIsMainnetDisabled(isMainnetDisabled),
    );

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err?.response);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.ADMIN_SET_IS_MAINNET_DISABLED, setIsMainnetDisabledSaga);
}

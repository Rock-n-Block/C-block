import { AxiosResponse } from 'axios';
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { baseApi } from 'store/api/apiRequestBuilder';
import { TGetIsMainnetDisabledReturnType } from 'store/api/apiRequestBuilder.types';

import apiActions from 'store/ui/actions';
import { getIsMainnetDisabled } from '../actions';
import actionTypes from '../actionTypes';
import { setIsMainnetDisabled } from '../reducer';

function* getIsMainnetDisabledSaga({
  type,
}: ReturnType<typeof getIsMainnetDisabled>) {
  try {
    yield put(apiActions.request(type));

    const {
      data: {
        mainnet_enabled: isAllowedDeployToMainnet,
      },
    }: AxiosResponse<TGetIsMainnetDisabledReturnType> = yield call(baseApi.getIsMainnetDisabled);
    yield put(
      setIsMainnetDisabled(!isAllowedDeployToMainnet),
    );

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err?.response);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.ADMIN_GET_IS_MAINNET_DISABLED, getIsMainnetDisabledSaga);
}

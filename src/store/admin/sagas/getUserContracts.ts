import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { baseApi } from 'store/api/apiRequestBuilder';

import apiActions from 'store/ui/actions';
import { UserState, UserView } from 'types';
import { AxiosResponse } from 'axios';
import { TGetContractsReturnType } from 'store/api/apiRequestBuilder.types';
import userSelectors from 'store/user/selectors';
import adminActions from '../actions';
import adminSelectors from '../selectors';
import actionTypes from '../actionTypes';
import { updateUser } from '../reducer';

function* getUserContractsSaga({
  type,
  payload: {
    userId,
  },
}: ReturnType<typeof adminActions.getUserContracts>) {
  const typeWithUserId = `${type}_${userId}`;
  try {
    yield put(apiActions.request(typeWithUserId));

    const user: UserView = yield select(
      adminSelectors.selectUser(userId),
    );
    const { data }: AxiosResponse<TGetContractsReturnType> = yield call(
      baseApi.getContracts,
      {
        walletAddress: user.ownerAddress,
      },
    );
    const { isMainnet }: UserState = yield select(
      userSelectors.getUser,
    );
    yield put(
      updateUser({
        userId,
        user: {
          contracts: data[isMainnet ? 'mainnet' : 'testnet'],
        },
      }),
    );

    yield put(apiActions.success(typeWithUserId));
  } catch (err) {
    console.log(err, err?.response);
    yield put(apiActions.error(typeWithUserId, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.ADMIN_GET_USER_CONTRACTS, getUserContractsSaga);
}

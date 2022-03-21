import {
  call, select, put, takeLatest, all,
} from 'redux-saga/effects';
import Web3 from 'web3';
import { AxiosResponse } from 'axios';

import apiActions from 'store/ui/actions';
import userSelector from 'store/user/selectors';
import { baseApi } from 'store/api/apiRequestBuilder';
import {
  IFinishedLostKeyContract,
  IFinishedWillContract,
  IGetFinishedLostKeyContractsReturnType,
  IGetFinishedWillContractsReturnType,
} from 'store/api/apiRequestBuilder.types';
import { contractsHelper } from 'utils';
import {
  ContractsNames, Modals, TFinishedContract, UserState,
} from 'types';
import { setActiveModal } from 'store/modals/reducer';
import actionTypes from '../actionTypes';
import { getFinishedContracts } from '../actions';
import { setFinishedContracts } from '../reducer';

function* fetchFinishedContractsRewardAmount(provider: Web3, addresses: string[]) {
  try {
    const { isMainnet }: UserState = yield select(userSelector.getUser);
    const {
      address: celoAddress,
    } = contractsHelper.getContractData(ContractsNames.celo, isMainnet);
    const celoTokenContract = contractsHelper.getBep20Contract(provider, celoAddress);
    const rewardAmounts: string[] = yield all(
      addresses.map((address) => call(celoTokenContract.methods.balanceOf(address).call)),
    );
    return rewardAmounts;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function* extendFinishedContractsWithRewardAmount(
  provider: Web3,
  finishedContracts: TFinishedContract[],
) {
  try {
    const fetchedRewardAmounts: string[] = yield call(
      fetchFinishedContractsRewardAmount,
      provider,
      finishedContracts.map(({ address }) => address),
    );
    return finishedContracts.map((item, index) => {
      const rewardAmount = fetchedRewardAmounts[index];
      return {
        ...item,
        rewardAmount,
      };
    });
  } catch (err) {
    console.log(err);
    return finishedContracts;
  }
}

function* fetchFinishedWillContracts() {
  try {
    const {
      data: { lastwills },
    }: AxiosResponse<IGetFinishedWillContractsReturnType> = yield call(
      baseApi.getFinishedWillContracts,
    );
    return lastwills;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function* fetchFinishedLostKeyContracts() {
  try {
    const {
      data: { lostkeys },
    }: AxiosResponse<IGetFinishedLostKeyContractsReturnType> = yield call(
      baseApi.getFinishedLostKeyContracts,
    );
    return lostkeys;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function* fetchAndTransformFinishedContracts(provider: Web3) {
  try {
    const lastwills: IFinishedWillContract[] = yield call(fetchFinishedWillContracts);
    const lostkeys: IFinishedLostKeyContract[] = yield call(fetchFinishedLostKeyContracts);
    const finishedContracts = [
      ...lastwills,
      ...lostkeys,
    ] as TFinishedContract[];

    const finishedContractsWithRewardAmount: TFinishedContract[] = yield call(
      extendFinishedContractsWithRewardAmount,
      provider,
      finishedContracts,
    );
    return finishedContractsWithRewardAmount;
  } catch (err) {
    console.log('fetchAndTransformFinishedContracts', err);
    return [];
  }
}

function* getFinishedContractsSaga({
  type,
  payload: { provider },
}: ReturnType<typeof getFinishedContracts>) {
  try {
    yield put(apiActions.request(type));
    yield put(setActiveModal({
      activeModal: Modals.FullscreenLoader,
      open: true,
    }));

    const finishedContracts: TFinishedContract[] = yield call(
      fetchAndTransformFinishedContracts,
      provider,
    );
    yield put(setFinishedContracts(finishedContracts));
    yield put(setActiveModal({
      activeModal: Modals.FullscreenLoader,
      open: false,
    }));
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(setActiveModal({
      activeModal: Modals.FullscreenLoader,
      open: false,
    }));
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_FINISHED_CONTRACTS, getFinishedContractsSaga);
}

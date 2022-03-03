import {
  put,
  takeLatest,
} from 'redux-saga/effects';
// import BigNumber from 'bignumber.js';
// import { TransactionReceipt } from 'web3-core';

import apiActions from 'store/ui/actions';
// import contractFormsSelector from 'store/contractForms/selectors';
// import userSelector from 'store/user/selectors';
// import { bep20Abi } from 'config/abi';
// import { contractsHelper, convertIntervalAsSeconds, getTokenAmount } from 'utils';
// import {
//   ContractsNames, ICrowdsaleContract, UserState,
// } from 'types';
import actionTypes from '../actionTypes';
import { getMyContracts } from '../actions';

function* getMyContractsSaga({
  type,
  payload: { provider },
}: ReturnType<typeof getMyContracts>) {
  try {
    yield put(apiActions.request(type));
    console.log(provider);
    // const crowdsaleContract: ICrowdsaleContract = yield select(
    //   contractFormsSelector.getCrowdsaleContract,
    // );
    // const { isMainnet, address: myAddress }: UserState = yield select(
    //   userSelector.getUser,
    // );

    // const celoAddress = contractsHelper.getContractData(ContractsNames.celo, isMainnet).address;

    // const crowdsaleFactoryContract = new provider.eth.Contract(
    //   crowdsaleFactoryContractData.abi,
    //   crowdsaleFactoryContractData.address,
    // );

    // const celoTokenContract = new provider.eth.Contract(
    //   bep20Abi,
    //   celoAddress,
    // );

    // const allowance = yield call(
    //   celoTokenContract.methods.allowance(
    //     myAddress,
    //     crowdsaleFactoryContractData.address,
    //   ).call,
    // );

    // const price: string = yield call(getContractCreationPriceSaga, {
    //   type: actionTypes.GET_CONTRACT_CREATION_PRICE,
    //   payload: {
    //     provider,
    //     contractType: 'crowdsale',
    //   },
    // });

    // yield call(baseApi.createCrowdsaleContract, {
    //   tx_hash: transactionHash,
    //   name: contractName,
    // });

    yield new Promise((res) => {
      setTimeout(() => res('yeah'), 1500);
    });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_MY_CONTRACTS, getMyContractsSaga);
}

import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import { bep20Abi } from 'config/abi';
import { contractsHelper, convertIntervalAsSeconds, getTokenAmount } from 'utils';
import {
  ContractsNames, IWillContract, UserState,
} from 'types';
import { baseApi } from 'store/api/apiRequestBuilder';
import actionTypes from '../actionTypes';
import { createWillContract } from '../actions';
import { approveSaga } from './approveSaga';

function* createWillContractSaga({
  type,
  payload: { provider },
}: ReturnType<typeof createWillContract>) {
  try {
    yield put(apiActions.request(type));

    const willContract: IWillContract = yield select(
      contractFormsSelector.getWillContract,
    );
    const { isMainnet, address: myAddress }: UserState = yield select(
      userSelector.getUser,
    );

    const celoAddress = contractsHelper.getContractData(ContractsNames.celo, isMainnet).address;

    const lostKeyFactoryContractData = contractsHelper.getContractData(
      ContractsNames.lostKeyFactory,
      isMainnet,
    );

    const lostKeyFactoryContract = new provider.eth.Contract(
      lostKeyFactoryContractData.abi,
      lostKeyFactoryContractData.address,
    );

    const celoTokenContract = new provider.eth.Contract(
      bep20Abi,
      celoAddress,
    );

    const allowance = yield call(
      celoTokenContract.methods.allowance(
        myAddress,
        lostKeyFactoryContractData.address,
      ).call,
    );

    const price: string = yield call(
      lostKeyFactoryContract.methods.price(celoAddress).call,
    );

    if (+allowance < +price * 2) {
      yield call(approveSaga, {
        type: actionTypes.APPROVE,
        payload: {
          provider,
          spender: lostKeyFactoryContractData.address,
          amount: +price * 2,
          tokenAddress: celoAddress,
        },
      });
    }

    const {
      reservesConfigs,
      pingIntervalAsValue,
      pingIntervalAsDateUnits,
      rewardAmount,
      ownerEmail,
    } = willContract;

    const reserveAddresses = reservesConfigs.map(({ reserveAddress }) => reserveAddress);
    const sharesPercents = reservesConfigs.map(({ percents }) => percents);
    const pingIntervalAsSeconds = convertIntervalAsSeconds(
      pingIntervalAsValue, pingIntervalAsDateUnits,
    );
    const celoDecimals: string = yield call(
      celoTokenContract.methods.decimals().call,
    );

    const contractMethodArgs: (string | string[] | number[] | number)[] = [
      celoAddress,
      reserveAddresses,
      sharesPercents,
      pingIntervalAsSeconds,
      getTokenAmount(rewardAmount, +celoDecimals, false),
    ];

    const { transactionHash } = yield call(
      lostKeyFactoryContract.methods.deployLostKey(...contractMethodArgs).send,
      {
        from: myAddress,
      },
    );

    const emailsList = reservesConfigs.map(({ email }) => email);

    yield call(baseApi.createWillContract, {
      tx_hash: transactionHash,
      contract_name: willContract.contractName,
      mail_list: emailsList,
      owner_mail: ownerEmail,
    });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_WILL_CONTRACT, createWillContractSaga);
}

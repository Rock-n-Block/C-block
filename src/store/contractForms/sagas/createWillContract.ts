import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import apiActions from 'store/ui/actions';
import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
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

    const willContract: IWillContract = yield select(contractFormsSelector.getWillContract);
    const { isMainnet, address: myAddress }: UserState = yield select(userSelector.getUser);

    const celoAddress = contractsHelper.getContractData(ContractsNames.celo, isMainnet).address;

    const { address: lastWillFactoryAddress } = contractsHelper.getContractData(
      ContractsNames.lastWillFactory,
      isMainnet,
    );

    const lastWillFactoryContract = contractsHelper.getWillFactoryContract(
      provider,
      lastWillFactoryAddress,
    );

    const celoTokenContract = contractsHelper.getBep20Contract(
      provider,
      celoAddress,
    );

    const celoDecimals: string = yield call(
      celoTokenContract.methods.decimals().call,
    );

    const allowance = yield call(
      celoTokenContract.methods.allowance(
        myAddress,
        lastWillFactoryAddress,
      ).call,
    );

    const price: string = yield call(
      lastWillFactoryContract.methods.price(celoAddress).call,
    );
    const { rewardAmount } = willContract;
    const rewardAmountSerilialized = getTokenAmount(rewardAmount, +celoDecimals, false);

    const totalAmountToBeApproved = new BigNumber(price)
      .multipliedBy(2)
      .plus(rewardAmountSerilialized)
      .toFixed();
    const hasAllowance = new BigNumber(allowance).isGreaterThanOrEqualTo(totalAmountToBeApproved);
    if (!hasAllowance) {
      yield call(approveSaga, {
        type: actionTypes.APPROVE,
        payload: {
          provider,
          spender: lastWillFactoryAddress,
          amount: totalAmountToBeApproved,
          tokenAddress: celoAddress,
        },
      });
    }

    const {
      reservesConfigs,
      pingIntervalAsValue,
      pingIntervalAsDateUnits,
      ownerEmail,
    } = willContract;

    const reserveAddresses = reservesConfigs.map(({ reserveAddress }) => reserveAddress);
    const sharesPercents = reservesConfigs.map(({ percents }) => percents);
    const pingIntervalAsSeconds = convertIntervalAsSeconds(
      pingIntervalAsValue, pingIntervalAsDateUnits,
    );

    const { transactionHash }: TransactionReceipt = yield call(
      lastWillFactoryContract.methods.deployLostKey(
        celoAddress,
        reserveAddresses,
        sharesPercents,
        pingIntervalAsSeconds,
        rewardAmountSerilialized,
      ).send,
      {
        from: myAddress,
      },
    );

    const emailsList = reservesConfigs.map(({ email }) => email);

    yield call(baseApi.createWillContract, {
      tx_hash: transactionHash,
      name: willContract.contractName,
      mails: emailsList,
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

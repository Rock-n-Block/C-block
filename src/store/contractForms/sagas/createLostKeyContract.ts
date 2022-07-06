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
  ContractsNames, ILostKeyContract, UserState,
} from 'types';
import { baseApi } from 'store/api/apiRequestBuilder';
import { approveSaga } from 'store/erc20/sagas/approveSaga';
import erc20ActionTypes from 'store/erc20/actionTypes';
import { IMailsMap } from 'store/api/apiRequestBuilder.types';
import { Tokens } from 'types/utils/contractsHelper';
import { IconType } from 'components/Preview/Preview.helpers';
import actionTypes from '../actionTypes';
import { createLostKeyContract } from '../actions';

const contractType: IconType = 'lostkey';

function* createLostKeyContractSaga({
  type,
  payload: { provider },
}: ReturnType<typeof createLostKeyContract>) {
  try {
    yield put(apiActions.request(type));

    const lostKeyContract: ILostKeyContract = yield select(
      contractFormsSelector.getLostKeyContract,
    );
    const { isMainnet, address: myAddress }: UserState = yield select(
      userSelector.getUser,
    );

    const { address: lostKeyFactoryAddress } = contractsHelper.getContractData(
      ContractsNames.lostKeyFactory,
      isMainnet,
    );

    const lostKeyFactoryContract = contractsHelper.getLostKeyFactoryContract(
      provider,
      lostKeyFactoryAddress,
    );
    const selectedBuyTokenName: Tokens = yield select(
      contractFormsSelector.selectBuyTokenName(contractType),
    );
    const selectedBuyTokenAddress = contractsHelper.getContractData(
      selectedBuyTokenName as ContractsNames, isMainnet,
    ).address;
    const selectedBuyTokenContract = contractsHelper.getBep20Contract(provider, selectedBuyTokenAddress);
    const selectedBuyTokenDecimals: string = yield call(
      selectedBuyTokenContract.methods.decimals().call,
    );

    const allowance = yield call(
      selectedBuyTokenContract.methods.allowance(
        myAddress,
        lostKeyFactoryAddress,
      ).call,
    );

    const price: string = yield call(
      lostKeyFactoryContract.methods.price(selectedBuyTokenAddress).call,
    );
    const { rewardAmount } = lostKeyContract;
    const rewardAmountSerilialized = getTokenAmount(rewardAmount, +selectedBuyTokenDecimals, false);

    const totalAmountToBeApproved = new BigNumber(price)
      .multipliedBy(2)
      .plus(rewardAmountSerilialized)
      .toFixed();
    const hasAllowance = new BigNumber(allowance).isGreaterThanOrEqualTo(totalAmountToBeApproved);
    if (!hasAllowance) {
      yield call(approveSaga, {
        type: erc20ActionTypes.APPROVE,
        payload: {
          provider,
          spender: lostKeyFactoryAddress,
          amount: totalAmountToBeApproved,
          tokenAddress: selectedBuyTokenAddress,
        },
      });
    }

    const {
      reservesConfigs,
      pingIntervalAsValue,
      pingIntervalAsDateUnits,
    } = lostKeyContract;

    const reserveAddresses = reservesConfigs.map(({ reserveAddress }) => reserveAddress);
    const sharesPercents = reservesConfigs.map(({ percents }) => percents);
    const pingIntervalAsSeconds = convertIntervalAsSeconds(
      pingIntervalAsValue, pingIntervalAsDateUnits,
    );

    const { transactionHash }: TransactionReceipt = yield call(
      lostKeyFactoryContract.methods.deployLostKey(
        selectedBuyTokenAddress,
        reserveAddresses,
        sharesPercents,
        pingIntervalAsSeconds,
        rewardAmountSerilialized,
      ).send,
      {
        from: myAddress,
      },
    );

    const emailsList = reservesConfigs.reduce((accum, { email, reserveAddress }) => ({
      ...accum,
      [email]: reserveAddress,
    }), {} as IMailsMap['mails']);

    const { ownerEmail } = lostKeyContract;
    yield call(baseApi.createLostKeyContract, {
      tx_hash: transactionHash,
      name: lostKeyContract.contractName,
      is_testnet: !isMainnet,
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
  yield takeLatest(actionTypes.CREATE_LOSTKEY_CONTRACT, createLostKeyContractSaga);
}

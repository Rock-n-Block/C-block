import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import apiActions from 'store/ui/actions';
import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import { contractsHelper, convertIntervalAsSeconds } from 'utils';
import {
  ContractsNames, IWeddingContract, UserState,
} from 'types';
import { baseApi } from 'store/api/apiRequestBuilder';
import { approveSaga } from 'store/erc20/sagas/approveSaga';
import erc20ActionTypes from 'store/erc20/actionTypes';
import actionTypes from '../actionTypes';
import { createWeddingContract } from '../actions';
import { getContractCreationPriceSaga } from './getContractCreationPriceSaga';

function* createWeddingContractSaga({
  type,
  payload: { provider },
}: ReturnType<typeof createWeddingContract>) {
  try {
    yield put(apiActions.request(type));

    const weddingContract: IWeddingContract = yield select(
      contractFormsSelector.getWeddingContract,
    );
    const { isMainnet, address: myAddress }: UserState = yield select(
      userSelector.getUser,
    );

    const celoAddress = contractsHelper.getContractData(ContractsNames.celo, isMainnet).address;

    const { address: weddingFactoryAddress } = contractsHelper.getContractData(
      ContractsNames.weddingFactory,
      isMainnet,
    );

    const weddingFactoryContract = contractsHelper.getWeddingFactoryContract(
      provider,
      weddingFactoryAddress,
    );

    const celoTokenContract = contractsHelper.getBep20Contract(
      provider,
      celoAddress,
    );

    const allowance = yield call(
      celoTokenContract.methods.allowance(
        myAddress,
        weddingFactoryAddress,
      ).call,
    );

    const price: string = yield call(getContractCreationPriceSaga, {
      type: actionTypes.GET_CONTRACT_CREATION_PRICE,
      payload: {
        provider,
        contractType: 'weddingRing',
      },
    });

    const totalAmountToBeApproved = new BigNumber(price)
      .multipliedBy(2)
      .toFixed();
    const hasAllowance = new BigNumber(allowance).isGreaterThanOrEqualTo(totalAmountToBeApproved);
    if (!hasAllowance) {
      yield call(approveSaga, {
        type: erc20ActionTypes.APPROVE,
        payload: {
          provider,
          spender: weddingFactoryAddress,
          amount: totalAmountToBeApproved,
          tokenAddress: celoAddress,
        },
      });
    }

    const {
      partnerOneAddress,
      partnerTwoAddress,
      daysForWithdrawalApproval,
      daysForDivorceApproval,
      partnerOneSliderValue,
    } = weddingContract;

    const partnersAddresses: [string, string] = [partnerOneAddress, partnerTwoAddress];

    // as unknown as LostKey
    const { transactionHash }: TransactionReceipt = yield call(
      weddingFactoryContract.methods.deployWedding(
        celoAddress,
        ...partnersAddresses,
        convertIntervalAsSeconds(daysForWithdrawalApproval, 'Day'),
        convertIntervalAsSeconds(daysForDivorceApproval, 'Day'),
        partnerOneSliderValue,
      ).send,
      {
        from: myAddress,
      },
    );

    const {
      contractName,
      partnerOneEmail,
      partnerTwoEmail,
    } = weddingContract;

    const mails = [
      partnerOneEmail,
      partnerTwoEmail,
    ];

    yield call(baseApi.createWeddingContract, {
      tx_hash: transactionHash,
      name: contractName,
      mails,
    });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_WEDDING_CONTRACT, createWeddingContractSaga);
}

import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import BigNumber from 'bignumber.js';

import apiActions from 'store/ui/actions';
import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import { bep20Abi } from 'config/abi';
import { contractsHelper, convertIntervalAsSeconds } from 'utils';
import {
  ContractsNames, IWeddingContract, UserState,
} from 'types';
import { baseApi } from 'store/api/apiRequestBuilder';
import actionTypes from '../actionTypes';
import { createWeddingContract } from '../actions';
import { approveSaga } from './approveSaga';
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

    const weddingFactoryContractData = contractsHelper.getContractData(
      ContractsNames.weddingFactory,
      isMainnet,
    );

    const weddingFactoryContract = new provider.eth.Contract(
      weddingFactoryContractData.abi,
      weddingFactoryContractData.address,
    );

    const celoTokenContract = new provider.eth.Contract(
      bep20Abi,
      celoAddress,
    );

    const allowance = yield call(
      celoTokenContract.methods.allowance(
        myAddress,
        weddingFactoryContractData.address,
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
        type: actionTypes.APPROVE,
        payload: {
          provider,
          spender: weddingFactoryContractData.address,
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

    const mails = [
      partnerOneAddress,
      partnerTwoAddress,
    ];

    const contractMethodArgs: string[] = [
      celoAddress,
      ...mails,
      convertIntervalAsSeconds(daysForWithdrawalApproval, 'Day').toString(),
      convertIntervalAsSeconds(daysForDivorceApproval, 'Day').toString(),
      partnerOneSliderValue.toString(),
    ];

    const { transactionHash }: { transactionHash: string } = yield call(
      weddingFactoryContract.methods.deployWedding(...contractMethodArgs).send,
      {
        from: myAddress,
      },
    );

    const {
      contractName,
    } = weddingContract;

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

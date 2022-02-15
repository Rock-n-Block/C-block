import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { ContractWeb3 } from '@amfi/connect-wallet/dist/interface';

import apiActions from 'store/ui/actions';
import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import { bep20Abi } from 'config/abi';
import { contractsHelper, getTokenAmount } from 'utils';
import {
  ContractsNames, TokenContract, TokenContractDynamicForm, UserState,
} from 'types';
import { baseApi } from 'store/api/apiRequestBuilder';
import actionTypes from '../actionTypes';
import { createTokenContract } from '../actions';
import { approveSaga } from './approveSaga';

function* createTokenContractSaga({
  type,
  payload: { provider },
}: ReturnType<typeof createTokenContract>) {
  try {
    yield put(apiActions.request(type));

    const tokenContract: TokenContract = yield select(
      contractFormsSelector.getTokenContract,
    );
    const { isMainnet, address: myAddress }: UserState = yield select(
      userSelector.getUser,
    );

    const celoAddress = contractsHelper.getContractData(ContractsNames.celo, isMainnet).address;

    const {
      tokenOwner,
      tokenSymbol,
      decimals,
      futureMinting,
      burnable,
      freezable,
      tokens,
    } = tokenContract;

    const tokenFactoryContractName =
      contractsHelper.getTokenFactoryContractName(futureMinting, freezable);
    const tokenFactoryContractData = contractsHelper.getContractData(
      tokenFactoryContractName as ContractsNames,
      isMainnet,
    );

    const tokenFactoryContract: ContractWeb3 = new provider.eth.Contract(
      tokenFactoryContractData.abi,
      tokenFactoryContractData.address,
    );

    const celoTokenContract: ContractWeb3 = new provider.eth.Contract(
      bep20Abi,
      celoAddress,
    );

    const allowance = yield call(
      celoTokenContract.methods.allowance(
        myAddress,
        tokenFactoryContractData.address,
      ).call,
    );
    const price: string = yield call(
      tokenFactoryContract.methods.price(celoAddress, burnable ? 1 : 0).call,
    );

    if (+allowance < +price * 2) {
      yield call(approveSaga, {
        type: actionTypes.APPROVE,
        payload: {
          provider,
          spender: tokenFactoryContractData.address,
          amount: +price * 2,
          tokenAddress: celoAddress,
        },
      });
    }

    const ownerAddresses = tokens.map(
      ({ address: tokenKeyAddress }: TokenContractDynamicForm) => tokenKeyAddress,
    );
    const initSupply = tokens.map(({ amount }: TokenContractDynamicForm) => getTokenAmount(amount, +decimals, false));
    const timeStamps = tokens.map(
      ({ frozenUntilDate }: TokenContractDynamicForm) => Date.parse(frozenUntilDate) / 1000,
    );

    const methodName = contractsHelper.getTokenFactoryContractMethodName(
      burnable,
      futureMinting,
      freezable,
    );

    const { tokenName } = tokenContract;
    const contractMethodArgs: (string | string[] | number[])[] = [
      [celoAddress, tokenOwner],
      tokenName,
      tokenSymbol,
      decimals,
      ownerAddresses,
      initSupply,
    ];
    if (freezable) {
      contractMethodArgs.push(timeStamps);
    }

    const { transactionHash } = yield call(
      tokenFactoryContract.methods[methodName](...contractMethodArgs).send,
      {
        from: myAddress,
      },
    );

    yield call(baseApi.createTokenContract, {
      tx_hash: transactionHash,
      contract_name: tokenName,
      address_list: ownerAddresses,
    });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_TOKEN_CONTRACT, createTokenContractSaga);
}

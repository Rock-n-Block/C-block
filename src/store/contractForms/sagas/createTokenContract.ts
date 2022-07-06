import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import apiActions from 'store/ui/actions';
import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import { contractsHelper, getTokenAmount } from 'utils';
import {
  ContractsNames, TokenContract, TokenContractDynamicForm, UserState,
} from 'types';
import { baseApi } from 'store/api/apiRequestBuilder';
import erc20ActionTypes from 'store/erc20/actionTypes';
import { approveSaga } from 'store/erc20/sagas/approveSaga';
import { Tokens } from 'types/utils/contractsHelper';
import { IconType } from 'components/Preview/Preview.helpers';
import actionTypes from '../actionTypes';
import { createTokenContract } from '../actions';
import { getContractCreationPriceSaga } from './getContractCreationPriceSaga';

const contractType: IconType = 'token';

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

    const {
      futureMinting,
      freezable,
    } = tokenContract;

    const tokenFactoryContractName =
      contractsHelper.getTokenFactoryContractName(futureMinting, freezable);
    const tokenFactoryContractData = contractsHelper.getContractData(
      tokenFactoryContractName as ContractsNames,
      isMainnet,
    );

    const tokenFactoryContract = contractsHelper.getTokenFactoryContract(
      provider,
      tokenFactoryContractData.abi,
      tokenFactoryContractData.address,
    );

    const selectedBuyTokenName: Tokens = yield select(
      contractFormsSelector.selectBuyTokenName(contractType),
    );
    const selectedBuyTokenAddress = contractsHelper.getContractData(
      selectedBuyTokenName as ContractsNames, isMainnet,
    ).address;

    const selectedBuyTokenContract = contractsHelper.getBep20Contract(
      provider,
      selectedBuyTokenAddress,
    );

    const allowance = yield call(
      selectedBuyTokenContract.methods.allowance(
        myAddress,
        tokenFactoryContractData.address,
      ).call,
    );

    const price: string = yield call(getContractCreationPriceSaga, {
      type: actionTypes.GET_CONTRACT_CREATION_PRICE,
      payload: {
        provider,
        contractType,
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
          spender: tokenFactoryContractData.address,
          amount: +price * 2,
          tokenAddress: selectedBuyTokenAddress,
        },
      });
    }

    const {
      tokens,
      decimals,
    } = tokenContract;
    const ownerAddressesForBackend = {};
    const ownerAddresses = tokens.map(
      ({ address, name }: TokenContractDynamicForm) => {
        ownerAddressesForBackend[name] = address;
        return address;
      },
    );
    const initSupply = tokens.map(({ amount }: TokenContractDynamicForm) => getTokenAmount(amount, +decimals, false));
    const timeStamps = tokens.map(
      ({ frozenUntilDate, isFrozen }: TokenContractDynamicForm) => (isFrozen ? Date.parse(frozenUntilDate) / 1000 : 0),
    );

    const { burnable } = tokenContract;
    const methodName = contractsHelper.getTokenFactoryContractMethodName(
      burnable,
      futureMinting,
      freezable,
    );

    const { tokenOwner, tokenName, tokenSymbol } = tokenContract;
    const contractMethodArgs: (string | string[] | number[])[] = [
      [selectedBuyTokenAddress, tokenOwner],
      tokenName,
      tokenSymbol,
      decimals,
      ownerAddresses,
      initSupply,
    ];
    if (freezable) {
      contractMethodArgs.push(timeStamps);
    }

    const { transactionHash }: TransactionReceipt = yield call(
      tokenFactoryContract.methods[methodName](...contractMethodArgs).send,
      {
        from: myAddress,
      },
    );

    yield call(baseApi.createTokenContract, {
      tx_hash: transactionHash,
      name: tokenName,
      is_testnet: !isMainnet,
      addresses: ownerAddressesForBackend,
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

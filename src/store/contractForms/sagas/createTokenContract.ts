import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/ui/actions';
import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import { contracts } from 'config';
import { bep20Abi } from 'config/abi';
import { getTokenAmount } from 'utils';
import { TokenContractDynamicForm } from 'types';
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

    const { tokenContract } = yield select(contractFormsSelector.getContractForms);
    const { isMainnet, address: myAddress } = yield select(userSelector.getUser);

    const celoAddress = contracts.params.celo[isMainnet ? 'mainnet' : 'testnet'].address;

    const {
      tokenName,
      tokenOwner,
      tokenSymbol,
      decimals,
      futureMinting,
      burnable,
      freezable,
      tokens,
    } = tokenContract;

    const tokenFactoryContractName = `token${futureMinting ? '' : 'Non'}Mintable${freezable ? '' : 'Non'}Freezable`;
    const tokenFactoryContractAddress = contracts.params[tokenFactoryContractName][isMainnet ? 'mainnet' : 'testnet'].address;
    const tokenFactoryContractAbi = contracts.params[tokenFactoryContractName][isMainnet ? 'mainnet' : 'testnet'].abi;

    const celoAbi = bep20Abi;

    const tokenFactoryContract = new provider.eth.Contract(tokenFactoryContractAbi, tokenFactoryContractAddress);

    const celoTokenContract = new provider.eth.Contract(celoAbi, celoAddress);

    const price = yield call(tokenFactoryContract.methods.price(celoAddress, burnable ? 1 : 0).call);

    const allowance = yield call(celoTokenContract.methods.allowance(myAddress, tokenFactoryContractAddress).call);

    if (+allowance < price * 2) {
      yield call(approveSaga, {
        type: actionTypes.APPROVE,
        payload: {
          provider,
          spender: tokenFactoryContractAddress,
          amount: price * 2,
          tokenAddress: celoAddress,
        },
      });
    }

    const ownerAddresses = tokens.map(({ address: tokenKeyAddress }: TokenContractDynamicForm) => tokenKeyAddress);
    const initSupply = tokens.map(({ amount }: TokenContractDynamicForm) => getTokenAmount(amount, +decimals, false));
    const timeStamps = tokens.map(({ frozenUntilDate }: TokenContractDynamicForm) => Date.parse(frozenUntilDate) / 1000);

    const methodName = `deployERC20${burnable ? 'Burnable' : ''}${futureMinting ? 'Mintable' : ''}Pausable${freezable ? 'Freezable' : ''}Token`;

    const { transactionHash } = yield call(tokenFactoryContract.methods[methodName](
      [celoAddress, tokenOwner],
      tokenName,
      tokenSymbol,
      decimals,
      ownerAddresses,
      initSupply,
      timeStamps,
    ).send, {
      from: myAddress,
    });

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

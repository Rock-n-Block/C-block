import {
  call, select, put, takeLatest, all,
} from 'redux-saga/effects';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';
import { BlockTransactionString } from 'web3-eth';

import apiActions from 'store/ui/actions';
import userSelector from 'store/user/selectors';
import { UserState } from 'types';
import { setMyContracts } from 'store/myContracts/reducer';
import {
  IContractData,
  IGetContractsReturnType,
  TGetContracts,
} from 'store/api/apiRequestBuilder.types';
import {
  createContractCards,
  IGetContractsWithContractCreationField,
  IGetContractsWithCreatedAtField,
  IGetContractsWithSpecificField,
  TGetContractsWithCreatedAtField,
} from 'pages/MyContracts/MyContracts.helpers';
import { contractsHelper } from 'utils';
import { baseApi } from 'store/api/apiRequestBuilder';
import actionTypes from '../actionTypes';
import { getMyContracts } from '../actions';
import {
  getContractCreationData,
  subscribeOnEvents,
  TFunctionParams,
} from './getMyContracts.helpers';
import { getWeddingContractsWithSpecificDataSaga } from '../weddingContracts/sagas/getWeddingContracts';

function* transformCreatedAtField(
  provider: Web3,
  data: IGetContractsReturnType,
) {
  const ret = { ...data };

  yield all(
    Object.keys(ret).map(function* objectKeysMapIterator(key) {
      const contractsArr = ret[key] as IContractData[];
      const txReceipts: TransactionReceipt[] = yield all(
        contractsArr.map(({ tx_hash }) => call(provider.eth.getTransactionReceipt, tx_hash)),
      );

      const blocksInformation: BlockTransactionString[] = yield all(
        txReceipts.map(({ blockNumber }) => provider.eth.getBlock(blockNumber)),
      );

      ret[key] = ret[key].map((contractData: TGetContracts, index: number) => ({
        ...contractData,
        createdAt: blocksInformation[index].timestamp,
      }));
    }),
  );
  return ret as IGetContractsWithCreatedAtField;
}

function* transformContractCreationField(
  provider: Web3,
  data: IGetContractsWithCreatedAtField,
) {
  const txSelectorPromise = ({ tx_hash }) => call(provider.eth.getTransaction, tx_hash);
  const txReceipts = yield all(
    [
      data.lostkeys.map(txSelectorPromise),
      data.lastwills.map(txSelectorPromise),
      data.crowdsales.map(txSelectorPromise),
      data.tokens.map(txSelectorPromise),
      data.weddings.map(txSelectorPromise),
    ].map((item) => all(item)),
  );

  const { methodNameSignatureMap, signatureMethodNameMap } =
    contractsHelper.getDeployMethodNameSignatureMap(provider);

  const params = txReceipts.map((arr) => arr.map((tx) => {
    // @see https://stackoverflow.com/questions/55258332/find-the-function-name-and-parameter-from-input-data
    const deployMethodNameSignature = tx.input.slice(0, 10); // 0xf950d458
    const deployMethodName =
        signatureMethodNameMap[deployMethodNameSignature];

    const deployMethodAbi = methodNameSignatureMap[deployMethodName].abi;
    const deployMethodParamsAbi = deployMethodAbi.inputs;
    const deployMethodParams = tx.input.slice(10);
    return {
      methodName: deployMethodName,
      params: provider.eth.abi.decodeParameters(
        deployMethodParamsAbi,
        deployMethodParams,
      ),
      tx,
    } as TFunctionParams;
  }));

  const [lostkeys, lastwills, crowdsales, tokens, weddings] = params;
  const paramsObj = {
    lostkeys,
    lastwills,
    crowdsales,
    tokens,
    weddings,
  };

  const ret = { ...data };

  yield all(
    Object.keys(ret).map(function* gener(key) {
      const paramsArr = paramsObj[key];
      ret[key] = yield all(
        ret[key].map(function* generatorFunc(
          contractData: TGetContractsWithCreatedAtField,
          index: number,
        ) {
          const { methodName, params, tx } = paramsArr[
            index
          ] as TFunctionParams;
          const contractCreationData = yield call(
            getContractCreationData,
            methodName,
            params,
            tx,
            contractData,
            provider,
          );
          return {
            ...contractData,
            contractCreationData,
          };
        }),
      );
    }),
  );
  return ret as IGetContractsWithContractCreationField;
}

function* transformSpecificContractField(
  provider: Web3,
  data: IGetContractsWithContractCreationField,
) {
  const weddings = yield call(
    getWeddingContractsWithSpecificDataSaga,
    provider,
    [...data.weddings],
  );
  return {
    ...data,
    weddings,
  } as IGetContractsWithSpecificField;
}

function* transformMyContractsDataSaga(
  provider: Web3,
  data: IGetContractsReturnType,
) {
  const dataWithCreatedAtField = yield call(
    transformCreatedAtField,
    provider,
    data,
  );
  const dataWithCreationParams = yield call(
    transformContractCreationField,
    provider,
    dataWithCreatedAtField,
  );
  console.log('Transformed data', dataWithCreationParams);
  const dataWithSpecificContractField = yield call(
    transformSpecificContractField,
    provider,
    dataWithCreationParams,
  );

  return dataWithSpecificContractField;
}

function* fetchAndTransformContractsSaga(provider: Web3) {
  const { address: userWalletAddress }: UserState = yield select(
    userSelector.getUser,
  );
  if (!userWalletAddress) return undefined;
  const { data } = yield call(baseApi.getContracts, {
    walletAddress: userWalletAddress,
  });
  const transformedData = yield call(
    transformMyContractsDataSaga,
    provider,
    data,
  );
  const newContracts = createContractCards(transformedData);
  console.log('New Conctracts Cards', newContracts);
  return newContracts;
}

function* getMyContractsSaga({
  type,
  payload: { provider },
}: ReturnType<typeof getMyContracts>) {
  try {
    yield put(apiActions.request(type));

    const newCards = yield call(fetchAndTransformContractsSaga, provider);
    if (newCards) {
      subscribeOnEvents(provider, newCards);
      yield put(setMyContracts(newCards));
    }

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_MY_CONTRACTS, getMyContractsSaga);
}

import {
  call, put, takeLatest, select, all,
} from '@redux-saga/core/effects';

import contractFormsSelector from 'store/contractForms/selectors';
import apiActions from 'store/ui/actions';
import { getCrowdsaleContractAdditionalData } from 'store/contractForms/actions';
import actionTypes from 'store/contractForms/actionTypes';
import {
  ICrowdsaleContract,
} from 'types';
import { setCrowdsaleContractForm } from 'store/contractForms/reducer';
import { getSymbolSaga } from './erc20/getSymbol';

export function* getCrowdsaleContractAdditionalDataSaga({
  type,
  payload: {
    provider,
  },
}: ReturnType<typeof getCrowdsaleContractAdditionalData>) {
  try {
    yield put(apiActions.request(type));

    const crowdsaleContract: ICrowdsaleContract = yield select(
      contractFormsSelector.getCrowdsaleContract,
    );

    const { tokenAddress } = crowdsaleContract;
    const tokenToSaleSymbol: string = yield call(getSymbolSaga, {
      type: actionTypes.GET_ERC20_SYMBOL,
      payload: {
        provider,
        tokenAddress,
      },
    });

    const { tokens } = crowdsaleContract;
    const paymentTokensSymbols: string[] = yield all(
      tokens.map(({ address }) => call(
        getSymbolSaga, {
          type: actionTypes.GET_ERC20_SYMBOL,
          payload: {
            provider,
            tokenAddress: address,
          },
        },
      )),
    );

    yield put(
      setCrowdsaleContractForm({
        ...crowdsaleContract,
        additional: {
          ...crowdsaleContract.additional,
          tokenToSaleSymbol,
          paymentTokensSymbols,
        },
      }),
    );
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(
    actionTypes.GET_CROWDSALE_CONTRACT_ADDITIONAL_DATA, getCrowdsaleContractAdditionalDataSaga,
  );
}

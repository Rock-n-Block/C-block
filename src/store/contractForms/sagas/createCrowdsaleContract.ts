import {
  all,
  call, CallEffect, put, select, takeLatest,
} from 'redux-saga/effects';

import BigNumber from 'bignumber.js';

import apiActions from 'store/ui/actions';
import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import { bep20Abi } from 'config/abi';
import { contractsHelper, convertIntervalAsSeconds, getTokenAmount } from 'utils';
import {
  ContractsNames, ICrowdsaleContract, UserState,
} from 'types';
import { baseApi } from 'store/api/apiRequestBuilder';
import actionTypes from '../actionTypes';
import { createCrowdsaleContract } from '../actions';
import { approveSaga } from './approveSaga';
import { getContractCreationPriceSaga } from './getContractCreationPriceSaga';

function* createCrowdsaleContractSaga({
  type,
  payload: { provider },
}: ReturnType<typeof createCrowdsaleContract>) {
  try {
    yield put(apiActions.request(type));

    const crowdsaleContract: ICrowdsaleContract = yield select(
      contractFormsSelector.getCrowdsaleContract,
    );
    const { isMainnet, address: myAddress }: UserState = yield select(
      userSelector.getUser,
    );

    const celoAddress = contractsHelper.getContractData(ContractsNames.celo, isMainnet).address;

    const {
      softcapTokens,
      amountBonusSection: isBonusable,
    } = crowdsaleContract;
    const isSoftcappable = Number(softcapTokens) > 0;

    const crowdsaleFactoryContractName =
      contractsHelper.getCrowdsaleFactoryContractName(isSoftcappable, isBonusable);
    const crowdsaleFactoryContractData = contractsHelper.getContractData(
      crowdsaleFactoryContractName as ContractsNames,
      isMainnet,
    );

    const crowdsaleFactoryContract = new provider.eth.Contract(
      crowdsaleFactoryContractData.abi,
      crowdsaleFactoryContractData.address,
    );

    const celoTokenContract = new provider.eth.Contract(
      bep20Abi,
      celoAddress,
    );

    const allowance = yield call(
      celoTokenContract.methods.allowance(
        myAddress,
        crowdsaleFactoryContractData.address,
      ).call,
    );

    const price: string = yield call(getContractCreationPriceSaga, {
      type: actionTypes.GET_CONTRACT_CREATION_PRICE,
      payload: {
        provider,
        contractType: 'crowdsale',
      },
    });

    const totalAmountToBeApproved = new BigNumber(price)
      .multipliedBy(2)
      .toFixed();
    const hasAllowance = new BigNumber(allowance).isGreaterThanOrEqualTo(totalAmountToBeApproved);
    if (hasAllowance) {
      yield call(approveSaga, {
        type: actionTypes.APPROVE,
        payload: {
          provider,
          spender: crowdsaleFactoryContractData.address,
          amount: totalAmountToBeApproved,
          tokenAddress: celoAddress,
        },
      });
    }

    const {
      contractName,
      crowdsaleOwner: crowdsaleOwnerAddress,
      tokenAddress,
      saleDuration: saleDurationAsDays,
      changingDates: isDatesChangeable,

      tokens,

      minInvestments,
      maxInvestments,

      minimumContribution,
      amountBonus,
    } = crowdsaleContract;

    const userToken = new provider.eth.Contract(
      bep20Abi,
      tokenAddress,
    );
    const tokenDecimals: string = yield call(
      userToken.methods.decimals().call,
    );

    const methodName = contractsHelper.getCrowdsaleFactoryContractMethodName(
      isSoftcappable,
      isBonusable,
      isDatesChangeable,
    );

    const contractMethodArgs: (string | string[] | number)[] = [
      [celoAddress, crowdsaleOwnerAddress],
      tokenAddress,
      tokenDecimals,
      convertIntervalAsSeconds(saleDurationAsDays, 'Day').toString(),
    ];
    if (isSoftcappable) {
      contractMethodArgs.push(
        getTokenAmount(
          new BigNumber(softcapTokens).toFixed(+tokenDecimals, 1),
          +tokenDecimals,
          false,
        ),
      );
    }

    const tokensAddresses: string[] = [];
    const ratesEffects: CallEffect<unknown>[] = [];
    const limits: string[] = [
      getTokenAmount(
        new BigNumber(minInvestments).toFixed(+tokenDecimals, 1),
        +tokenDecimals,
        false,
      ),
      getTokenAmount(
        new BigNumber(maxInvestments).toFixed(+tokenDecimals, 1),
        +tokenDecimals,
        false,
      ),
    ];
    tokens.forEach(({ address }) => {
      const contract = new provider.eth.Contract(bep20Abi, address);
      const decimals = call(contract.methods.decimals().call);
      ratesEffects.push(decimals);
      tokensAddresses.push(address);
    });
    const rates: string[] = yield all(ratesEffects);

    [
      tokensAddresses,
      rates,
      limits,
    ].forEach((item) => {
      contractMethodArgs.push(item);
    });
    if (isBonusable) {
      contractMethodArgs.push([
        getTokenAmount(
          new BigNumber(minimumContribution).toFixed(+tokenDecimals, 1),
          +tokenDecimals,
          false,
        ),
        getTokenAmount(
          new BigNumber(amountBonus).toFixed(1, 1),
          1,
          false,
        ),
      ]);
    }

    // TODO: remove before going to production
    console.log({
      crowdsaleFactoryContractAddress: crowdsaleFactoryContractData.address,
      contractMethodArgs,
    });

    const { transactionHash }: { transactionHash: string } = yield call(
      crowdsaleFactoryContract.methods[methodName](...contractMethodArgs).send,
      {
        from: myAddress,
      },
    );

    yield call(baseApi.createCrowdsaleContract, {
      tx_hash: transactionHash,
      name: contractName,
    });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_CROWDSALE_CONTRACT, createCrowdsaleContractSaga);
}

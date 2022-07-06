import {
  all,
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import apiActions from 'store/ui/actions';
import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import { contractsHelper, convertIntervalAsSeconds, getTokenAmount } from 'utils';
import {
  ContractsNames, ICrowdsaleContract, UserState,
} from 'types';
import { baseApi } from 'store/api/apiRequestBuilder';
import { approveSaga } from 'store/erc20/sagas/approveSaga';
import erc20ActionTypes from 'store/erc20/actionTypes';
import { Tokens } from 'types/utils/contractsHelper';
import { IconType } from 'components/Preview/Preview.helpers';
import actionTypes from '../actionTypes';
import { createCrowdsaleContract } from '../actions';
import { getContractCreationPriceSaga } from './getContractCreationPriceSaga';

const contractType: IconType = 'crowdsale';

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

    const crowdsaleFactoryContract = contractsHelper.getCrowdsaleFactoryContract(
      provider,
      crowdsaleFactoryContractData.abi,
      crowdsaleFactoryContractData.address,
    );

    const selectedBuyTokenName: Tokens = yield select(
      contractFormsSelector.selectBuyTokenName(contractType),
    );
    const selectedBuyTokenAddress = contractsHelper.getContractData(
      selectedBuyTokenName as ContractsNames, isMainnet,
    ).address;
    const selectedBuyTokenContract = contractsHelper.getBep20Contract(provider, selectedBuyTokenAddress);

    const allowance = yield call(
      selectedBuyTokenContract.methods.allowance(
        myAddress,
        crowdsaleFactoryContractData.address,
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
          spender: crowdsaleFactoryContractData.address,
          amount: totalAmountToBeApproved,
          tokenAddress: selectedBuyTokenAddress,
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

    const userToken = contractsHelper.getBep20Contract(provider, tokenAddress);
    const tokenDecimals: string = yield call(
      userToken.methods.decimals().call,
    );

    const methodName = contractsHelper.getCrowdsaleFactoryContractMethodName(
      isSoftcappable,
      isBonusable,
      isDatesChangeable,
    );

    const contractMethodArgs: (string | string[] | number)[] = [
      [selectedBuyTokenAddress, crowdsaleOwnerAddress],
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

    const ratesDecimals: string[] = yield all(
      tokens.map(({ address }) => {
        const contract = contractsHelper.getBep20Contract(provider, address);
        const decimalsPromise = call(contract.methods.decimals().call);
        return decimalsPromise;
      }),
    );
    const tokensAddresses: string[] = [];
    const rates: string[] = [];
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
    tokens.forEach(({ address, rate }, index) => {
      const decimals = ratesDecimals[index];
      rates.push(
        getTokenAmount(
          new BigNumber(rate).toFixed(+decimals, 1),
          +decimals,
          false,
        ),
      );
      tokensAddresses.push(address);
    });

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

    const { transactionHash }: TransactionReceipt = yield call(
      crowdsaleFactoryContract.methods[methodName](...contractMethodArgs).send,
      {
        from: myAddress,
      },
    );

    yield call(baseApi.createCrowdsaleContract, {
      tx_hash: transactionHash,
      name: contractName,
      is_testnet: !isMainnet,
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

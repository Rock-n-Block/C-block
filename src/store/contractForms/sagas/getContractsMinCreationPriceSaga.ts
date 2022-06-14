import {
  all,
  call,
  put,
  select,
  takeLatest,
} from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import BigNumber from 'bignumber.js';

import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import apiActions from 'store/ui/actions';
import {
  ContractFormsState, ContractsNames, UserState,
} from 'types';
import { contractsHelper } from 'utils';
import { IconType } from 'components/Preview/Preview.helpers';
import { baseApi } from 'store/api/apiRequestBuilder';
import { TGetRatesReturnType } from 'store/api/apiRequestBuilder.types';
import { getContractsMinCreationPrice } from '../actions';
import actionTypes from '../actionTypes';
import {
  setAllContractForms,
} from '../reducer';

export function* getContractsMinCreationPriceSaga({
  type,
  payload: {
    provider,
  },
}: ReturnType<typeof getContractsMinCreationPrice>) {
  try {
    yield put(apiActions.request(type));

    const { isMainnet }: UserState = yield select(
      userSelector.getUser,
    );

    const contractTypes: IconType[] = [
      'token',
      'lostkey',
      'will',
      'crowdsale',
      'weddingRing',
    ];

    // eslint-disable-next-line consistent-return, array-callback-return
    const pricesCalls = contractTypes.map((contractType) => {
      if (contractType === 'token') {
        // 8 - is a count of all variations of token contracts (futureMinting, freezable, burnable)
        const allVariations = [
          [0, 0, 0],
          [0, 0, 1],
          [0, 1, 0],
          [0, 1, 1],
          [1, 0, 0],
          [1, 0, 1],
          [1, 1, 0],
          [1, 1, 1],
        ];

        // tokenNonMintableNonFreezable 0/1
        // tokenNonMintableFreezable 0/1
        // tokenMintableNonFreezable 0/1
        // tokenMintableFreezable 0/1
        // eslint-disable-next-line arrow-body-style
        return allVariations.map(([futureMinting, freezable, burnable]) => {
          return {
            contractName: contractsHelper.getTokenFactoryContractName(
              !!futureMinting, !!freezable,
            ) as ContractsNames,
            priceMethodArgs: [burnable],
          };
        });
      }

      if (contractType === 'crowdsale') {
        // 8 - is a count of all variations of crowdsale contracts
        // [ isSoftcappable, isBonusable, isDatesChangeable ]
        const allVariations = [
          [0, 0, 0],
          [0, 0, 1],
          [0, 1, 0],
          [0, 1, 1],
          [1, 0, 0],
          [1, 0, 1],
          [1, 1, 0],
          [1, 1, 1],
        ];
        // crowdsaleNonSoftCappableNonBonusable 0/1
        // crowdsaleNonSoftCappableBonusable 0/1
        // crowdsaleSoftCappableNonBonusable 0/1
        // crowdsaleSoftCappableBonusable 0/1
        // eslint-disable-next-line arrow-body-style
        return allVariations.map(([isSoftcappable, isBonusable, isDatesChangeable]) => {
          return {
            contractName: contractsHelper.getCrowdsaleFactoryContractName(
              !!isSoftcappable, !!isBonusable,
            ) as ContractsNames,
            priceMethodArgs: [isDatesChangeable],
          };
        });
      }

      if (contractType === 'lostkey') {
        return [
          {
            contractName: ContractsNames.lostKeyFactory,
            priceMethodArgs: [],
          },
        ];
      }

      if (contractType === 'will') {
        return [
          {
            contractName: ContractsNames.lastWillFactory,
            priceMethodArgs: [],
          },
        ];
      }

      if (contractType === 'weddingRing') {
        return [
          {
            contractName: ContractsNames.weddingFactory,
            priceMethodArgs: [],
          },
        ];
      }
    }).map((calls) => Promise.allSettled(
      calls.map(({ contractName, priceMethodArgs }) => {
        const factoryContractData = contractsHelper.getContractData(
          contractName,
          isMainnet,
        );
        const contract = new provider.eth.Contract(
          factoryContractData.abi,
          factoryContractData.address,
        );

        const celoAddress = contractsHelper.getContractData(ContractsNames.celo, isMainnet).address;

        const contractCreationPrice: Promise<string> = contract.methods.price(celoAddress, ...priceMethodArgs).call();
        return contractCreationPrice;
      }),
    ));

    const awaitedPriceCalls: PromiseSettledResult<string>[][] = yield all(pricesCalls);

    // save fetched creation prices for each contract
    const allVariantsCreationPrices = awaitedPriceCalls.map(
      (settledPriceCalls) => settledPriceCalls.map(
        (result) => {
          if (result.status === 'fulfilled') return result.value;
          return '';
        },
      ),
    );

    const minCreationPrices = awaitedPriceCalls.map((settledPriceCalls) => {
      const filteredPrices = settledPriceCalls
        .filter(({ status }) => status === 'fulfilled')
        .map((item) => item.status === 'fulfilled' && item.value);
      const minCreationPrice = BigNumber.min(...filteredPrices).toFixed();
      return minCreationPrice;
    });

    const contractForms: ContractFormsState = yield select(
      contractFormsSelector.getContractForms,
    );
    const [
      tokenAllVariantsCreationPrices,
      lostkeyAllVariantsCreationPrices,
      willAllVariantsCreationPrices,
      crowdsaleAllVariantsCreationPrices,
      weddingAllVariantsCreationPrices,
    ] = allVariantsCreationPrices;
    const [
      tokenMinCreationPrice,
      lostkeyMinCreationPrice,
      willMinCreationPrice,
      crowdsaleMinCreationPrice,
      weddingMinCreationPrice,
    ] = minCreationPrices;

    const {
      data: [{
        rate: celoAsUsd,
      }],
    }: AxiosResponse<TGetRatesReturnType> = yield call(baseApi.getRates);

    yield put(setAllContractForms({
      tokenContract: {
        ...contractForms.tokenContract,
        additional: {
          ...contractForms.tokenContract.additional,
          allVariantsCreationPrices: tokenAllVariantsCreationPrices,
          minCreationPrice: {
            celo: tokenMinCreationPrice,
            usd: new BigNumber(tokenMinCreationPrice).multipliedBy(celoAsUsd).toFixed(),
          },
        },
      },
      crowdsaleContract: {
        ...contractForms.crowdsaleContract,
        additional: {
          ...contractForms.crowdsaleContract.additional,
          allVariantsCreationPrices: crowdsaleAllVariantsCreationPrices,
          minCreationPrice: {
            celo: crowdsaleMinCreationPrice,
            usd: new BigNumber(crowdsaleMinCreationPrice).multipliedBy(celoAsUsd).toFixed(),
          },
        },
      },
      lostKeyContract: {
        ...contractForms.lostKeyContract,
        additional: {
          ...contractForms.lostKeyContract.additional,
          allVariantsCreationPrices: lostkeyAllVariantsCreationPrices,
          minCreationPrice: {
            celo: lostkeyMinCreationPrice,
            usd: new BigNumber(lostkeyMinCreationPrice).multipliedBy(celoAsUsd).toFixed(),
          },
        },
      },
      willContract: {
        ...contractForms.willContract,
        additional: {
          ...contractForms.willContract.additional,
          allVariantsCreationPrices: willAllVariantsCreationPrices,
          minCreationPrice: {
            celo: willMinCreationPrice,
            usd: new BigNumber(willMinCreationPrice).multipliedBy(celoAsUsd).toFixed(),
          },
        },
      },
      weddingContract: {
        ...contractForms.weddingContract,
        additional: {
          ...contractForms.weddingContract.additional,
          allVariantsCreationPrices: weddingAllVariantsCreationPrices,
          minCreationPrice: {
            celo: weddingMinCreationPrice,
            usd: new BigNumber(weddingMinCreationPrice).multipliedBy(celoAsUsd).toFixed(),
          },
        },
      },
    }));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_CONTRACTS_MIN_CREATION_PRICE, getContractsMinCreationPriceSaga);
}

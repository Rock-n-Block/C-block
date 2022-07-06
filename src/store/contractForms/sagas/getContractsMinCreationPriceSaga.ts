import {
  all,
  put,
  select,
  takeLatest,
} from '@redux-saga/core/effects';
import BigNumber from 'bignumber.js';

import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import apiActions from 'store/ui/actions';
import {
  ContractFormsState, ContractsNames, UserState,
} from 'types';
import { contractsHelper } from 'utils';
import { IconType } from 'components/Preview/Preview.helpers';
import { getContractsMinCreationPrice } from '../actions';
import actionTypes from '../actionTypes';
import {
  setAllContractForms,
} from '../reducer';

const contractTypes: IconType[] = [
  'token',
  'lostkey',
  'will',
  'crowdsale',
  'weddingRing',
];

// eslint-disable-next-line consistent-return, array-callback-return
const generatePriceCallsForAllContractsVariants = () => contractTypes.map((contractType) => {
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
});

/**
 * Retrieve min contract creation price & allVariantsCreationPrices (price for each contract).
 */
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

    // eslint-disable-next-line consistent-return, array-callback-return
    const pricesCalls = generatePriceCallsForAllContractsVariants().map((calls) => Promise.allSettled(
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
        const cusdAddress = contractsHelper.getContractData(ContractsNames.cusd, isMainnet).address;

        const contractCreationPrices = Promise.all([
          contract.methods.price(celoAddress, ...priceMethodArgs).call(),
          contract.methods.price(cusdAddress, ...priceMethodArgs).call(),
        ] as Promise<string>[]);
        return contractCreationPrices;
      }),
    ));

    const awaitedPriceCalls: PromiseSettledResult<string[]>[][] = yield all(pricesCalls);

    // save fetched creation prices for each contract
    const allVariantsCreationPrices = awaitedPriceCalls.map(
      (settledPriceCalls) => settledPriceCalls.map(
        (result) => {
          if (result.status === 'fulfilled') return result.value;
          return [];
        },
      ),
    );

    const minCreationPrices = awaitedPriceCalls.map((settledPriceCalls) => {
      const filteredPrices = settledPriceCalls
        .filter(({ status }) => status === 'fulfilled')
        .map((item) => item.status === 'fulfilled' && item.value);
      const celoFilteredPrices = [];
      const cusdFilteredPrices = [];
      filteredPrices.forEach(([celoPrice, cusdPrice]) => {
        celoFilteredPrices.push(celoPrice);
        cusdFilteredPrices.push(cusdPrice);
      });
      const minCreationPrice = {
        celo: BigNumber.min(...celoFilteredPrices).toFixed(),
        cusd: BigNumber.min(...cusdFilteredPrices).toFixed(),
      };

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

    yield put(setAllContractForms({
      tokenContract: {
        ...contractForms.tokenContract,
        additional: {
          ...contractForms.tokenContract.additional,
          allVariantsCreationPrices: tokenAllVariantsCreationPrices,
          minCreationPrice: {
            ...tokenMinCreationPrice,
          },
        },
      },
      crowdsaleContract: {
        ...contractForms.crowdsaleContract,
        additional: {
          ...contractForms.crowdsaleContract.additional,
          allVariantsCreationPrices: crowdsaleAllVariantsCreationPrices,
          minCreationPrice: {
            ...crowdsaleMinCreationPrice,
          },
        },
      },
      lostKeyContract: {
        ...contractForms.lostKeyContract,
        additional: {
          ...contractForms.lostKeyContract.additional,
          allVariantsCreationPrices: lostkeyAllVariantsCreationPrices,
          minCreationPrice: {
            ...lostkeyMinCreationPrice,
          },
        },
      },
      willContract: {
        ...contractForms.willContract,
        additional: {
          ...contractForms.willContract.additional,
          allVariantsCreationPrices: willAllVariantsCreationPrices,
          minCreationPrice: {
            ...willMinCreationPrice,
          },
        },
      },
      weddingContract: {
        ...contractForms.weddingContract,
        additional: {
          ...contractForms.weddingContract.additional,
          allVariantsCreationPrices: weddingAllVariantsCreationPrices,
          minCreationPrice: {
            ...weddingMinCreationPrice,
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

import {
  call, put, select, takeLatest,
} from '@redux-saga/core/effects';

import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import apiActions from 'store/ui/actions';
import { ContractFormsState, ContractsNames, UserState } from 'types';
import { contractsHelper } from 'utils';
import { getContractCreationPrice } from '../actions';
import actionTypes from '../actionTypes';
import {
  setLostKeyContractForm, setTokenContractForm, setWillContractForm, setCrowdsaleContractForm,
} from '../reducer';

export function* getContractCreationPriceSaga({
  type,
  payload: {
    provider,
    contractType,
  },
}: ReturnType<typeof getContractCreationPrice>) {
  try {
    yield put(apiActions.request(type));

    const contractForms: ContractFormsState = yield select(
      contractFormsSelector.getContractForms,
    );
    const { isMainnet }: UserState = yield select(
      userSelector.getUser,
    );

    let contractName: ContractsNames;
    const priceMethodArgs: number[] = [];

    switch (contractType) {
      case 'token': {
        const { tokenContract: { futureMinting, freezable, burnable } } = contractForms;
        contractName = contractsHelper.getTokenFactoryContractName(
          futureMinting, freezable,
        ) as ContractsNames;
        priceMethodArgs.push(Number(burnable));
        break;
      }
      case 'lostkey': {
        contractName = ContractsNames.lostKeyFactory;
        break;
      }
      case 'will': {
        contractName = ContractsNames.lostKeyFactory;
        break;
      }
      case 'crowdsale': {
        const {
          crowdsaleContract: {
            softcapTokens,
            amountBonusSection: isBonusable,
            changingDates: isDatesChangeable,
          },
        } = contractForms;
        const isSoftcappable = Number(softcapTokens) > 0;
        contractName = contractsHelper.getCrowdsaleFactoryContractName(
          isSoftcappable, isBonusable,
        ) as ContractsNames;
        priceMethodArgs.push(Number(isDatesChangeable));
        break;
      }
      // TODO:  add more contractType handlers
      // case 'weddingRing': {
      //   contractName = ContractsNames.lostKeyFactory;
      //   break;
      // }
      default:
        break;
    }

    console.log({
      contractName,
      priceMethodArgs,
    });

    const factoryContractData = contractsHelper.getContractData(
      contractName,
      isMainnet,
    );
    const contract = new provider.eth.Contract(
      factoryContractData.abi,
      factoryContractData.address,
    );

    const celoAddress = contractsHelper.getContractData(ContractsNames.celo, isMainnet).address;

    const contractCreationPrice: string = yield call(contract.methods.price(celoAddress, ...priceMethodArgs).call);

    switch (contractType) {
      case 'token': {
        yield put(setTokenContractForm({
          ...contractForms.tokenContract,
          additional: {
            ...contractForms.tokenContract.additional,
            contractCreationPrice,
          },
        }));
        break;
      }
      case 'lostkey': {
        yield put(setLostKeyContractForm({
          ...contractForms.lostKeyContract,
          additional: {
            ...contractForms.lostKeyContract.additional,
            contractCreationPrice,
          },
        }));
        break;
      }
      case 'will': {
        yield put(setWillContractForm({
          ...contractForms.willContract,
          additional: {
            ...contractForms.willContract.additional,
            contractCreationPrice,
          },
        }));
        break;
      }
      case 'crowdsale': {
        yield put(setCrowdsaleContractForm({
          ...contractForms.crowdsaleContract,
          additional: {
            ...contractForms.crowdsaleContract.additional,
            contractCreationPrice,
          },
        }));
        break;
      }
      // TODO:  add more contractType handlers
      // case 'weddingRing': {
      //   contractName = ContractsNames.lostKeyFactory;
      //   break;
      // }
      default:
        break;
    }

    yield put(apiActions.success(type));
    return contractCreationPrice;
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
    return null;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_CONTRACT_CREATION_PRICE, getContractCreationPriceSaga);
}

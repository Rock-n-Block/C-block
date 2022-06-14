import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import apiActions from 'store/ui/actions';
import userSelector from 'store/user/selectors';
import contractFormsSelector from 'store/contractForms/selectors';

import { ContractFormsState, ContractsNames, UserState } from 'types';
import { TDeployCrowdsaleContractCreationMethodNames, TDeployTokenContractCreationMethodNames } from 'types/utils/contractsHelper';
import { contractsHelper, getTokenAmount } from 'utils';
import { setPrice } from '../actions';
import actionTypes from '../actionTypes';

function* setPriceSaga({
  type,
  payload: {
    provider,
    contractType,
    deployContractName,
    price,
  },
}: ReturnType<typeof setPrice>) {
  try {
    yield put(apiActions.request(type));

    const contractForms: ContractFormsState = yield select(
      contractFormsSelector.getContractForms,
    );
    const allVariantsContracts = contractsHelper.getFactoryContractMethodName(contractType);

    const { address: userWalletAddress, isMainnet }: UserState = yield select(userSelector.getUser);
    const celoDecimals = contractsHelper.getChainNativeCurrency(isMainnet).decimals;
    const serializedPrice = getTokenAmount(price, celoDecimals, false);

    let contractName: ContractsNames;
    let priceArg: string | string[] = [];
    if (contractType === 'Tokens') {
      const {
        isBurnable,
        isFreezable,
        isMintable,
      } = contractsHelper.getTokenFactoryCreationParamsByDeployMethodName(
        deployContractName as TDeployTokenContractCreationMethodNames,
      );
      contractName = contractsHelper.getTokenFactoryContractName(
        isMintable, isFreezable,
      ) as ContractsNames;

      priceArg = new Array(2).fill('');
      priceArg[+isBurnable] = serializedPrice;
      // need to retrieve another price on this contract, that is paired [0, 1] = [nonBurnable, burnable]
      const allVariantsContracts = contractsHelper.getFactoryContractMethodName(contractType);
      const tokenFactoryContractName = contractsHelper.getTokenFactoryContractMethodName(
        !isBurnable, isMintable, isFreezable,
      );
      const priceIndex = allVariantsContracts.findIndex(
        (deployContractMethodName) => deployContractMethodName === tokenFactoryContractName,
      );
      priceArg[+!isBurnable] = contractForms.tokenContract.additional.allVariantsCreationPrices[priceIndex];
    } else if (contractType === 'Crowdsales') {
      const {
        isBonusable, isDatesChangeable, isSoftcappable,
      } = contractsHelper.getCrowdsaleFactoryCreationParamsByDeployMethodName(
        deployContractName as TDeployCrowdsaleContractCreationMethodNames,
      );
      contractName = contractsHelper.getCrowdsaleFactoryContractName(
        isSoftcappable, isBonusable,
      ) as ContractsNames;

      priceArg = new Array(2).fill('');
      priceArg[+isDatesChangeable] = serializedPrice;
      // need to retrieve another price on this contract, that is paired [0, 1] = [nonDatesChangeable, datesChangeable]
      const crowdsaleFactoryContractName = contractsHelper.getCrowdsaleFactoryContractMethodName(
        isSoftcappable, isBonusable, !isDatesChangeable,
      );
      const priceIndex = allVariantsContracts.findIndex(
        (deployContractMethodName) => deployContractMethodName === crowdsaleFactoryContractName,
      );
      priceArg[+!isDatesChangeable] = contractForms.crowdsaleContract.additional.allVariantsCreationPrices[priceIndex];
    } else if (contractType === 'Last Will') {
      contractName = ContractsNames.lastWillFactory;
      priceArg = serializedPrice;
    } else if (contractType === 'Lost Key') {
      contractName = ContractsNames.lostKeyFactory;
      priceArg = serializedPrice;
    } else if (contractType === 'Wedding') {
      contractName = ContractsNames.weddingFactory;
      priceArg = serializedPrice;
    }

    const factoryContractData = contractsHelper.getContractData(
      contractName,
      isMainnet,
    );
    const contract = new provider.eth.Contract(
      factoryContractData.abi,
      factoryContractData.address,
    );

    const celoAddress = contractsHelper.getContractData(ContractsNames.celo, isMainnet).address;

    yield call(
      contract.methods.setPrice(celoAddress, priceArg).send,
      {
        from: userWalletAddress,
      },
    );

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err, err?.response);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.ADMIN_SET_PRICE, setPriceSaga);
}

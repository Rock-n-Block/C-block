import Web3 from 'web3';
import { Transaction } from 'web3-core';
import { EventData } from 'web3-eth-contract';

import {
  IContractsCard, IGetContractsCrowdsaleContractWithCreatedAtField, IGetContractsLostKeyContractWithCreatedAtField, IGetContractsTokenContractWithCreatedAtField, TGetContractsWithCreatedAtField,
} from 'pages/MyContracts/MyContracts.helpers';
import { TDeployContractCreationMethodNames, TDeployCrowdsaleContractCreationMethodNames, TDeployTokenContractCreationMethodNames } from 'types/utils/contractsHelper';
import {
  ICrowdsaleContract, ILostKeyContract, IWeddingContract, IWillContract, TokenContract,
} from 'types';
import rootStore from 'store/configureStore';
import {
  contractsHelper, convertIntervalFromSeconds, formattedDate, getTokenAmountDisplay,
} from 'utils';
import { bep20Abi } from 'config/abi';
import { getCeloConfigMetamask } from 'config';
import { getWeddingContract } from '../weddingContracts/sagas/getWeddingContracts.helpers';
import { enableWeddingRequestDivorce, enableWeddingRequestWithdrawal } from '../reducer';

export type TFunctionParams = {
  methodName: TDeployContractCreationMethodNames;
  params: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key in string]: any;
  };
  tx: Transaction;
};

const transformCreationDataToTokenContract = (
  methodName: TDeployTokenContractCreationMethodNames,
  params: TFunctionParams['params'],
  backendData: IGetContractsTokenContractWithCreatedAtField,
) => {
  const contractSettings = contractsHelper.getTokenFactoryCreationParamsByDeployMethodName(
    methodName,
  );
  const {
    tokenToPayAndOwner: [, tokenOwner],
    symbol: tokenSymbol,
    _decimals: decimals,

    owner: owners,
    initSupply,
    timestamp, // optional, presents only if `freezable`
  } = params;
  const tokensOwnersAsArray = Object
    .entries(backendData.addresses)
    .reduce((acc, [key, value]) => ({
      ...acc,
      [value.toString()]: key,
    }), {});
  const tokens = new Array(owners.length)
    .fill('')
    .map((_, index) => {
      const [
        frozenUntilDate, isFrozen,
      ] = contractSettings.isFreezable ? [
        timestamp[index], timestamp[index] !== '0',
      ] : ['', false];

      const address = owners[index];
      return {
        address,
        name: tokensOwnersAsArray[address],
        amount: getTokenAmountDisplay(initSupply[index], +decimals),
        frozenUntilDate: formattedDate('-', new Date(+frozenUntilDate * 1000)),
        isFrozen,
      };
    }) as TokenContract['tokens'];

  const ret: TokenContract = {
    tokenName: backendData.name,
    tokenOwner,
    tokenSymbol,
    decimals,
    futureMinting: contractSettings.isMintable,
    burnable: contractSettings.isBurnable,
    freezable: contractSettings.isFreezable,
    tokens,
    additional: {
      contractCreationPrice: '',
    },
  };
  return ret;
};

const transformCreationDataToCrowdsaleContract = async (
  methodName: TDeployCrowdsaleContractCreationMethodNames,
  params: TFunctionParams['params'],
  backendData: IGetContractsCrowdsaleContractWithCreatedAtField,
  web3: Web3,
) => {
  const contractSettings = contractsHelper.getCrowdsaleFactoryCreationParamsByDeployMethodName(
    methodName,
  );
  const {
    tokenToPayAndOwner: [, crowdsaleOwnerAddress],
    _token: tokenAddress,
    _tokenDecimals: tokenDecimals,
    _duration: durationAsSeconds,
    _soft_cap: softcap, // optional, presents only if `isSoftcapable`
    _tokens: tokensAddresses,
    _rates: rates,
    _limits: limits,
    _bonus: bonus, // optional, presents only if `isBonusable`
  } = params;
  const softcapTokens = contractSettings.isSoftcappable ? getTokenAmountDisplay(
    softcap, +tokenDecimals,
  ) : '';
  const minInvestments = getTokenAmountDisplay(limits[0], +tokenDecimals);
  const maxInvestments = getTokenAmountDisplay(limits[1], +tokenDecimals);
  const minimumContribution = contractSettings.isBonusable ? getTokenAmountDisplay(
    bonus[0],
    +tokenDecimals,
  ) : '';
  const amountBonus = contractSettings.isBonusable ? getTokenAmountDisplay(
    bonus[1],
    1,
  ) : '';

  const ratesDecimals = await Promise.all(
    tokensAddresses.map((address: string) => {
      const contract = new web3.eth.Contract(bep20Abi, address);
      const decimalsPromise = contract.methods.decimals().call();
      return decimalsPromise;
    }),
  );
  const tokens = new Array(ratesDecimals.length)
    .fill('')
    .map((rateDecimals, index) => ({
      address: tokensAddresses[index],
      rate: getTokenAmountDisplay(rates[index], +rateDecimals),
    })) as ICrowdsaleContract['tokens'];

  const ret: ICrowdsaleContract = {
    contractName: backendData.name,
    tokenAddress,
    crowdsaleOwner: crowdsaleOwnerAddress,
    softcapTokens,
    saleDuration: convertIntervalFromSeconds(durationAsSeconds, 'Day').toString(),
    changingDates: contractSettings.isDatesChangeable,

    minMaxInvestmentsSection: minInvestments !== '0' && maxInvestments !== '0',
    minInvestments,
    maxInvestments,

    amountBonusSection: contractSettings.isBonusable,
    amountBonus,
    minimumContribution,

    tokens,
    additional: {
      contractCreationPrice: '',
      tokenToSaleSymbol: '',
      paymentTokensSymbols: [
        '',
      ],
    },
  };
  return ret;
};

export const getContractCreationData = (
  methodName: TDeployContractCreationMethodNames,
  params: TFunctionParams['params'],
  tx: Transaction,
  backendData: TGetContractsWithCreatedAtField,
  web3: Web3,
) => {
  const celoDecimals = getCeloConfigMetamask(
    rootStore.store.getState().user.isMainnet,
  )[0].nativeCurrency.decimals;

  switch (methodName) {
    case 'deployLostKey': {
      const {
        _confirmationPeriod: pingIntervalAsSeconds,
        distributionReward: rewardAmount,
        _backupAddresses: reserveAddresses,
        _shares: percents,
      } = params;
      const backendLostKeyData = backendData as IGetContractsLostKeyContractWithCreatedAtField;
      const reservesConfigs = new Array(reserveAddresses.length)
        .fill('')
        .map((_, index) => ({
          email: backendLostKeyData.mails ? backendLostKeyData.mails[index] : '',
          percents: percents[index],
          reserveAddress: reserveAddresses[index],
        })) as ILostKeyContract['reservesConfigs'] | IWillContract['reservesConfigs'];
      const ret: ILostKeyContract | IWillContract = {
        contractName: backendLostKeyData.name,
        managementAddress: tx.from,
        ownerEmail: backendLostKeyData.owner_mail,
        pingIntervalAsDateUnits: 'Day',
        pingIntervalAsValue: convertIntervalFromSeconds(
          pingIntervalAsSeconds,
          'Day',
        ).toString(),
        reservesConfigs,
        rewardAmount: getTokenAmountDisplay(rewardAmount, +celoDecimals),
        additional: {
          contractCreationPrice: '',
        },
      };
      return ret;
    }
    case 'deployWedding': {
      const {
        _firstPartner: partnerOneAddress,
        _secondPartner: partnerTwoAddress,
        _decisionTimeDivorce: secondsForDivorceApproval,
        _decisionTimeWithdrawal: secondsForWithdrawalApproval,
        _percentageToProposingWhenDisputed: partnerOneSliderValue,
      } = params;
      const ret: IWeddingContract = {
        contractName: backendData.name,
        partnerOneAddress,
        partnerTwoAddress,
        partnerOneEmail: backendData.mails[0],
        partnerTwoEmail: backendData.mails[1],
        partnerOneSliderValue: +partnerOneSliderValue,
        partnerTwoSliderValue: 100 - Number(partnerOneSliderValue),
        daysForDivorceApproval: convertIntervalFromSeconds(
          secondsForDivorceApproval, 'Day', false,
        ).toString(),
        daysForWithdrawalApproval: convertIntervalFromSeconds(
          secondsForWithdrawalApproval, 'Day', false,
        ).toString(),
        additional: {
          contractCreationPrice: '',
        },
      };
      return ret;
    }
    // Token
    case 'deployERC20PausableToken': {
      return transformCreationDataToTokenContract(methodName, params, backendData);
    }
    case 'deployERC20PausableFreezableToken': {
      return transformCreationDataToTokenContract(methodName, params, backendData);
    }
    case 'deployERC20MintablePausableToken': {
      return transformCreationDataToTokenContract(methodName, params, backendData);
    }
    case 'deployERC20MintablePausableFreezableToken': {
      return transformCreationDataToTokenContract(methodName, params, backendData);
    }
    case 'deployERC20BurnablePausableToken': {
      return transformCreationDataToTokenContract(methodName, params, backendData);
    }
    case 'deployERC20BurnablePausableFreezableToken': {
      return transformCreationDataToTokenContract(methodName, params, backendData);
    }
    case 'deployERC20BurnableMintablePausableToken': {
      return transformCreationDataToTokenContract(methodName, params, backendData);
    }
    case 'deployERC20BurnableMintablePausableFreezableToken': {
      return transformCreationDataToTokenContract(methodName, params, backendData);
    }

    // Crowdsale
    case 'deploySoftCappableDatesChangeableCrowdsale': {
      return transformCreationDataToCrowdsaleContract(methodName, params, backendData, web3);
    }
    case 'deploySoftCappableCrowdsale': {
      return transformCreationDataToCrowdsaleContract(methodName, params, backendData, web3);
    }
    case 'deploySoftCappableBonusableDatesChangeableCrowdsale': {
      return transformCreationDataToCrowdsaleContract(methodName, params, backendData, web3);
    }
    case 'deploySoftCappableBonusableCrowdsale': {
      return transformCreationDataToCrowdsaleContract(methodName, params, backendData, web3);
    }
    case 'deployNonSoftCappableDatesChangeableCrowdsale': {
      return transformCreationDataToCrowdsaleContract(methodName, params, backendData, web3);
    }
    case 'deployNonSoftCappableCrowdsale': {
      return transformCreationDataToCrowdsaleContract(methodName, params, backendData, web3);
    }
    case 'deployNonSoftCappableBonusableDatesChangeableCrowdsale': {
      return transformCreationDataToCrowdsaleContract(methodName, params, backendData, web3);
    }
    case 'deployNonSoftCappableBonusableCrowdsale': {
      return transformCreationDataToCrowdsaleContract(methodName, params, backendData, web3);
    }
    default: {
      throw new Error('Wrong method name MyContracts');
    }
  }
};

export const subscribeToAllWeddingEvents = (
  provider: Web3,
  contractAddress: string,
  divorceProposedCb: (error: Error, event: EventData) => void,
  withdrawalProposedCb: (error: Error, event: EventData) => void,
) => {
  const contract = getWeddingContract(provider, contractAddress);
  contract.once('DivorceProposed', divorceProposedCb);
  contract.once('WithdrawalProposed', withdrawalProposedCb);
};

export const subscribeOnEvents = (provider: Web3, data: IContractsCard[]) => {
  data.forEach(({ address, contractType }) => {
    if (contractType === 'Wedding contract') {
      console.log('Subscribe to all weddings Events');
      subscribeToAllWeddingEvents(provider, address, (error, event) => {
        console.log('divorce INIT', event);
        rootStore.store.dispatch(enableWeddingRequestWithdrawal({
          address,
        }));
      }, (error, event) => {
        console.log('withdrawal INIT', event);
        rootStore.store.dispatch(enableWeddingRequestDivorce({
          address,
        }));
      });
    }
  });
};

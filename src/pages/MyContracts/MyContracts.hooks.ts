import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Transaction } from 'web3-core';
import Web3 from 'web3';

import { useWalletConnectorContext } from 'services';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { baseApi } from 'store/api/apiRequestBuilder';
import {
  IContractData,
  IGetContractsReturnType,
  TGetContracts,
} from 'store/api/apiRequestBuilder.types';
import {
  contractsHelper,
  convertIntervalFromSeconds,
  formattedDate,
  getTokenAmountDisplay,
} from 'utils';
import {
  ICrowdsaleContract,
  ILostKeyContract, IWeddingContract, IWillContract, TokenContract,
} from 'types';
import rootStore from 'store/configureStore';
import { getCeloConfigMetamask } from 'config';
import { TDeployContractCreationMethodNames, TDeployCrowdsaleContractCreationMethodNames, TDeployTokenContractCreationMethodNames } from 'types/utils/contractsHelper';
import { bep20Abi } from 'config/abi';
import {
  createContractCards,
  IGetContractsCrowdsaleContractWithCreatedAtField,
  IGetContractsLostKeyContractWithCreatedAtField,
  IGetContractsTokenContractWithCreatedAtField,
  IGetContractsWithContractCreationField,
  IGetContractsWithCreatedAtField,
  TGetContractsWithCreatedAtField,
} from './MyContracts.helpers';

type TFunctionParams = {
  methodName: TDeployContractCreationMethodNames;
  params: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key in string]: any;
  };
  tx: Transaction;
};

const transforms = {
  transformCreationDataToTokenContract(
    methodName: TDeployTokenContractCreationMethodNames,
    params: TFunctionParams['params'],
    backendData: IGetContractsTokenContractWithCreatedAtField,
  ) {
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
    const tokens = new Array(owners.length)
      .fill('')
      .map((_, index) => {
        const [
          frozenUntilDate, isFrozen,
        ] = contractSettings.isFreezable ? [
          timestamp[index], timestamp[index] === '0',
        ] : ['', false];
        console.log('adfdfdfd', frozenUntilDate);
        return {
          address: owners[index],
          name: 'TO BE DEFINED',
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
  },

  async transformCreationDataToCrowdsaleContract(
    methodName: TDeployCrowdsaleContractCreationMethodNames,
    params: TFunctionParams['params'],
    backendData: IGetContractsCrowdsaleContractWithCreatedAtField,
    web3: Web3,
  ) {
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
        const decimalsPromise = contract.methods.decimals().call;
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
  },
};

const {
  transformCreationDataToTokenContract,
  transformCreationDataToCrowdsaleContract,
} = transforms;

const getContractCreationData = (
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

export const useSearch = <T extends Array<unknown>>(
  initList: T,
  debounceDelay = 500,
) => {
  const [filteredList, setFilteredList] = useState<T>(initList);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, debounceDelay);

  const searchHandler = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  useEffect(() => {
    if (!debouncedSearchValue) {
      setFilteredList(initList);
    } else {
      const newFilteredList = initList.filter(({ contractName }) => {
        const isContractNameInSearch = contractName
          .toLowerCase()
          .includes(debouncedSearchValue.toLowerCase());
        return isContractNameInSearch;
      });
      setFilteredList(newFilteredList as T);
    }
  }, [debouncedSearchValue, initList]);

  return {
    searchValue,
    searchHandler,
    setSearchValue,
    debouncedSearchValue,
    filteredList,
  };
};

export const useMyContracts = () => {
  const { walletService } = useWalletConnectorContext();
  const { address: userWalletAddress } = useShallowSelector(
    userSelector.getUser,
  );

  // TODO: move to redux
  const fetchMyContracts = useCallback(async () => {
    const { data } = await baseApi.getContracts({
      walletAddress: userWalletAddress,
    });
    console.log(`Retrieved history for ${userWalletAddress}`, data);
    return data;
  }, [userWalletAddress]);

  const transformCreatedAtField = useCallback(
    async (data: IGetContractsReturnType) => {
      const ret = { ...data };
      const web3 = walletService.Web3();

      await Promise.all(
        Object.keys(ret).map(async (key) => {
          const contractsArr = ret[key] as IContractData[];
          const txReceipts = await Promise.all(
            contractsArr.map(({ tx_hash }) => web3.eth.getTransactionReceipt(tx_hash)),
          );
          const blocksInformation = await Promise.all(
            txReceipts.map(({ blockNumber }) => web3.eth.getBlock(blockNumber)),
          );

          ret[key] = ret[key].map(
            (contractData: TGetContracts, index: number) => ({
              ...contractData,
              createdAt: blocksInformation[index].timestamp,
            }),
          );
        }),
      );
      return ret as IGetContractsWithCreatedAtField;
    },
    [walletService],
  );

  const transformContractCreationField = useCallback(
    async (data: IGetContractsWithCreatedAtField) => {
      const web3 = walletService.Web3();

      const txSelectorPromise = ({ tx_hash }) => web3.eth.getTransaction(tx_hash);
      const txReceipts = await Promise.all(
        [
          data.lostkeys.map(txSelectorPromise),
          data.lastwills.map(txSelectorPromise),
          data.crowdsales.map(txSelectorPromise),
          data.tokens.map(txSelectorPromise),
          data.weddings.map(txSelectorPromise),
        ].map((item) => Promise.all(item)),
      );

      const { methodNameSignatureMap, signatureMethodNameMap } =
        contractsHelper.getDeployMethodNameSignatureMap(web3);

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
          params: web3.eth.abi.decodeParameters(
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

      await Promise.all(
        Object.keys(ret).map(async (key) => {
          const paramsArr = paramsObj[key];
          ret[key] = await Promise.all(
            ret[key].map(
              async (contractData: TGetContractsWithCreatedAtField, index: number) => {
                const { methodName, params, tx } = paramsArr[index] as TFunctionParams;
                const contractCreationData = await getContractCreationData(
                  methodName,
                  params,
                  tx,
                  contractData,
                  web3,
                );
                return {
                  ...contractData,
                  contractCreationData,
                };
              },
            ),
          );
        }),
      );
      return ret as IGetContractsWithContractCreationField;
    },
    [walletService],
  );

  const transformMyContractsData = useCallback(
    async (data: IGetContractsReturnType) => {
      const dataWithCreatedAtField = await transformCreatedAtField(data);
      const dataWithCreationParams = await transformContractCreationField(
        dataWithCreatedAtField,
      );
      console.log('Transformed data', dataWithCreationParams);

      return dataWithCreationParams;
    },
    [transformContractCreationField, transformCreatedAtField],
  );

  const fetchAndTransformContracts = useCallback(async () => {
    if (!userWalletAddress) return undefined;
    const data = await fetchMyContracts();
    const transformedData = await transformMyContractsData(data);
    const newContracts = createContractCards(transformedData);
    console.log('New Conctracts Cards', newContracts);
    return newContracts;
  }, [fetchMyContracts, transformMyContractsData, userWalletAddress]);

  return { fetchAndTransformContracts };
};

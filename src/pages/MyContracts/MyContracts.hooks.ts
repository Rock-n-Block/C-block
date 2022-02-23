import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useWalletConnectorContext } from 'services';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { baseApi } from 'store/api/apiRequestBuilder';
import { IContractData, IGetContractsReturnType, IGetContractsSplittedProbatesReturnType } from 'store/api/apiRequestBuilder.types';
import { contractsHelper } from 'utils';
import { ContractsNames } from 'types';
import {
  createContractCards, IGetContractsWithCreatedAtField,
} from './MyContracts.helpers';

export const useSearch = <T extends Array<unknown>>(initList: T, debounceDelay = 500) => {
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
        const isContractNameInSearch = contractName.toLowerCase().includes(
          debouncedSearchValue.toLowerCase(),
        );
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
  const { address: userWalletAddress, isMainnet } = useShallowSelector(userSelector.getUser);

  // TODO: move to redux
  const fetchMyContracts = useCallback(async () => {
    const { data } = await baseApi.getContracts({
      walletAddress: userWalletAddress,
    });
    console.log(`Retrieved history for ${userWalletAddress}`, data);
    return data;
  }, [userWalletAddress]);

  const transformSplitProbatesIntoLostkeyAndLastWill = useCallback(
    async (data: IGetContractsReturnType) => {
      const ret = {
        ...data,
        lostkeys: [],
        lastwills: [],
      };
      const { probates } = ret;
      delete ret.probates;

      const web3 = walletService.Web3();
      const probatesReceipts = await Promise.all(
        probates.map(
          ({ tx_hash }) => web3.eth.getTransactionReceipt(tx_hash),
        ),
      );
      probatesReceipts.forEach(({ logs }, index) => {
        const probate = probates[index];

        logs.find(({ address }) => {
          const lowercasedLogAddress = address.toLowerCase();
          const lostKeyFactory = contractsHelper.getContractData(
            ContractsNames.lostKeyFactory, isMainnet,
          );
          if (lostKeyFactory.address.toLowerCase() === lowercasedLogAddress) {
            ret.lostkeys.push(probate);
            return true;
          }

          const lastWillFactory = contractsHelper.getContractData(
            ContractsNames.lastWillFactory, isMainnet,
          );
          if (lastWillFactory.address.toLowerCase() === lowercasedLogAddress) {
            ret.lastwills.push(probate);
            return true;
          }
          return false;
        });
      });
      return ret as IGetContractsSplittedProbatesReturnType;
    },
    [isMainnet, walletService],
  );

  const transformCreatedAtField = useCallback(
    async (data: IGetContractsSplittedProbatesReturnType) => {
      const ret: IGetContractsSplittedProbatesReturnType = { ...data };
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

          ret[key] = ret[key].map((contractData, index) => ({
            ...contractData,
            createdAt: blocksInformation[index].timestamp,
          }));
        }),
      );
      return ret as IGetContractsWithCreatedAtField;
    },
    [walletService],
  );

  const transformMyContractsData = useCallback(async (data: IGetContractsReturnType) => {
    const dataWithSplittedProbates = await transformSplitProbatesIntoLostkeyAndLastWill(data);
    const dataWithCreatedAtField = await transformCreatedAtField(dataWithSplittedProbates);
    console.log('Transformed data', dataWithCreatedAtField);

    return dataWithCreatedAtField;
  }, [transformCreatedAtField, transformSplitProbatesIntoLostkeyAndLastWill]);

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

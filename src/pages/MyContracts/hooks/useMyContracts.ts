import { useCallback } from 'react';
import { Transaction } from 'web3-core';

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
} from 'utils';
import { TDeployContractCreationMethodNames } from 'types/utils/contractsHelper';
import {
  createContractCards,
  IGetContractsWithContractCreationField,
  IGetContractsWithCreatedAtField,
  TGetContractsWithCreatedAtField,
} from '../MyContracts.helpers';
import { getContractCreationData } from './useMyContracts.helpers';

type TFunctionParams = {
  methodName: TDeployContractCreationMethodNames;
  params: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key in string]: any;
  };
  tx: Transaction;
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

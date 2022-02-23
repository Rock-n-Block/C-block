import React, {
  FC, useCallback, useEffect, useState, ComponentProps,
} from 'react';
import {
  Box, Button,
  Container, Grid, IconButton, TextField, Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useDebounce } from 'use-debounce';
import { noop } from 'lodash';

import { NetTag } from 'containers/Header/components/NetTag';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import {
  SetUpModal,
  ConfirmStatusModal,
  SendTransactionModal,
  RequestWithdrawalModal,
  GetFundsModal,
} from 'components';
import { CheckmarkCircleIcon, SearchIcon } from 'theme/icons';
import { useWalletConnectorContext } from 'services';
import { baseApi } from 'store/api/apiRequestBuilder';
import { IContractData, IGetContractsReturnType } from 'store/api/apiRequestBuilder.types';
import {
  AdditionalContent, AdditionalContentRequestDivorce, AdditionalContentRequestWithdrawal,
} from './components';
import {
  contractButtons as contractButtonsHelper, createContractCards, IContractsCard, IGetContractsWithCreatedAtField, TContractButtonsTypes,
} from './MyContracts.helpers';
import { useStyles } from './MyContracts.styles';

const useSearch = <T extends Array<unknown>>(initList: T, debounceDelay = 500) => {
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

export const MyContracts: FC = () => {
  const [cards, setCards] = useState<IContractsCard[]>([]);
  const { filteredList: filteredCards, searchHandler } = useSearch(cards);

  const [isSetUpModalOpen, setIsSetUpModalOpen] = useState(false);
  const [isConfirmLiveStatusModalOpen, setIsConfirmLiveStatusModalOpen] = useState(false);
  const [isConfirmActiveStatusModalOpen, setIsConfirmActiveStatusModalOpen] = useState(false);
  const [isSendTransactionModalOpen, setIsSendTransactionModalOpen] = useState(false);
  const [isRequestWithdrawalModalOpen, setIsRequestWithdrawalModalOpen] = useState(false);
  const [isGetFundsModalOpen, setIsGetFundsModalOpen] = useState(false);

  const classes = useStyles();
  const { address: userWalletAddress } = useShallowSelector(userSelector.getUser);

  const openSetUpModal = useCallback(() => setIsSetUpModalOpen(true), []);
  const openConfirmLiveStatusModal = useCallback(() => setIsConfirmLiveStatusModalOpen(true), []);
  const openConfirmActiveStatusModal = useCallback(() => setIsConfirmActiveStatusModalOpen(true), []);
  const openSendTransactionModal = useCallback(() => setIsSendTransactionModalOpen(true), []);
  const openRequestWithdrawalModal = useCallback(() => setIsRequestWithdrawalModalOpen(true), []);
  const openGetFundsModal = useCallback(() => setIsGetFundsModalOpen(true), []);

  const [withdrawalActions, setWithdrawalActions] = useState<ComponentProps<typeof RequestWithdrawalModal> | {}>({});
  const [getFundsActions, setGetFundsActions] = useState<ComponentProps<typeof GetFundsModal> | {}>({});
  const { walletService } = useWalletConnectorContext();

  const buttonClickHandler = useCallback(async (contractKey: string, type: TContractButtonsTypes) => {
    switch (type) {
      case 'requestWithdrawal': {
        openRequestWithdrawalModal();
        setWithdrawalActions({
          ...withdrawalActions,
          onAccept: () => {
            const newState = cards.map((card, index) => {
              if (+contractKey === index) {
                return {
                  ...card,
                  additionalContentRenderType: 'weddingRequestWithdrawal',
                  contractButtons: [
                    contractButtonsHelper.viewContract,
                    contractButtonsHelper.requestDivorce,
                  ],
                } as typeof card;
              }
              return card;
            });
            setCards(newState);
          },
        });
        break;
      }
      case 'requestDivorce': {
        // TODO: remove this due to only for development purpose
        setTimeout(() => {
          const newState = cards.map((card, index) => {
            if (+contractKey === index) {
              return {
                ...card,
                additionalContentRenderType: 'weddingRequestDivorce',
                contractButtons: [
                  contractButtonsHelper.viewContract,
                ],
              } as typeof card;
            }
            return card;
          });
          setCards(newState);
        }, 5000);
        openSendTransactionModal();
        break;
      }
      case 'divorceApprove': {
        const newState = cards.map((card, index) => {
          if (+contractKey === index) {
            return {
              ...card,
              additionalContentRenderType: 'weddingSuccessfulDivorce',
              contractButtons: [
                contractButtonsHelper.viewContract,
                contractButtonsHelper.getFunds,
              ],
            } as typeof card;
          }
          return card;
        });
        setCards(newState);
        break;
      }
      case 'withdrawalApprove': {
        const newState = cards.map((card, index) => {
          if (+contractKey === index) {
            return {
              ...card,
              additionalContentRenderType: 'weddingSuccessfulWithdrawal',
              contractButtons: [
                contractButtonsHelper.viewContract,
              ],
            } as typeof card;
          }
          return card;
        });
        setCards(newState);
        break;
      }
      case 'setUp': {
        openSetUpModal();
        break;
      }
      case 'confirmLiveStatus': {
        openConfirmLiveStatusModal();
        break;
      }
      case 'confirmActiveStatus': {
        openConfirmActiveStatusModal();
        break;
      }
      case 'getFunds': {
        openGetFundsModal();
        setGetFundsActions({
          ...getFundsActions,
          onAccept: () => {
            openSendTransactionModal();
          },
        });
        break;
      }
      default: {
        break;
      }
    }
  }, [cards, getFundsActions, openConfirmActiveStatusModal, openConfirmLiveStatusModal, openGetFundsModal, openRequestWithdrawalModal, openSendTransactionModal, openSetUpModal, withdrawalActions]);

  const renderAdditionalContent = useCallback(({ additionalContentRenderType, contractKey }: IContractsCard) => {
    switch (additionalContentRenderType) {
      case 'weddingRequestDivorce':
        return (
          <AdditionalContentRequestDivorce
            onApprove={() => buttonClickHandler(contractKey, 'divorceApprove')}
            onReject={noop}
          />
        );
      case 'weddingRequestWithdrawal':
        return (
          <AdditionalContentRequestWithdrawal
            onApprove={() => buttonClickHandler(contractKey, 'withdrawalApprove')}
            onReject={noop}
          />
        );
      case 'weddingSuccessfulDivorce':
        return (
          <AdditionalContent>
            <Box className={classes.successfulAdditionalContent}>
              <CheckmarkCircleIcon />
              <Typography
                className={clsx(classes.successfulAdditionalContentText, 'l')}
                variant="body1"
              >
                There was a successful divorce
              </Typography>
            </Box>
          </AdditionalContent>
        );
      case 'weddingSuccessfulWithdrawal':
        return (
          <AdditionalContent>
            <Box className={classes.successfulAdditionalContent}>
              <CheckmarkCircleIcon />
              <Typography
                className={clsx(classes.successfulAdditionalContentText, 'l')}
                variant="body1"
              >
                There was a successful withdrawal
              </Typography>
            </Box>
          </AdditionalContent>
        );
      default:
        return null;
    }
  }, [buttonClickHandler, classes.successfulAdditionalContent, classes.successfulAdditionalContentText]);

  const transformCreatedAtField = async (data: IGetContractsReturnType) => {
    const ret: IGetContractsReturnType = { ...data };
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
  };

  // TODO: move to redux
  useEffect(() => {
    if (userWalletAddress) {
      const getContracts = async () => {
        const { data } = await baseApi.getContracts({
          walletAddress: userWalletAddress,
        });
        console.log(`Retrieved history for ${userWalletAddress}`, data);
        const dataWithCreatedAtField = await transformCreatedAtField(data);
        console.log('Transformed data', dataWithCreatedAtField);
        const newContracts = createContractCards(dataWithCreatedAtField);
        console.log('New Conctracts Cards', newContracts);
        setCards(newContracts);
      };
      getContracts();
    }
  }, [userWalletAddress]);

  return (
    <Container>
      <SendTransactionModal
        open={isSendTransactionModalOpen}
        setIsModalOpen={setIsSendTransactionModalOpen}
      />
      <GetFundsModal
        open={isGetFundsModalOpen}
        setIsModalOpen={setIsGetFundsModalOpen}
        {...getFundsActions}
      />
      <RequestWithdrawalModal
        open={isRequestWithdrawalModalOpen}
        setIsModalOpen={setIsRequestWithdrawalModalOpen}
        {...withdrawalActions}
      />
      <SetUpModal open={isSetUpModalOpen} setIsModalOpen={setIsSetUpModalOpen} />
      <ConfirmStatusModal
        open={isConfirmLiveStatusModalOpen}
        setIsModalOpen={setIsConfirmLiveStatusModalOpen}
        date={new Date()}
        statusType="live"
      />
      <ConfirmStatusModal
        open={isConfirmActiveStatusModalOpen}
        setIsModalOpen={setIsConfirmActiveStatusModalOpen}
        date={new Date()}
        statusType="active"
      />
      <Grid container className={classes.root}>
        <TextField
          id="input-with-icon-textfield"
          placeholder="Search contract"
          onChange={(e) => searchHandler(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          className={classes.search}
        />
        {filteredCards.map(({
          contractKey,
          contractName,
          contractDate,
          contractType,
          contractLogo,
          contractButtons,
          isTestnet,
        }, cardIndex) => (
          <Box
            key={contractKey}
            className={classes.contractBlock}
          >
            <Box className={classes.contractHead}>
              <Typography color="textSecondary">{contractType}</Typography>
              <NetTag className={classes.chainTag} isTestnet={isTestnet} />
            </Box>
            <Typography
              className={classes.contractDate}
              color="textSecondary"
            >
              {contractDate}
            </Typography>

            <Box className={classes.contractTitle}>
              <IconButton>{contractLogo}</IconButton>
              <Typography variant="h3">{contractName}</Typography>
            </Box>
            {
              renderAdditionalContent(filteredCards[cardIndex])
            }
            <Box className={classes.contractBottom}>
              <Box className={classes.contractButtons}>
                {contractButtons.map(({
                  type, title,
                }, index) => (
                  <Button
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${type}_${index}`}
                    className={classes.button}
                    value={type}
                    variant="outlined"
                    onClick={() => buttonClickHandler(contractKey, type)}
                  >
                    {title}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

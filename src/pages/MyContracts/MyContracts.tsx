import React, {
  FC, useCallback, useEffect, useState, ComponentProps,
} from 'react';
import { useNavigate } from 'react-router';
import {
  Box, Button,
  Container, Grid, IconButton, TextField, Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { noop } from 'lodash';

import { NetTag } from 'containers/Header/components/NetTag';
// import { useShallowSelector } from 'hooks';
// import userSelector from 'store/user/selectors';
import {
  SetUpModal,
  ConfirmStatusModal,
  SendTransactionModal,
  RequestWithdrawalModal,
  GetFundsModal,
  CompleteModal,
} from 'components';
import { CheckmarkCircleIcon, SearchIcon } from 'theme/icons';
// import { useWalletConnectorContext } from 'services';
import {
  CROWDSALE_CONTRACT, LOSTKEY_CONTRACT, routes, TOKEN_CONTRACT, WEDDING_CONTRACT, WILL_CONTRACT,
} from 'appConstants';
import {
  TPreviewContractNavigationState,
  ILostKeyContract, ICrowdsaleContract, IWeddingContract, IWillContract, TokenContract,
} from 'types';
import {
  AdditionalContent, AdditionalContentRequestDivorce, AdditionalContentRequestWithdrawal,
} from './components';
import {
  contractButtonsHelper, IContractsCard, isFoundContractKey, TContractButtonsTypes,
} from './MyContracts.helpers';
import {
  useSearch, useMyContracts, useMyWeddingContract, useMyLostKeyContract,
} from './hooks';
import { useStyles } from './MyContracts.styles';

export const MyContracts: FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<IContractsCard[]>([]);
  const { filteredList: filteredCards, searchHandler } = useSearch(cards);

  const [isSetUpModalOpen, setIsSetUpModalOpen] = useState(false);
  const [isConfirmLiveStatusModalOpen, setIsConfirmLiveStatusModalOpen] = useState(false);
  const [isConfirmActiveStatusModalOpen, setIsConfirmActiveStatusModalOpen] = useState(false);
  const [isSendTransactionModalOpen, setIsSendTransactionModalOpen] = useState(false);
  const [isRequestWithdrawalModalOpen, setIsRequestWithdrawalModalOpen] = useState(false);
  const [isGetFundsModalOpen, setIsGetFundsModalOpen] = useState(false);

  const classes = useStyles();
  // const { address: userWalletAddress } = useShallowSelector(userSelector.getUser);

  const openSetUpModal = useCallback(() => setIsSetUpModalOpen(true), []);
  const openConfirmLiveStatusModal = useCallback(() => setIsConfirmLiveStatusModalOpen(true), []);
  const openConfirmActiveStatusModal = useCallback(() => setIsConfirmActiveStatusModalOpen(true), []);
  const openSendTransactionModal = useCallback(() => setIsSendTransactionModalOpen(true), []);
  const openRequestWithdrawalModal = useCallback(() => setIsRequestWithdrawalModalOpen(true), []);
  const openGetFundsModal = useCallback(() => setIsGetFundsModalOpen(true), []);

  const [withdrawalActions, setWithdrawalActions] = useState<ComponentProps<typeof RequestWithdrawalModal> | {}>({});
  const [getFundsActions, setGetFundsActions] = useState<ComponentProps<typeof GetFundsModal> | {}>({});
  const [
    resultModalState, setResultModalState,
  ] = useState<ComponentProps<typeof CompleteModal>>({ open: false, result: false });

  const closeSendTransactionModal = useCallback(() => setIsSendTransactionModalOpen(false), []);
  const closeResultModal = useCallback(() => {
    setResultModalState({
      ...resultModalState,
      open: false,
    });
    // dispatch(apiActions.reset(contractActionType));
  }, [resultModalState]);

  // const { walletService } = useWalletConnectorContext();

  const onSuccessTx = useCallback(() => {
    setResultModalState({ open: true, result: true });
  }, []);
  const onErrorTx = useCallback(() => {
    setResultModalState({ open: true, result: false });
  }, []);
  const onFinishTx = useCallback(() => {
    closeSendTransactionModal();
  }, [closeSendTransactionModal]);

  const { handleGetFundsAfterDivorce } = useMyWeddingContract(onSuccessTx, onErrorTx, onFinishTx);
  const {
    handleConfirmActiveStatus,
    fetchActiveStatusConfirmData,
    handleAddTokens,
    fetchSetUpModalTokenAddresses,
  } = useMyLostKeyContract(onSuccessTx, onErrorTx, onFinishTx);

  const [
    activeStatusModalProps, setActiveStatusModalProps,
  ] = useState<ComponentProps<typeof ConfirmStatusModal> | {}>({});
  const [
    liveStatusModalProps, setLiveStatusModalProps,
  ] = useState<ComponentProps<typeof ConfirmStatusModal> | {}>({});
  const [
    setUpModalProps, setSetUpModalProps,
  ] = useState<ComponentProps<typeof SetUpModal> | {}>({});

  const handleViewContract = useCallback((contractKey: string) => {
    const card = cards.find((item) => isFoundContractKey(item, contractKey));
    console.log('handleViewContract', card);
    const routeState = {
      contractPreview: {
        readonly: true,
      },
    } as TPreviewContractNavigationState;
    let routeParam = '';
    const { contractType, contractCreationData } = card;
    switch (contractType) {
      case 'Token contract': {
        routeParam = TOKEN_CONTRACT;
        routeState.contractPreview.data = contractCreationData as TokenContract;
        break;
      }
      case 'Crowdsale contract': {
        routeParam = CROWDSALE_CONTRACT;
        routeState.contractPreview.data = contractCreationData as ICrowdsaleContract;
        break;
      }
      case 'Lostkey contract': {
        routeParam = LOSTKEY_CONTRACT;
        routeState.contractPreview.data = contractCreationData as ILostKeyContract;
        break;
      }
      case 'Will contract': {
        routeParam = WILL_CONTRACT;
        routeState.contractPreview.data = contractCreationData as IWillContract;
        break;
      }
      case 'Wedding contract': {
        routeParam = WEDDING_CONTRACT;
        routeState.contractPreview.data = contractCreationData as IWeddingContract;
        break;
      }
      default: throw new Error('wrong param for handle view contract');
    }
    navigate(routes[routeParam]['preview-contract'].root, {
      state: { ...routeState },
    });
  }, [cards, navigate]);

  const buttonClickHandler = useCallback(async (contractKey: string, type: TContractButtonsTypes) => {
    const card = cards.find((item) => isFoundContractKey(item, contractKey));
    const { address: contractAddress } = card;

    switch (type) {
      case 'viewContract': {
        handleViewContract(contractKey);
        break;
      }
      case 'requestWithdrawal': {
        openRequestWithdrawalModal();
        setWithdrawalActions({
          ...withdrawalActions,
          onAccept: () => {
            const newState = cards.map((card) => {
              if (isFoundContractKey(card, contractKey)) {
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
          const newState = cards.map((card) => {
            if (isFoundContractKey(card, contractKey)) {
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
        const newState = cards.map((card) => {
          if (isFoundContractKey(card, contractKey)) {
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
        const newState = cards.map((card) => {
          if (isFoundContractKey(card, contractKey)) {
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
        const card = cards.find((item) => isFoundContractKey(item, contractKey));
        const { address: contractAddress } = card;
        const addresses = await fetchSetUpModalTokenAddresses(contractAddress);
        setSetUpModalProps({
          ...setUpModalProps,
          contractAddress,
          addresses,
          onAccept: (tokensAddresses) => {
            if (!tokensAddresses.length) return;
            handleAddTokens(contractAddress, tokensAddresses.map(({ address }) => address));
            openSendTransactionModal();
          },
        });
        openSetUpModal();
        break;
      }
      case 'confirmLiveStatus': {
        const response = await fetchActiveStatusConfirmData(contractAddress);
        if (!response) return;
        const [confirmationPeriod, lastRecordedTime] = response;
        const date = Number(confirmationPeriod) + Number(lastRecordedTime);
        setLiveStatusModalProps({
          ...liveStatusModalProps,
          date,
          onAccept: () => {
            handleConfirmActiveStatus(address);
            openSendTransactionModal();
          },
        });
        openConfirmLiveStatusModal();
        break;
      }
      case 'confirmActiveStatus': {
        const response = await fetchActiveStatusConfirmData(contractAddress);
        if (!response) return;
        const [confirmationPeriod, lastRecordedTime] = response;
        const date = Number(confirmationPeriod) + Number(lastRecordedTime);
        setActiveStatusModalProps({
          ...activeStatusModalProps,
          date,
          onAccept: () => {
            handleConfirmActiveStatus(address);
            openSendTransactionModal();
          },
        });
        openConfirmActiveStatusModal();
        break;
      }
      case 'getFunds': {
        openGetFundsModal();
        setGetFundsActions({
          ...getFundsActions,
          onAccept: (tokensAddresses) => {
            openSendTransactionModal();
            handleGetFundsAfterDivorce(contractAddress, tokensAddresses);
          },
        });
        break;
      }
      default: {
        break;
      }
    }
  }, [activeStatusModalProps, cards, fetchActiveStatusConfirmData, fetchSetUpModalTokenAddresses, getFundsActions, handleAddTokens, handleConfirmActiveStatus, handleGetFundsAfterDivorce, handleViewContract, liveStatusModalProps, openConfirmActiveStatusModal, openConfirmLiveStatusModal, openGetFundsModal, openRequestWithdrawalModal, openSendTransactionModal, openSetUpModal, setUpModalProps, withdrawalActions]);

  const renderAdditionalContent = useCallback(({ additionalContentRenderType, contractKey }: IContractsCard) => {
    switch (additionalContentRenderType) {
      case 'weddingRequestDivorce':
        return (
          <AdditionalContentRequestDivorce
            countdownUntilTimestamp={10000}
            onApprove={() => buttonClickHandler(contractKey, 'divorceApprove')}
            onReject={noop}
          />
        );
      case 'weddingRequestWithdrawal':
        return (
          <AdditionalContentRequestWithdrawal
            countdownUntilTimestamp={1646323273}
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

  const { fetchAndTransformContracts } = useMyContracts();

  const getContracts = useCallback(async () => {
    try {
      const newCards = await fetchAndTransformContracts();
      if (newCards) {
        setCards(newCards);
      }
    } catch (err) {
      console.log(err);
    }
  }, [fetchAndTransformContracts]);

  useEffect(() => {
    getContracts();
  }, [getContracts]);

  return (
    <Container>
      <CompleteModal
        open={resultModalState.open}
        result={resultModalState.result}
        onClose={closeResultModal}
      />
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
      <SetUpModal
        open={isSetUpModalOpen}
        setIsModalOpen={setIsSetUpModalOpen}
        addresses={[]}
        {...setUpModalProps}
      />
      <ConfirmStatusModal
        open={isConfirmLiveStatusModalOpen}
        setIsModalOpen={setIsConfirmLiveStatusModalOpen}
        statusType="live"
        date={0}
        {...liveStatusModalProps}
      />
      <ConfirmStatusModal
        open={isConfirmActiveStatusModalOpen}
        setIsModalOpen={setIsConfirmActiveStatusModalOpen}
        statusType="active"
        date={0}
        {...activeStatusModalProps}
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

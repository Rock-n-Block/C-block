import React, {
  FC, useCallback, useEffect, useState, ComponentProps,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Button,
  Container, Grid, IconButton, TextField, Typography,
} from '@material-ui/core';
import clsx from 'clsx';

import { NetTag } from 'containers/Header/components/NetTag';
import {
  SetUpModal,
  ConfirmStatusModal,
  SendTransactionModal,
  RequestWithdrawalModal,
  GetFundsModal,
  CompleteModal,
  BurnTokenModal,
  MintTokenModal,
  EmptyTableBlock,
} from 'components';
import { CheckmarkCircleIcon, SearchIcon, FlameIcon } from 'theme/icons';
import { useShallowSelector, useWeb3Provider } from 'hooks';
import myContractsActions from 'store/myContracts/actions';
import myContractsWeddingsActions, { getFundsAfterDivorce } from 'store/myContracts/weddingContracts/actions';
import myContractsSelector from 'store/myContracts/selectors';
import userSelector from 'store/user/selectors';
import uiSelector from 'store/ui/selectors';
import apiActions from 'store/ui/actions';
import burnTokenModalActions from 'store/myContracts/burnTokenModal/actions';
import setUpModalActions from 'store/myContracts/setUpModal/actions';
import setUpActionTypes from 'store/myContracts/setUpModal/actionTypes';
import burnTokenModalActionTypes from 'store/myContracts/burnTokenModal/actionTypes';
import mintTokenModalActionTypes from 'store/myContracts/mintTokenModal/actionTypes';
import confirmActiveStatusModalActions from 'store/myContracts/confirmActiveStatusModal/actions';
import mintTokenModalActions from 'store/myContracts/mintTokenModal/actions';

import { convertIntervalAsSeconds, getTokenAmount } from 'utils';
import {
  ISpecificWeddingContractData, IWeddingContract, RequestStatus, TokenContract,
} from 'types';

import {
  AdditionalContent, AdditionalContentRequestDivorce, AdditionalContentRequestWithdrawal,
} from './components';
import { IContractsCard, TContractButtonsTypes } from './MyContracts.types';
import {
  isFoundContractKey,
  getContractLogo,
  splitContractButtonsIntoGroups,
} from './MyContracts.helpers';
import {
  useSearch, useMyContracts, useMyLostKeyContract,
} from './hooks';
import { useStyles } from './MyContracts.styles';

export const MyContracts: FC = () => {
  const cards = useShallowSelector(myContractsSelector.getMyContracts);

  const { filteredList: filteredCards, searchHandler } = useSearch(cards);

  const { address: userWalletAddress } = useShallowSelector(userSelector.getUser);

  const [isSetUpModalOpen, setIsSetUpModalOpen] = useState(false);
  const [isConfirmLiveStatusModalOpen, setIsConfirmLiveStatusModalOpen] = useState(false);
  const [isConfirmActiveStatusModalOpen, setIsConfirmActiveStatusModalOpen] = useState(false);
  const [isSendTransactionModalOpen, setIsSendTransactionModalOpen] = useState(false);
  const [isRequestWithdrawalModalOpen, setIsRequestWithdrawalModalOpen] = useState(false);
  const [isGetFundsModalOpen, setIsGetFundsModalOpen] = useState(false);
  const [isBurnTokenModalOpen, setIsBurnTokenModalOpen] = useState(false);
  const [isMintTokenModalOpen, setIsMintTokenModalOpen] = useState(false);

  const classes = useStyles();

  const openSetUpModal = useCallback(() => setIsSetUpModalOpen(true), []);
  const openConfirmLiveStatusModal = useCallback(() => setIsConfirmLiveStatusModalOpen(true), []);
  const openConfirmActiveStatusModal = useCallback(() => setIsConfirmActiveStatusModalOpen(true), []);
  const openRequestWithdrawalModal = useCallback(() => setIsRequestWithdrawalModalOpen(true), []);
  const openGetFundsModal = useCallback(() => setIsGetFundsModalOpen(true), []);
  const openBurnTokenModal = useCallback(() => setIsBurnTokenModalOpen(true), []);
  const openMintTokenModal = useCallback(() => setIsMintTokenModalOpen(true), []);

  const [withdrawalActions, setWithdrawalActions] = useState<ComponentProps<typeof RequestWithdrawalModal> | {}>({});
  const [getFundsActions, setGetFundsActions] = useState<ComponentProps<typeof GetFundsModal> | {}>({});
  const [
    resultModalState, setResultModalState,
  ] = useState<ComponentProps<typeof CompleteModal>>({ open: false, result: false });

  const closeResultModal = useCallback(() => {
    setResultModalState({
      ...resultModalState,
      open: false,
    });
  }, [resultModalState]);

  const dispatch = useDispatch();
  const { getDefaultProvider } = useWeb3Provider();

  const {
    handleViewContract,
  } = useMyContracts();

  const {
    fetchActiveStatusConfirmData,
  } = useMyLostKeyContract();

  const [
    activeStatusModalProps, setActiveStatusModalProps,
  ] = useState<ComponentProps<typeof ConfirmStatusModal> | {}>({});
  const [
    liveStatusModalProps, setLiveStatusModalProps,
  ] = useState<ComponentProps<typeof ConfirmStatusModal> | {}>({});
  const [
    setUpModalProps, setSetUpModalProps,
  ] = useState<ComponentProps<typeof SetUpModal> | {}>({});
  const [
    burnTokenModalProps, setBurnTokenModalProps,
  ] = useState<ComponentProps<typeof BurnTokenModal> | {}>({});
  const [
    mintTokenModalProps, setMintTokenModalProps,
  ] = useState<ComponentProps<typeof MintTokenModal> | {}>({});

  const buttonClickHandler = useCallback(async (contractKey: string, type: TContractButtonsTypes) => {
    const card = cards.find((item) => isFoundContractKey(item, contractKey));
    const { address: contractAddress } = card;

    switch (type) {
      case 'viewContract': {
        handleViewContract(card);
        break;
      }
      case 'mintToken': {
        openMintTokenModal();
        setMintTokenModalProps({
          ...mintTokenModalProps,
          freezable: (card.contractCreationData as TokenContract).freezable,
          onAccept: (accountAddress, mintAmount, freezeUntilTimestamp) => {
            dispatch(mintTokenModalActions.mintTokenModalMint({
              provider: getDefaultProvider(),
              contractAddress,
              accountAddress,
              mintAmount: getTokenAmount(
                mintAmount,
                +(card.contractCreationData as TokenContract).decimals,
                false,
              ),
              freezeUntilTimestamp,
            }));
          },
          onClose: () => {
            setIsBurnTokenModalOpen(false);
          },
        });
        break;
      }
      case 'burnToken': {
        openBurnTokenModal();
        setBurnTokenModalProps({
          ...burnTokenModalProps,
          contractAddress,
          decimals: +(card.contractCreationData as TokenContract).decimals,
          onAccept: (burnAmount) => {
            dispatch(burnTokenModalActions.burnTokenModalBurn({
              provider: getDefaultProvider(),
              contractAddress,
              burnAmount,
            }));
          },
          onClose: () => {
            setIsBurnTokenModalOpen(false);
          },
        });
        break;
      }
      case 'requestWithdrawal': {
        openRequestWithdrawalModal();
        setWithdrawalActions({
          ...withdrawalActions,
          onAccept: async ({ tokenAddress, amount, addressToSend }) => {
            dispatch(myContractsWeddingsActions.initWithdrawal({
              provider: getDefaultProvider(),
              contractAddress,
              tokenAddress,
              addressToSend,
              amount,
            }));
          },
        });
        break;
      }
      case 'withdrawalApprove': {
        dispatch(myContractsWeddingsActions.approveWithdrawal({
          provider: getDefaultProvider(),
          contractAddress,
        }));
        break;
      }
      case 'withdrawalReject': {
        dispatch(myContractsWeddingsActions.rejectWithdrawal({
          provider: getDefaultProvider(),
          contractAddress,
        }));
        break;
      }
      case 'requestDivorce': {
        dispatch(
          myContractsWeddingsActions.initDivorce({
            provider: getDefaultProvider(),
            contractAddress,
          }),
        );
        break;
      }
      case 'divorceApprove': {
        dispatch(
          myContractsWeddingsActions.approveDivorce({
            provider: getDefaultProvider(),
            contractAddress,
          }),
        );
        break;
      }
      case 'divorceReject': {
        dispatch(
          myContractsWeddingsActions.rejectDivorce({
            provider: getDefaultProvider(),
            contractAddress,
          }),
        );
        break;
      }
      case 'setUp': {
        dispatch(
          setUpModalActions.getSetUpModalTokenAddresses({
            provider: getDefaultProvider(),
            contractAddress,
          }),
        );
        setSetUpModalProps({
          ...setUpModalProps,
          contractAddress,
          onAccept: (tokensAddresses) => {
            if (!tokensAddresses.length) return;
            dispatch(
              setUpModalActions.setUpModalAddTokens({
                provider: getDefaultProvider(),
                contractAddress,
                tokensAddresses: tokensAddresses.map(({ address }) => address),
              }),
            );
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
            dispatch(
              confirmActiveStatusModalActions.confirmActiveStatusModalConfirm({
                provider: getDefaultProvider(),
                contractAddress,
              }),
            );
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
            dispatch(
              confirmActiveStatusModalActions.confirmActiveStatusModalConfirm({
                provider: getDefaultProvider(),
                contractAddress,
              }),
            );
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
            dispatch(getFundsAfterDivorce({
              provider: getDefaultProvider(),
              contractAddress,
              tokensAddresses,
            }));
          },
        });
        break;
      }
      default: {
        break;
      }
    }
  }, [activeStatusModalProps, burnTokenModalProps, cards, dispatch, fetchActiveStatusConfirmData, getDefaultProvider, getFundsActions, handleViewContract, liveStatusModalProps, mintTokenModalProps, openBurnTokenModal, openConfirmActiveStatusModal, openConfirmLiveStatusModal, openGetFundsModal, openMintTokenModal, openRequestWithdrawalModal, openSetUpModal, setUpModalProps, withdrawalActions]);

  const isSameDivorceAddress = useCallback((divorceProposedBy: string) => userWalletAddress.toLowerCase() === divorceProposedBy.toLowerCase(), [userWalletAddress]); // cannot approve/reject divorce with the same address
  const isSameWithdrawalAddress = useCallback((proposedBy: string) => userWalletAddress.toLowerCase() === proposedBy.toLowerCase(), [userWalletAddress]); // cannot approve/reject withdrawal with the same address

  const renderAdditionalContent = useCallback(
    ({
      additionalContentRenderType, contractKey, specificContractData, contractCreationData,
    }: IContractsCard) => {
      switch (additionalContentRenderType) {
        case 'weddingRequestDivorce': {
          const {
            divorceTimestamp,
            divorceProposedBy,
          } = specificContractData as ISpecificWeddingContractData;
          return (
            <AdditionalContentRequestDivorce
              countdownUntilTimestamp={+divorceTimestamp}
              onApprove={isSameDivorceAddress(divorceProposedBy) ? undefined : () => buttonClickHandler(contractKey, 'divorceApprove')}
              onReject={isSameDivorceAddress(divorceProposedBy) ? undefined : () => buttonClickHandler(contractKey, 'divorceReject')}
            />
          );
        }
        case 'weddingRequestWithdrawal': {
          const {
            activeWithdrawalProposal,
          } = specificContractData as ISpecificWeddingContractData;
          const { timestamp, proposedBy } = activeWithdrawalProposal;
          const { daysForWithdrawalApproval } = contractCreationData as IWeddingContract;
          const secondsForWithdrawalApproval = convertIntervalAsSeconds(
            daysForWithdrawalApproval,
            'Day',
          );
          const countdownUntilTimestamp = Number(timestamp) + secondsForWithdrawalApproval;
          return (
            <AdditionalContentRequestWithdrawal
              countdownUntilTimestamp={countdownUntilTimestamp}
              onApprove={isSameWithdrawalAddress(proposedBy) ? undefined : () => buttonClickHandler(contractKey, 'withdrawalApprove')}
              onReject={isSameWithdrawalAddress(proposedBy) ? undefined : () => buttonClickHandler(contractKey, 'withdrawalReject')}
            />
          );
        }
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
    }, [buttonClickHandler, classes.successfulAdditionalContent, classes.successfulAdditionalContentText, isSameDivorceAddress, isSameWithdrawalAddress],
  );

  useEffect(() => {
    dispatch(myContractsActions.getMyContracts({
      provider: getDefaultProvider(),
    }));
  }, [dispatch, getDefaultProvider, userWalletAddress]);

  const setUpModalRequestStatus = useShallowSelector(
    uiSelector.getProp(setUpActionTypes.SETUP_MODAL_ADD_TOKENS),
  );
  const burnTokenModalBurnRequestStatus = useShallowSelector(
    uiSelector.getProp(burnTokenModalActionTypes.BURN_TOKEN_MODAL_BURN),
  );
  const mintTokenModalMintRequestStatus = useShallowSelector(
    uiSelector.getProp(mintTokenModalActionTypes.MINT_TOKEN_MODAL_MINT),
  );

  useEffect(() => {
    if (setUpModalRequestStatus === RequestStatus.SUCCESS) {
      dispatch(apiActions.reset(setUpActionTypes.SETUP_MODAL_ADD_TOKENS));
      setIsSetUpModalOpen(false);
    }
  }, [dispatch, setUpModalRequestStatus]);

  useEffect(() => {
    if (burnTokenModalBurnRequestStatus === RequestStatus.SUCCESS) {
      dispatch(apiActions.reset(burnTokenModalActionTypes.BURN_TOKEN_MODAL_BURN));
      setIsBurnTokenModalOpen(false);
    }
  }, [dispatch, burnTokenModalBurnRequestStatus]);

  useEffect(() => {
    if (mintTokenModalMintRequestStatus === RequestStatus.SUCCESS) {
      dispatch(apiActions.reset(mintTokenModalActionTypes.MINT_TOKEN_MODAL_MINT));
      setIsMintTokenModalOpen(false);
    }
  }, [dispatch, mintTokenModalMintRequestStatus]);

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
      <BurnTokenModal
        open={isBurnTokenModalOpen}
        setIsModalOpen={setIsBurnTokenModalOpen}
        contractAddress=""
        decimals={0}
        {...burnTokenModalProps}
      />
      <MintTokenModal
        open={isMintTokenModalOpen}
        setIsModalOpen={setIsMintTokenModalOpen}
        freezable={false}
        {...mintTokenModalProps}
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
        {
          cards.length ? filteredCards.map(({
            contractKey,
            contractName,
            contractDate,
            contractType,
            // contractLogo,
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
                <IconButton>{getContractLogo(contractType)}</IconButton>
                <Typography variant="h3">{contractName}</Typography>
              </Box>
              {
                renderAdditionalContent(filteredCards[cardIndex])
              }
              <Box className={classes.contractBottom}>
                {
                  splitContractButtonsIntoGroups(contractButtons).map((group, groupIndex) => {
                    const isRightColumn = groupIndex !== 0;
                    return (
                      <Box
                        // @disable-reason: there will be always 2 non-dynamic columns
                        // eslint-disable-next-line react/no-array-index-key
                        key={groupIndex}
                        className={clsx(classes.contractButtons, {
                          [classes.contractButtonsRightColumn]: isRightColumn,
                        })}
                      >
                        {group.map(({
                          type, title,
                        }, index) => (
                          <Button
                              // eslint-disable-next-line react/no-array-index-key
                            key={`${type}_${index}`}
                            className={classes.button}
                            value={type}
                            variant="outlined"
                            color="primary"
                            onClick={() => buttonClickHandler(contractKey, type)}
                            endIcon={type === 'burnToken' ? <FlameIcon className={classes.flameIcon} /> : undefined}
                          >
                            {title}
                          </Button>
                        ))}
                      </Box>
                    );
                  })
                }
              </Box>
            </Box>
          )) : (
            <EmptyTableBlock className={classes.emptyContractBlock} />
          )
        }
      </Grid>
    </Container>
  );
};

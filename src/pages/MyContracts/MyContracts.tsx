import React, {
  FC, useCallback, useEffect, useState, ComponentProps,
} from 'react';
import {
  Box, Button,
  Container, Grid, IconButton, TextField, Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useDebounce } from 'use-debounce';
import { SearchIcon } from 'theme/icons/components/SearchIcon';
import { NetTag } from 'containers/Header/components/NetTag';
import { useShallowSelector } from 'hooks';
import { State, UserState } from 'types';
import userSelector from 'store/user/selectors';
import {
  SetUpModal, ConfirmStatusModal, SendTransactionModal, RequestWithdrawalModal,
} from 'components';
import { CloseCircleIcon, CheckmarkCircleIcon, ClockIcon } from 'theme/icons';
import {
  contractButtons as contractButtonsHelper, contractsCards, IContractsCard, TContractButtonsTypes,
} from './MyContracts.helpers';
import { useStyles } from './MyContracts.styles';

const ConfirmationTimeBlock: FC<{ className?: string }> = ({ className }) => {
  const classes = useStyles();
  return (
    <Box className={className}>
      <Typography className={classes.contractActionText}>Сonfirmation time</Typography>
      <Box className={classes.confirmationTimeBlockContent}>
        <ClockIcon />
        <Typography className={clsx('acidGreen')} variant="h2" component="div">23d 24h 43m</Typography>
      </Box>
    </Box>
  );
};

const AdditionalContent: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.contractActionBlock}>
      {children}
    </Box>
  );
};

const ApproveRejectBox: FC<{ onApprove: () => void; onReject: () => void }> = ({ onApprove, onReject }) => {
  const classes = useStyles();
  return (
    <Box>
      <Button className={clsx(classes.button, classes.actionButton)} variant="outlined" endIcon={<CheckmarkCircleIcon />} onClick={onApprove}>Approve</Button>
      <Button className={clsx(classes.button, classes.actionButton)} variant="outlined" endIcon={<CloseCircleIcon color="error" />} onClick={onReject}>Reject</Button>
    </Box>
  );
};

const AdditionalContentRequestWithdrawal: FC<{ onApprove: () => void; onReject: () => void }> = ({ onApprove, onReject }) => {
  const classes = useStyles();
  return (
    <AdditionalContent>
      <Box className={classes.contractActionBlockInner}>
        <Typography className={classes.contractActionText}>Request withdrawal</Typography>
        <ApproveRejectBox onApprove={onApprove} onReject={onReject} />
      </Box>
      <ConfirmationTimeBlock className={classes.contractActionBlockInner} />
    </AdditionalContent>
  );
};

const AdditionalContentRequestDivorce: FC<{ onApprove: () => void; onReject: () => void }> = ({ onApprove, onReject }) => {
  const classes = useStyles();
  return (
    <AdditionalContent>
      <Box className={classes.contractActionBlockInner}>
        <Typography className={classes.contractActionText}>Request divorce</Typography>
        <ApproveRejectBox onApprove={onApprove} onReject={onReject} />
      </Box>
      <ConfirmationTimeBlock className={classes.contractActionBlockInner} />
    </AdditionalContent>
  );
};

export const MyContracts: FC = () => {
  const [cards, setCards] = useState(contractsCards);
  const [filteredCards, setFilteredCards] = useState(contractsCards);

  const [isSetUpModalOpen, setIsSetUpModalOpen] = useState<boolean>(false);
  const [isConfirmLiveStatusModalOpen, setIsConfirmLiveStatusModalOpen] = useState<boolean>(false);
  const [isConfirmActiveStatusModalOpen, setIsConfirmActiveStatusModalOpen] = useState<boolean>(false);
  const [isSendTransactionModalOpen, setIsSendTransactionModalOpen] = useState<boolean>(false);
  const [isRequestWithdrawalModalOpen, setIsRequestWithdrawalModalOpen] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');
  const classes = useStyles();
  const { isMainnet } = useShallowSelector<State, UserState>(userSelector.getUser);
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  const openSetUpModal = useCallback(() => setIsSetUpModalOpen(true), []);
  const openConfirmLiveStatusModal = useCallback(() => setIsConfirmLiveStatusModalOpen(true), []);
  const openConfirmActiveStatusModal = useCallback(() => setIsConfirmActiveStatusModalOpen(true), []);
  const openSendTransactionModal = useCallback(() => setIsSendTransactionModalOpen(true), []);
  const openRequestWithdrawalModal = useCallback(() => setIsRequestWithdrawalModalOpen(true), []);

  const [withdrawalActions, setWithdrawalActions] = useState<ComponentProps<typeof RequestWithdrawalModal> | {}>({});

  const buttonClickHandler = useCallback((contractKey: string, type: TContractButtonsTypes) => {
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
      default: {
        break;
      }
    }
  }, [cards, openConfirmActiveStatusModal, openConfirmLiveStatusModal, openRequestWithdrawalModal, openSendTransactionModal, openSetUpModal]);

  const renderAdditionalContent = useCallback(({ additionalContentRenderType, contractKey }: IContractsCard) => {
    switch (additionalContentRenderType) {
      case 'weddingRequestDivorce': return <AdditionalContentRequestDivorce onApprove={() => buttonClickHandler(contractKey, 'divorceApprove')} onReject={() => {}} />;
      case 'weddingRequestWithdrawal': return <AdditionalContentRequestWithdrawal onApprove={() => buttonClickHandler(contractKey, 'withdrawalApprove')} onReject={() => {}} />;
      case 'weddingSuccessfulDivorce': return (
        <AdditionalContent>
          <Box className={classes.successfulAdditionalContent}>
            <CheckmarkCircleIcon />
            <Typography className={clsx(classes.successfulAdditionalContentText, 'l')} variant="body1">There was a successful divorce</Typography>
          </Box>
        </AdditionalContent>
      );
      case 'weddingSuccessfulWithdrawal': return (
        <AdditionalContent>
          <Box className={classes.successfulAdditionalContent}>
            <CheckmarkCircleIcon />
            <Typography className={clsx(classes.successfulAdditionalContentText, 'l')} variant="body1">There was a successful withdrawal</Typography>
          </Box>
        </AdditionalContent>
      );
      default: return null;
    }
  }, [buttonClickHandler, classes.successfulAdditionalContent, classes.successfulAdditionalContentText]);

  const searchHandler = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  useEffect(() => {
    if (!debouncedSearchValue) {
      setFilteredCards(cards);
    } else {
      const newFilteredCards = cards.filter(({ contractName }) => {
        const isContractNameInSearch = contractName.toLowerCase().includes(debouncedSearchValue.toLowerCase());
        return isContractNameInSearch;
      });
      setFilteredCards(newFilteredCards);
    }
  }, [cards, debouncedSearchValue]);

  return (
    <Container>
      <RequestWithdrawalModal
        open={isRequestWithdrawalModalOpen}
        setIsModalOpen={setIsRequestWithdrawalModalOpen}
        {...withdrawalActions}
      />
      <SendTransactionModal
        open={isSendTransactionModalOpen}
        setIsModalOpen={setIsSendTransactionModalOpen}
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
          contractName,
          contractDate,
          contractType,
          contractLogo,
          contractButtons,
          contractKey,
        }, cardIndex) => (
          <Box
            key={contractKey}
            className={classes.contractBlock}
          >
            <Box className={classes.contractHead}>
              <Typography color="textSecondary">{contractType}</Typography>
              <NetTag className={classes.chainTag} isTestnet={!isMainnet} />
            </Box>
            <Typography className={classes.contractDate} color="textSecondary">{contractDate}</Typography>

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
                  >{title}
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

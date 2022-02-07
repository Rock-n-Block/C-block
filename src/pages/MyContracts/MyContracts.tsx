/* eslint-disable react/no-array-index-key,no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
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
import { SetUpModal } from 'components';
import { contractsCards, TContractButtonsTypes } from './MyContracts.helpers';
import { useStyles } from './MyContracts.styles';

export const MyContracts = () => {
  const [cards, setCards] = useState(contractsCards);
  const [filteredCards, setFilteredCards] = useState(contractsCards);
  const [isSetUpModalOpen, setIsSetUpModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const classes = useStyles();
  const { isMainnet } = useShallowSelector<State, UserState>(userSelector.getUser);
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  const openSetUpModal = useCallback(() => {
    setIsSetUpModalOpen(true);
  }, []);

  const buttonClickHandler = useCallback((contractKey: string, type: TContractButtonsTypes) => {
    switch (type) {
      case 'requestDivorce': {
        const newState = cards.map((card, index) => {
          if (+contractKey === index) {
            card.isRequestBlockActive = !card.isRequestBlockActive;
          }
          return card;
        });
        setCards(newState);
        return;
      }
      case 'setUp': {
        openSetUpModal();
        break;
      }
      default: {
        break;
      }
    }
  }, [cards, openSetUpModal]);

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
      <SetUpModal open={isSetUpModalOpen} setIsSetUpModalOpen={setIsSetUpModalOpen} />
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
          isRequestBlockActive,
          contractKey,
        }) => (
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
            {isRequestBlockActive && (
            <Box className={classes.contractActionBlock}>
              <Typography className={classes.contractActionText}>Request divorce</Typography>
              <Box>
                <Button className={clsx(classes.button, classes.actionButton)} variant="outlined">Approve divorce</Button>
                <Button className={clsx(classes.button, classes.actionButton)} variant="outlined">Reject divorce</Button>
              </Box>
            </Box>
            )}
            <Box className={classes.contractBottom}>
              <Box className={classes.contractButtons}>
                {contractButtons.map(({
                  type, title,
                }, index) => (
                  <Button
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

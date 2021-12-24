/* eslint-disable react/no-array-index-key,no-param-reassign */
import React, { useCallback, useState } from 'react';
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
import { contractsCards } from './MyContracts.helpers';
import { useStyles } from './MyContracts.styles';

export const MyContracts = () => {
  const [cards, setCards] = useState(contractsCards);
  const [filteredCards, setFilteredCards] = useState(contractsCards);
  const [searchValue, setSearchValue] = useState('');
  const classes = useStyles();
  const { isMainnet } = useShallowSelector<State, UserState>(userSelector.getUser);
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  const buttonClickHandler = useCallback((contractKey, type) => {
    if (type === ('requestDivorce')) {
      const newState = cards.map((card, index) => {
        if (+contractKey === index) {
          card.isRequestBlockActive = !card.isRequestBlockActive;
        }
        return card;
      });
      setCards(newState);
    }
  }, []);

  const searchHandler = useCallback((value) => {
    setSearchValue(value);
    const newState = cards.filter(({ contractName }) => {
      if (debouncedSearchValue) {
        const isContractNameInSearch = contractName.toLowerCase().includes(debouncedSearchValue.toLowerCase());
        if (!isContractNameInSearch) return false;
      } return true;
    });
    setFilteredCards([...newState]);
  }, [searchValue, debouncedSearchValue]);

  return (
    <Container>
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
              <Typography color="textSecondary">{contractDate}</Typography>
              <Typography color="textSecondary">{contractType}</Typography>
            </Box>
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
                    onClick={() => buttonClickHandler(contractKey, type)}
                    className={classes.button}
                    value={type}
                    key={`${type}_${index}`}
                    variant="outlined"
                  >{title}
                  </Button>
                ))}
              </Box>
              <NetTag className={classes.chainTag} isTestnet={!isMainnet} />
            </Box>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

/* eslint-disable react/no-array-index-key,no-param-reassign */
import React, { useCallback, useState } from 'react';
import {
  Box, Button,
  Container, Grid, IconButton, InputAdornment, TextField, Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useStyles } from './MyContracts.styles';
import { SearchIcon } from '../../theme/icons/components/SearchIcon';
import { NetTag } from '../../containers/Header/components/NetTag';
import { contractsCards } from './MyContracts.helpers';

export const MyContracts = () => {
  const [cards, setCards] = useState(contractsCards);
  const classes = useStyles();
  const isMainnet = true;

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

  return (
    <Container>
      <Grid container className={classes.root}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          key="123"
        >
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search contract"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {cards.map(({
          contractName,
          contractDate,
          contractType,
          contractLogo,
          contractButtons,
          isRequestBlockActive,
          contractKey,
        }) => (
          <Grid
            item
            key={contractKey}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
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
              <Typography>Request divorce</Typography>
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
              <Grid item className={classes.chainTagContainer}>
                <NetTag className={classes.chainTag} isTestnet={!isMainnet} />
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

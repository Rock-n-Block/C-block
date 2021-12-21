import React from 'react';
import {
  Box, Button,
  Container, Grid, IconButton, InputAdornment, TextField, Typography,
} from '@material-ui/core';
import { useStyles } from './MyContracts.styles';
import { SearchIcon } from '../../theme/icons/components/SearchIcon';
import { WeddingRingIcon } from '../../theme/icons';
import { NetTag } from '../../containers/Header/components/NetTag';

export const MyContracts = () => {
  const classes = useStyles();
  const isMainnet = true;
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
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className={classes.contractBlock}
        >
          <Box className={classes.contractHead}>
            <Typography color="textSecondary">22.01.2022</Typography>
            <Typography color="textSecondary">Token contract</Typography>
          </Box>
          <Box className={classes.contractTitle}>
            <IconButton><WeddingRingIcon /></IconButton>
            <Typography>Name contract</Typography>
          </Box>
          <Box className={classes.contractBottom}>
            <Button variant="outlined">View contract</Button>
            <Button variant="outlined">Set up</Button>
            <Button variant="outlined">Confirm live status</Button>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <NetTag className={classes.chainTag} isTestnet={!isMainnet} />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

import React, {
  FC, useState,
} from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Switch,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { SearchIcon } from 'theme/icons';
import { useStyles } from './UsersView.styles';
import { CollapsibleList } from './CollapsibleList';

export const UsersView: FC = () => {
  const [selectedOnlyAdmins, setSelectedOnlyAdmins] = useState(false);

  const handleAdminsSwitch = () => {
    setSelectedOnlyAdmins((prevState) => !prevState);
  };
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} md={8} className={classes.searchContainer}>
        <TextField
          id="input-with-icon-textfield"
          placeholder="Wallet address/email/name"
      // onChange={(e) => searchHandler(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          className={classes.searchContainerField}
        />
        <Button
          size="large"
          variant="outlined"
        >
          Search
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.adminsSwitch}>
          <Switch name="Admins" checked={selectedOnlyAdmins} onClick={handleAdminsSwitch} />
          <Typography>Admins</Typography>
        </Box>
      </Grid>
      <Grid item container xs={12} className={classes.collapsibleList}>
        <CollapsibleList />
      </Grid>
      <Grid item xs={12} md={6}>
        <Pagination
          className={classes.pagination}
          count={10}
          variant="outlined"
          shape="rounded"
        />
      </Grid>
    </Grid>
  );
};

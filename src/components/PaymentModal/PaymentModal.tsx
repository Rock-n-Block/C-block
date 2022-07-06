import React, {
  ChangeEvent,
  useMemo, VFC,
} from 'react';
import {
  Typography, Button, Box, IconButton, Grid, TextField, MenuItem,
} from '@material-ui/core';
import clsx from 'clsx';

import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { Modal } from 'components/Modal';
import { FileTextIcon, WalletIcon } from 'theme/icons';
import { Tokens } from 'types/utils/contractsHelper';
import { useStyles } from './PaymentModal.styles';

const selectOptions: { option: Tokens; name: string }[] = [{
  option: 'celo',
  name: 'CELO',
}, {
  option: 'cusd',
  name: 'cUSD',
}];

export interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  selectedBuyToken: Tokens;
  paymentAmount: string | number;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  className?: string;
}

export const PaymentModal: VFC<PaymentModalProps> = ({
  open, onClose, onAccept, className, selectedBuyToken, paymentAmount, onChange,
}) => {
  const classes = useStyles();

  const { isLight } = useShallowSelector(userSelector.getUser);

  const title = useMemo(() => (
    <Box className={classes.paymentInfoIcon}>
      <IconButton><WalletIcon /></IconButton>
      <Typography
        align="left"
        className={isLight ? '' : 'acidGreen gradient'}
        variant="h2"
      >
        Payment
      </Typography>
    </Box>
  ), [classes.paymentInfoIcon, isLight]);

  return (
    <Modal title={title} open={open} onClose={onClose} className={clsx(classes.root, className)}>
      <Grid className={classes.paymentInfoHelper} container>
        <Grid item xs={8}>
          <Typography variant="body1" className="s" color="textSecondary">Position</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" className="s" color="textSecondary">Price</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.paymentInfo} container>
        <Grid item xs={6}>
          <Box className={classes.paymentInfoIcon}>
            <FileTextIcon />
            <Typography variant="body1">Create contract</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">{paymentAmount}</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.selectBuyToken}
            InputProps={{
              className: classes.selectBuyToken,
            }}
            SelectProps={{
              classes: {
                selectMenu: classes.selectMenuBuyToken,
              },
            }}
            select
            value={selectedBuyToken}
            onChange={onChange}
          >
            {
              selectOptions.map(({ option, name }) => (
                <MenuItem key={option} value={option}>{name}</MenuItem>
              ))
            }
          </TextField>
        </Grid>
      </Grid>
      <Box className={classes.paymentControls}>
        <Button
          size="large"
          type="submit"
          color="secondary"
          variant="outlined"
          className={clsx(classes.payButton, classes.button)}
          onClick={onAccept}
        >
          Pay
        </Button>
        <Button
          size="large"
          type="reset"
          variant="outlined"
          className={clsx(classes.cancelButton, classes.button)}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

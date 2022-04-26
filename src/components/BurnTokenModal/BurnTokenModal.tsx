import React, {
  useCallback, useMemo, useState, VFC,
} from 'react';
import {
  Typography, Button, Box, TextField,
} from '@material-ui/core';
import clsx from 'clsx';
import BigNumber from 'bignumber.js';
import { useDebouncedCallback } from 'use-debounce/lib';

import {
  useShallowSelector, useWeb3Provider,
} from 'hooks';
import { Modal } from 'components/Modal';
import userSelector from 'store/user/selectors';
import { FlameIcon } from 'theme/icons';
import { contractsHelper, getTokenAmount, getTokenAmountDisplay } from 'utils';
import { useStyles } from './BurnTokenModal.styles';

interface Props {
  className?: string;
  open?: boolean;
  contractAddress: string;
  decimals: number;
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: (burnAmount: string) => void;
}

export const BurnTokenModal: VFC<Props> = ({
  open,
  contractAddress,
  decimals,
  setIsModalOpen,
  onClose,
  onAccept,
}) => {
  const { getDefaultProvider } = useWeb3Provider();
  const { address: userWalletAddress } = useShallowSelector(userSelector.getUser);

  const [burnAmount, setBurnAmount] = useState('');

  const debouncedCheckBalance = useDebouncedCallback(
    async () => {
      let tokenBalance = '';
      try {
        const contract = contractsHelper.getBep20Contract(getDefaultProvider(), contractAddress);
        tokenBalance = await contract.methods.balanceOf(userWalletAddress).call();
      } catch (err) {
        console.log(err);
      }

      const serializedBurnAmount = getTokenAmount(burnAmount, decimals, false);
      if (new BigNumber(serializedBurnAmount).isGreaterThan(tokenBalance)) {
        const deserializedTokenBalance = getTokenAmountDisplay(tokenBalance, decimals);
        setBurnAmount(deserializedTokenBalance);
      }
    },
    1000,
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setBurnAmount(e.target.value);
    debouncedCheckBalance();
  }, [debouncedCheckBalance]);

  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setIsModalOpen(false);
  }, [onClose, setIsModalOpen]);

  const isDisabledAcceptButton = useMemo(() => {
    if (+burnAmount <= 0) return true;
    return false;
  }, [burnAmount]);

  const handleAccept = useCallback(() => {
    if (isDisabledAcceptButton) return;
    if (onAccept) {
      const serializedBurnAmount = getTokenAmount(burnAmount, decimals, false);
      onAccept(serializedBurnAmount);
    }
  }, [burnAmount, decimals, isDisabledAcceptButton, onAccept]);

  const classes = useStyles();

  const { isLight } = useShallowSelector(userSelector.getUser);
  const title = useMemo(
    () => (
      <Box className={classes.modalTitle}>
        <Typography
          align="left"
          className={clsx(isLight ? '' : 'acidGreen gradient')}
          variant="h2"
        >
          Burn
        </Typography>
        <FlameIcon className={classes.flameIcon} />
      </Box>
    ),
    [classes.flameIcon, classes.modalTitle, isLight],
  );

  return (
    <Modal
      className={clsx(classes.root)}
      open={open}
      onClose={closeModal}
      title={title}
    >
      <Typography
        className={clsx(classes.desc, 'l')}
        variant="body1"
        align="left"
      >
        Define the amount of tokens to be burned. The Total Supply will reduce by this number.
      </Typography>
      <Box className={classes.inputContainer}>
        <TextField
          type="number"
          value={burnAmount}
          label="Token amount"
          onChange={handleChange}
        />
      </Box>
      <Box className={classes.modalControls}>
        <Button
          className={classes.button}
          size="large"
          type="submit"
          color="secondary"
          variant="outlined"
          disabled={isDisabledAcceptButton}
          onClick={handleAccept}
        >
          Burn
        </Button>
      </Box>
    </Modal>
  );
};

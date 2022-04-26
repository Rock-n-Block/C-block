import React, {
  useCallback, useMemo, useState, VFC,
} from 'react';
import {
  Typography,
  Button,
  Box,
  TextField,
} from '@material-ui/core';
import clsx from 'clsx';
import Web3 from 'web3';

import {
  useShallowSelector,
} from 'hooks';
import { CheckBox } from 'components/CheckBox';
import { Modal } from 'components/Modal';
import userSelector from 'store/user/selectors';
import { Snowflake } from 'theme/icons';
import { DAY_AS_SECONDS, formattedDate } from 'utils';
import { useStyles } from './MintTokenModal.styles';

interface Props {
  className?: string;
  open?: boolean;
  freezable: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: (accountAddress: string, mintAmount: string, freezeUntilTimestamp: number) => void;
}

export const MintTokenModal: VFC<Props> = ({
  open,
  setIsModalOpen,
  freezable,
  onClose,
  onAccept,
}) => {
  const classes = useStyles();

  const tomorrowDate = formattedDate('-', new Date(Date.now() + DAY_AS_SECONDS * 1000));

  const [address, setAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [freezeUntilDate, setFreezeUntilDate] = useState(tomorrowDate);
  const [freezeUntilTimestamp, setFreezeUntilTimestamp] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);

  const clearInputs = useCallback(() => {
    setAddress('');
    setTokenAmount('');
    setFreezeUntilDate(tomorrowDate);
    setFreezeUntilTimestamp(0);
    setIsFrozen(false);
  }, [tomorrowDate]);

  const closeModal = useCallback(() => {
    if (onClose) {
      clearInputs();
      onClose();
    }
    setIsModalOpen(false);
  }, [clearInputs, onClose, setIsModalOpen]);

  const isDisabledAcceptButton = useMemo(() => {
    if (!Web3.utils.isAddress(address)) return true;

    const hasTokenAmount = +tokenAmount > 0;
    if (!hasTokenAmount) return true;

    if (freezable && isFrozen) {
      const dateNowTimestamp = Math.floor(Date.now() / 1000);
      if (freezeUntilTimestamp <= dateNowTimestamp) return true;
    }
    return false;
  }, [address, freezable, freezeUntilTimestamp, isFrozen, tokenAmount]);

  const handleAccept = useCallback(() => {
    if (isDisabledAcceptButton) return;
    if (onAccept) {
      onAccept(
        address,
        tokenAmount,
        freezable && isFrozen ? freezeUntilTimestamp : 0,
      );
    }
  }, [address, freezable, freezeUntilTimestamp, isDisabledAcceptButton, isFrozen, onAccept, tokenAmount]);

  const { isLight } = useShallowSelector(userSelector.getUser);
  const title = useMemo(
    () => (
      <Box className={classes.modalTitle}>
        <Typography
          align="left"
          className={clsx(isLight ? '' : 'acidGreen gradient')}
          variant="h2"
        >
          Mint
        </Typography>
      </Box>
    ),
    [classes.modalTitle, isLight],
  );

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title={title}
    >
      <Typography
        className={clsx(classes.desc, 'l')}
        variant="body1"
        align="left"
      >
        Define address For tokens (after minting it will be sent to this address)
      </Typography>
      <Box>
        <Box className={classes.inputContainer}>
          <TextField
            value={address}
            label="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            type="number"
            value={tokenAmount}
            label="Token amount"
            onChange={(e) => setTokenAmount(e.target.value)}
          />
        </Box>
        {
          freezable && (
            <>
              <Box className={clsx(classes.inputContainer, classes.frozenUntilDate)}>
                <CheckBox
                  name="isFrozenUntilDate"
                  icon={<Snowflake />}
                  label="Frozen until date"
                  value={isFrozen}
                  onClick={() => setIsFrozen((prevValue) => !prevValue)}
                />
              </Box>
              {
                isFrozen && (
                  <Box className={clsx(classes.inputContainer, classes.freezeUntilTimestamp)}>
                    <TextField
                      type="date"
                      value={freezeUntilDate}
                      label=""
                      name="freezeUntilTimestamp"
                      onChange={(e) => {
                        setFreezeUntilDate(e.target.value);
                        // @ts-expect-error wrong type for e.target (valueAsNumber presents on input type="date")
                        const milliseconds = e.target.valueAsNumber;
                        if (Number.isNaN(milliseconds)) {
                          setFreezeUntilTimestamp(0);
                        } else {
                          setFreezeUntilTimestamp(milliseconds / 1000);
                        }
                      }}
                    />
                  </Box>
                )
              }
            </>
          )
        }
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
          Mint
        </Button>
      </Box>
    </Modal>
  );
};

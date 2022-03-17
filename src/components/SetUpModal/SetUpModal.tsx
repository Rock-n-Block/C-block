import React, {
  useCallback, useMemo, VFC,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography, Button, Box, TextField,
} from '@material-ui/core';
import clsx from 'clsx';
import { useDebouncedCallback } from 'use-debounce';
import BigNumber from 'bignumber.js';

import {
  useShallowSelector, useWeb3Provider,
} from 'hooks';
import { Modal } from 'components/Modal';
import { MAX_UINT_256, TOKEN_ADDRESSES_MAX_COUNT } from 'appConstants';
import userSelector from 'store/user/selectors';
import myContractsSelector from 'store/myContracts/selectors';
import uiSelector from 'store/ui/selectors';
import { myContractsReducer } from 'store/myContracts/reducer';
import { updateAllowance, setUpModalApprove } from 'store/myContracts/setUpModal/actions';
import actionTypes from 'store/myContracts/setUpModal/actionTypes';
import { incrementLastId } from 'utils/identifactors';
import {
  ISetUpModalTokenAddressField,
  RequestStatus,
} from 'types';
import { PlusIcon } from '../../theme/icons';
import { useStyles } from './SetUpModal.styles';

interface Props {
  className?: string;
  open?: boolean;
  contractAddress?: string;
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: (addresses: ISetUpModalTokenAddressField[]) => void;
}

export const SetUpModal: VFC<Props> = ({
  open,
  setIsModalOpen,
  contractAddress = '',
  onClose,
  onAccept,
}) => {
  const { getDefaultProvider } = useWeb3Provider();
  const classes = useStyles();
  const dispatch = useDispatch();

  const addresses = useShallowSelector(myContractsSelector.getSetUpModalAddresses(contractAddress));

  const debouncedCheckAllowance = useDebouncedCallback(
    (tokenAddressField: ISetUpModalTokenAddressField) => {
      dispatch(updateAllowance({
        provider: getDefaultProvider(),
        contractAddress,
        tokenAddressField,
      }));
    },
    1000,
  );

  const approveRequestUi = useShallowSelector(
    uiSelector.getProp(actionTypes.SETUP_MODAL_APPROVE),
  );

  const addAddressHandler = useCallback(() => {
    dispatch(
      myContractsReducer.actions.setUpModalSetAddresses({
        contractAddress,
        addresses: [
          ...addresses,
          {
            id: incrementLastId(addresses), address: '', allowance: '', isAdded: false,
          },
        ],
      }),
    );
  }, [addresses, contractAddress, dispatch]);

  const handleChange = useCallback((value: ISetUpModalTokenAddressField) => {
    dispatch(
      myContractsReducer.actions.setUpModalSetAddresses({
        contractAddress,
        addresses: addresses.map((item) => (item.id === value.id ? value : item)),
      }),
    );
    debouncedCheckAllowance(value);
  }, [addresses, contractAddress, debouncedCheckAllowance, dispatch]);

  const closeModal = useCallback(() => {
    if (onClose) {
      dispatch(myContractsReducer.actions.setUpModalClearInputs({ contractAddress }));
      onClose();
    }
    setIsModalOpen(false);
  }, [contractAddress, dispatch, onClose, setIsModalOpen]);

  const handleApprove = useCallback(
    (tokenAddressField: ISetUpModalTokenAddressField) => {
      const provider = getDefaultProvider();
      dispatch(setUpModalApprove({
        provider,
        contractAddress,
        tokenAddressField,
      }));
    }, [contractAddress, dispatch, getDefaultProvider],
  );

  const isDisabledAcceptButton = useMemo(() => {
    if (!addresses.length) return true;

    const hasInsufficientAllowance = addresses.some(({ allowance }) => {
      if (!allowance) return true;
      return new BigNumber(allowance).isLessThan(MAX_UINT_256);
    });
    if (hasInsufficientAllowance) return true;

    const hasNotAddedTokens = addresses.some(({ isAdded }) => !isAdded);
    if (!hasNotAddedTokens) {
      return true;
    }
    return false;
  }, [addresses]);

  const handleAccept = useCallback(() => {
    if (isDisabledAcceptButton) return;
    if (onAccept) {
      onAccept(
        addresses.filter(({ isAdded }) => !isAdded),
      );
    }
  }, [addresses, isDisabledAcceptButton, onAccept]);

  const { isLight } = useShallowSelector(userSelector.getUser);
  const title = useMemo(
    () => (
      <Box className={classes.modalTitle}>
        <Typography
          align="left"
          className={clsx(isLight ? '' : 'acidGreen gradient')}
          variant="h2"
        >
          Set up
        </Typography>
      </Box>
    ),
    [classes.modalTitle, isLight],
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
        Please determine the addresses of tokens that need to be transferred and
        give approve to the contract to transfer them
      </Typography>
      <Box>
        {addresses.map(({
          id, address, allowance, isAdded,
        }) => (
          <Box key={id} className={classes.inputContainer}>
            <TextField
              value={address}
              label="Token address"
              disabled={isAdded}
              onChange={(e) => handleChange({
                id,
                address: e.target.value,
                allowance,
                isAdded: false,
              })}
            />
            {
              allowance === '0' && (
                <Button
                  className={clsx(classes.button, classes.approveButton)}
                  variant="outlined"
                  disabled={isAdded || approveRequestUi === RequestStatus.REQUEST}
                  onClick={() => handleApprove({
                    id,
                    address,
                    allowance,
                    isAdded: false,
                  })}
                >
                  Approve
                </Button>
              )
            }
          </Box>
        ))}
        {addresses.length < TOKEN_ADDRESSES_MAX_COUNT && (
          <Button
            variant="outlined"
            endIcon={<PlusIcon />}
            onClick={addAddressHandler}
          >
            Add address
          </Button>
        )}
      </Box>
      <Box className={classes.modalControls}>
        <Button
          className={clsx(classes.saveButton, classes.button)}
          size="large"
          type="submit"
          color="secondary"
          variant="outlined"
          disabled={isDisabledAcceptButton}
          onClick={handleAccept}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

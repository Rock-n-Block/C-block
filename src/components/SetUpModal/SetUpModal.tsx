import React, {
  useCallback, useEffect, useMemo, useState, VFC,
} from 'react';
import {
  Typography, Button, Box, TextField,
} from '@material-ui/core';
import clsx from 'clsx';
import { useDebouncedCallback } from 'use-debounce';
import BigNumber from 'bignumber.js';

import userSelector from 'store/user/selectors';
import { useCheckIfTokenAddress, useShallowSelector } from 'hooks';
import { Modal } from 'components/Modal';
import { MAX_UINT_256, TOKEN_ADDRESSES_MAX_COUNT } from 'appConstants';
import { bep20Abi } from 'config/abi';
import { useWalletConnectorContext } from 'services';
import { incrementLastId } from 'utils/identifactors';
import { setNotification, shortenPhrase } from 'utils';
import { PlusIcon } from '../../theme/icons';
import {
  createAddressesArr,
  ISetUpModalTokenAddressField,
  ISetUpModalTokenAddress,
  initTokensAddressesArr,
} from './SetUpModal.helpers';
import { useStyles } from './SetUpModal.styles';

interface Props {
  className?: string;
  open?: boolean;
  contractAddress?: string;
  addresses: ISetUpModalTokenAddress[];
  setIsModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: (addresses: ISetUpModalTokenAddressField[]) => void;
}

export const SetUpModal: VFC<Props> = ({
  open,
  setIsModalOpen,
  contractAddress,
  addresses: initAddresses,
  onClose,
  onAccept,
}) => {
  const { walletService } = useWalletConnectorContext();
  const { address: userWalletAddress } = useShallowSelector(userSelector.getUser);
  const classes = useStyles();
  const [addresses, setAddresses] = useState<ISetUpModalTokenAddressField[]>(
    [],
  );

  const { checkIfTokenAddress } = useCheckIfTokenAddress();

  const resetField = useCallback((id: number) => {
    setAddresses(
      addresses.map((item) => (item.id === id ? {
        id,
        address: '',
        allowance: '',
      } : item)),
    );
  }, [addresses]);

  const addressesGuardFn = useCallback(
    async ({ id, address }: ISetUpModalTokenAddressField) => {
      // filter items due to can be ['', '', '0x111], and it will result as 'has no unique items'
      const addressesArray = addresses.map(({ address }) => address).filter((item) => item);
      const hasUniqueAddresses = addressesArray.length === new Set(addressesArray).size;
      if (!hasUniqueAddresses) {
        setNotification({
          type: 'warning',
          message: `Provided ${shortenPhrase(address)} token's address is already added`,
        });
        resetField(id);
        return false;
      }

      const isTokenAddress = await checkIfTokenAddress(address);
      if (!isTokenAddress) {
        setNotification({
          type: 'warning',
          message: 'Provided token address is invalid',
        });
        resetField(id);
        return false;
      }
      return true;
    },
    [addresses, checkIfTokenAddress, resetField],
  );

  const debouncedCheckAllowance = useDebouncedCallback(
    async (tokenAddressField: ISetUpModalTokenAddressField) => {
      const isValidated = await addressesGuardFn(tokenAddressField);
      if (!isValidated) return;

      const { id, address } = tokenAddressField;
      try {
        const contract = walletService.connectWallet.getContract({ abi: bep20Abi, address });
        const allowance = await contract.methods.allowance(userWalletAddress, contractAddress).call();
        setAddresses(
          addresses.map((item) => (item.id === id ? {
            id,
            address,
            allowance,
          } : item)),
        );
      } catch (err) {
        console.log(err);
      }
    },
    1000,
  );

  useEffect(() => {
    setAddresses(createAddressesArr(initAddresses));
  }, [initAddresses]);

  const addAddressHandler = useCallback(() => {
    setAddresses([
      ...addresses,
      { id: incrementLastId(addresses), address: '', allowance: '' },
    ]);
  }, [addresses]);

  const handleChange = (value: ISetUpModalTokenAddressField) => {
    setAddresses(
      addresses.map((item) => (item.id === value.id ? value : item)),
    );
    debouncedCheckAllowance(value);
  };

  const clearInputs = useCallback(() => {
    setAddresses(initTokensAddressesArr);
  }, []);

  const closeModal = useCallback(() => {
    if (onClose) {
      clearInputs();
      onClose();
    }
    setIsModalOpen(false);
  }, [clearInputs, onClose, setIsModalOpen]);

  const handleApprove = async ({ id, address }: ISetUpModalTokenAddressField) => {
    try {
      const contract = walletService.connectWallet.getContract({ abi: bep20Abi, address });
      await contract.methods.approve(contractAddress, MAX_UINT_256).send({
        from: userWalletAddress,
      });

      handleChange({
        id,
        address,
        allowance: MAX_UINT_256,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const isDisabledAcceptButton = useMemo(() => {
    if (!addresses.length) return true;
    return addresses.some(({ allowance }) => {
      if (!allowance) return true;
      return new BigNumber(allowance).isLessThan(MAX_UINT_256);
    });
  }, [addresses]);

  const handleAccept = useCallback(() => {
    if (isDisabledAcceptButton) return;
    if (onAccept) {
      onAccept(
        addresses.filter(({ address }) => !initAddresses
          .map(({ address: initAddress }) => initAddress.toLowerCase())
          .includes(address.toLowerCase())),
      );
    }
    closeModal();
  }, [addresses, closeModal, initAddresses, isDisabledAcceptButton, onAccept]);

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
        {addresses.map(({ id, address, allowance }) => (
          <Box key={id} className={classes.inputContainer}>
            <TextField
              value={address}
              label="Token address"
              onChange={(e) => handleChange({
                id,
                address: e.target.value,
                allowance,
              })}
            />
            {
              allowance === '0' && (
                <Button
                  className={clsx(classes.button, classes.approveButton)}
                  variant="outlined"
                  onClick={() => handleApprove({
                    id,
                    address,
                    allowance,
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

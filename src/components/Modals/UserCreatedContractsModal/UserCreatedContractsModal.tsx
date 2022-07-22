import React, {
  useCallback, VFC,
} from 'react';

import { AddressButton, Modal } from 'components';
import { IGetContractsReturnType, TGetContracts } from 'store/api/apiRequestBuilder.types';
import { Typography } from '@material-ui/core';
import { useStyles } from './UserCreatedContractsModal.styles';

export interface UserCreatedContractsModalProps {
  contracts?: IGetContractsReturnType;
  open: boolean;
  onClose: () => void;
  className?: string;
}

export const UserCreatedContractsModal: VFC<UserCreatedContractsModalProps> = ({
  contracts: contractsMap, open, onClose, className,
}) => {
  const handleCloseModal = useCallback(() => {
    onClose();
  }, [onClose]);

  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      title="User Contracts"
      className={className}
    >
      <>
        {
          contractsMap && Object.entries(contractsMap).reduce((
            accumulator,
            [contractName, contracts]: [keyof IGetContractsReturnType, TGetContracts[]],
          ) => {
            if (contracts.length) {
              accumulator.push(
                <Typography
                  key={contractName}
                  style={{ marginBottom: 16 }}
                  variant="h5"
                >
                  {contractName}
                </Typography>,
              );
            }
            contracts.forEach((contract) => {
              accumulator.push(
                <AddressButton
                  key={contract.address}
                  address={contract.address}
                  className={classes.addressBtn}
                />,
              );
            });
            return accumulator;
          }, [])
        }
      </>
    </Modal>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import {
  Button, Container, Grid, Typography,
} from '@material-ui/core';
import clsx from 'clsx';

import userSelectors from 'store/user/selectors';
import contractFormsSelector from 'store/contractForms/selectors';
import adminActions from 'store/admin/actions';
import adminSelector from 'store/admin/selectors';

import { useShallowSelector, useWeb3Provider } from 'hooks';

import { ChangePriceCard, CheckBox, EditableField } from 'components';
import { SuccessIcon } from 'theme/icons';
import { routes } from 'appConstants';

import {
  contractsHelper, getTokenAmountDisplay, setNotification,
} from 'utils';
import { FactoryContracts } from 'types/utils/contractsHelper';
import { contractsMock, getContracts } from './AdminPanel.helpers';
import { useStyle } from './AdminPanel.styles';

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const { getDefaultProvider } = useWeb3Provider();
  const [isAllowedDeployToMainnet, setIsAllowedDeployToMainnet] = useState(false);
  const [isPaymentsReceiverFieldEdit, setIsPaymentsReceiverFieldEdit] = useState(false);
  const [selectedContractType, setSelectedContractType] = useState<FactoryContracts>(
    contractsMock[0],
  );

  const handleIsAllowedDeployToMainnet = () => {
    setIsAllowedDeployToMainnet((prevState) => !prevState);
  };

  const { paymentsReceiverAddress: defaultPaymentsReceiverAddress } = useShallowSelector(
    adminSelector.selectState,
  );
  const [paymentsReceiverAddress, setPaymentsReceiverAddress] = useState(
    defaultPaymentsReceiverAddress,
  );
  const { isAdmin, isMainnet } = useShallowSelector(
    userSelectors.getUser,
  );
  const celoDecimals = useMemo(
    () => contractsHelper.getChainNativeCurrency(isMainnet).decimals,
    [isMainnet],
  );
  const handleChangePaymentsReceiverAddress = (fieldValue: string | number) => {
    setPaymentsReceiverAddress(fieldValue.toString());
  };
  const handleSavePaymentsReceiverAddress = (fieldValue: string | number) => {
    setIsPaymentsReceiverFieldEdit(!isPaymentsReceiverFieldEdit);

    // trigger only if saved & not allowed to edit
    if (isPaymentsReceiverFieldEdit) {
      const isValidEthAddress = Web3.utils.isAddress(fieldValue.toString());

      if (!isValidEthAddress) {
        setNotification({
          type: 'error',
          message: 'Incorrect payments receiver address format',
        });
        setPaymentsReceiverAddress(defaultPaymentsReceiverAddress);
        return;
      }

      dispatch(
        adminActions.setPaymentsReceiver({
          provider: getDefaultProvider(),
          paymentsReceiverAddress: fieldValue.toString(),
        }),
      );
    }
  };

  const handleSavePrice = (deployContractName: TDeployContractCreationMethodNames) => (
    fieldValue: string | number,
    isEditMode: boolean,
  ) => {
    // trigger only if saved & not allowed to edit
    if (isEditMode) return;
    dispatch(
      adminActions.setPrice({
        provider: getDefaultProvider(),
        contractType: selectedContractType,
        deployContractName,
        price: fieldValue.toString(),
      }),
    );
  };

  useEffect(() => {
    setPaymentsReceiverAddress(
      defaultPaymentsReceiverAddress,
    );
  }, [defaultPaymentsReceiverAddress]);
  useEffect(() => {
    if (!isAdmin) {
      navigate(routes.root);
      setNotification({
        type: 'error',
        message: 'You have insufficient permissions to see this page',
      });
    }
    // NOTE: make sure that deps has only isAdmin, due to [isAdmin, navigate] causes to run this effect twice
  }, [isAdmin]);

  useEffect(() => {
    dispatch(
      getContractsMinCreationPrice({
        provider: getDefaultProvider(),
      }),
    );
  }, [dispatch, getDefaultProvider]);

  const contractForms = useShallowSelector(contractFormsSelector.getContractForms);
  const classes = useStyle();

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={9} lg={7} xl={7}>
          <CheckBox
            className={classes.checkBox}
            name="Allow users to deploy contracts to mainnet"
            value={isAllowedDeployToMainnet}
            label="Allow users to deploy contracts to mainnet"
            onClick={handleIsAllowedDeployToMainnet}
          />
          <Typography variant="h3" className={classes.addressLabel}>
            Manage payments` receiving address
          </Typography>
          <EditableField
            className={classes.fieldContainer}
            icon={<SuccessIcon className={classes.icon} />}
            value={paymentsReceiverAddress}
            disabled={!isPaymentsReceiverFieldEdit}
            onClick={handleSavePaymentsReceiverAddress}
            onChange={handleChangePaymentsReceiverAddress}
          />
          <Typography variant="h3" className={classes.contractsLabel}>
            Set prices for contracts creation
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        {contractsMock.map((title) => (
          <Grid key={title} item xs={12} sm={4} md={4} lg={2} xl={2}>
            <Button
              className={clsx(classes.tabButton, {
                [classes.tabButtonNotActive]: title !== selectedContractType,
              }, 'border-radius-s')}
              size="small"
              variant="contained"
              onClick={() => setSelectedContractType(title)}
            >
              {title}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container className={classes.cardsContainer}>
        {
          getContracts(selectedContractType, contractForms).map(({
            contractDeployName, contractDisplayName, price = '',
          }) => {
            const celoPrice = getTokenAmountDisplay(price, celoDecimals);
            return (
              <Grid
                key={contractDeployName}
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
              >
                <ChangePriceCard
                  title={contractDisplayName}
                  price={celoPrice}
                  onClick={handleSavePrice(contractDeployName)}
                />
              </Grid>
            );
          })
        }
      </Grid>
    </Container>
  );
};

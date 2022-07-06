import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import {
  Button, Container, Grid, Typography,
} from '@material-ui/core';
import clsx from 'clsx';

import userSelectors from 'store/user/selectors';
import contractFormsSelector from 'store/contractForms/selectors';
import adminActions from 'store/admin/actions';
import adminActionTypes from 'store/admin/actionTypes';
import adminSelector from 'store/admin/selectors';
import uiSelectors from 'store/ui/selectors';
import ratesSelectors from 'store/rates/selectors';

import { useShallowSelector, useWeb3Provider } from 'hooks';

import {
  ChangePriceCard, CheckBox, EditableField,
} from 'components';
import { SuccessIcon } from 'theme/icons';
import { routes } from 'appConstants';

import {
  contractsHelper, getTokenAmountDisplay, setNotification,
} from 'utils';
import { FactoryContracts, TDeployContractCreationMethodNames, Tokens } from 'types/utils/contractsHelper';
import { getContractsMinCreationPrice } from 'store/contractForms/actions';
import { Modals, RequestStatus } from 'types';
import { setActiveModal } from 'store/modals/reducer';
import { getRates } from 'store/rates/actions';
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
    setIsAllowedDeployToMainnet((prevState) => {
      dispatch(
        adminActions.setIsMainnetDisabled({
          isMainnetDisabled: prevState,
        }),
      );
      return !prevState;
    });
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
    () => contractsHelper.getTokensDecimals('celo', isMainnet),
    [isMainnet],
  );
  const cusdDecimals = useMemo(
    () => contractsHelper.getTokensDecimals('cusd', isMainnet),
    [isMainnet],
  );
  const rates = useShallowSelector(ratesSelectors.selectRates);
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

  const handleSavePrice = (
    deployContractName: TDeployContractCreationMethodNames,
  ) => (
    fieldValue: string | number,
    isEditMode: boolean,
    tokenName: Tokens,
  ) => {
    // trigger only if saved & not allowed to edit
    if (isEditMode) return;
    dispatch(
      adminActions.setPrice({
        provider: getDefaultProvider(),
        contractType: selectedContractType,
        deployContractName,
        price: fieldValue.toString(),
        tokenName,
      }),
    );
  };

  useEffect(() => {
    setPaymentsReceiverAddress(
      defaultPaymentsReceiverAddress,
    );
  }, [defaultPaymentsReceiverAddress]);

  useEffect(() => {
    dispatch(
      getContractsMinCreationPrice({
        provider: getDefaultProvider(),
      }),
    );
  }, [dispatch, getDefaultProvider]);
  useEffect(() => {
    dispatch(
      getRates(),
    );
  }, [dispatch]);

  const adminCheckIsAdminRequestStatus = useShallowSelector(
    uiSelectors.getProp(adminActionTypes.ADMIN_CHECK_IS_ADMIN),
  );

  useEffect(() => {
    dispatch(setActiveModal({
      activeModal: Modals.FullscreenLoader,
      open: true,
    }));
  }, [dispatch]);

  useEffect(() => {
    if (adminCheckIsAdminRequestStatus === RequestStatus.SUCCESS) {
      dispatch(setActiveModal({
        activeModal: Modals.Init,
        open: false,
      }));
    }
  }, [adminCheckIsAdminRequestStatus, dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
    if (adminCheckIsAdminRequestStatus !== RequestStatus.SUCCESS &&
      adminCheckIsAdminRequestStatus !== RequestStatus.ERROR) return;
    if (!isAdmin) {
      navigate(routes.root);
      setNotification({
        type: 'error',
        message: 'You have insufficient permissions to see this page',
      });
    }
    // NOTE: make sure that deps has only [isAdmin, adminCheckIsAdminRequestStatus], due to [isAdmin, navigate] causes to run this effect twice
  }, [adminCheckIsAdminRequestStatus, isAdmin]);

  const contractForms = useShallowSelector(contractFormsSelector.getContractForms);
  const classes = useStyle();

  if (adminCheckIsAdminRequestStatus === RequestStatus.REQUEST) {
    return null;
  }

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
            otherClasses={{
              textField: classes.fieldContainerLargeIconPadding,
            }}
            InputProps={{
              endAdornment: <SuccessIcon />,
            }}
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
            contractDeployName, contractDisplayName, price = [],
          }) => {
            const [
              rawCeloPrice,
              rawCusdPrice,
            ] = price;
            const celoPrice = getTokenAmountDisplay(rawCeloPrice, celoDecimals);
            const cusdPrice = getTokenAmountDisplay(rawCusdPrice, cusdDecimals);
            const prices: Record<Tokens, string> = {
              celo: celoPrice,
              cusd: cusdPrice,
            };
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
                  prices={prices}
                  usdPerCelo={rates['celo']}
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

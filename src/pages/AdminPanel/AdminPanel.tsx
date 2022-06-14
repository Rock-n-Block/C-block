import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Container, Grid, Typography,
} from '@material-ui/core';
import clsx from 'clsx';

import userSelectors from 'store/user/selectors';
import contractFormsSelector from 'store/contractForms/selectors';
import { useShallowSelector } from 'hooks';

import { ChangePriceCard, CheckBox, EditableField } from 'components';
import { SuccessIcon } from 'theme/icons';
import { routes } from 'appConstants';

import { contractsHelper, getTokenAmountDisplay, setNotification } from 'utils';
import { FactoryContracts } from 'types/utils/contractsHelper';
import { contractsMock, getContracts } from './AdminPanel.helpers';
import { useStyle } from './AdminPanel.styles';

export const AdminPanel = () => {
  const [isAllowedDeployToMainnet, setIsAllowedDeployToMainnet] = useState(false);
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [selectedContractType, setSelectedContractType] = useState<FactoryContracts>(
    contractsMock[0],
  );

  const handleIsAllowedDeployToMainnet = () => {
    setIsAllowedDeployToMainnet((prevState) => !prevState);
  };

  const handleChangePaymentsReceiverAddress = (fieldValue: string | number, isDisabled: boolean) => {
    console.log(fieldValue, isDisabled);
    setIsChangeMode(!isChangeMode);
  };

  const { isAdmin, isMainnet } = useShallowSelector(
    userSelectors.getUser,
  );
  const navigate = useNavigate();
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

  const contractForms = useShallowSelector(contractFormsSelector.getContractForms);
  const celoDecimals = useMemo(
    () => contractsHelper.getChainNativeCurrency(isMainnet).decimals,
    [isMainnet],
  );

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
            defaultValue="0x3a9A34d723f080a4f0B2fA72fc9F497028dA6414"
            disabled={!isChangeMode}
            onClick={handleChangePaymentsReceiverAddress}
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
          getContracts(selectedContractType, contractForms).map(({ contractDeployName, contractDisplayName, price = '' }) => {
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
                />
              </Grid>
            );
          })
        }
      </Grid>
    </Container>
  );
};

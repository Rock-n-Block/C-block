import React, { useState } from 'react';
import {
  Button, Container, Grid, Typography,
} from '@material-ui/core';
import { SuccessIcon } from 'theme/icons';
import { ChangePriceCard } from 'components/ChangePriceCard';
import clsx from 'clsx';
import { CheckBox } from 'components';
import { EditableField } from 'components/EditableField';
import { contractsMock } from './AdminPanel.helpers';
import { useStyle } from './AdminPanel.styles';

export const AdminPanel = () => {
  const classes = useStyle();
  const [selectedContractType, setSelectedContractType] = useState(contractsMock[0]);
  const [isChangeMode, setIsChangeMode] = useState(false);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={9} lg={7} xl={7}>
          <CheckBox className={classes.checkBox} name="Allow to deloy" value label="Allow users to deploy contracts to mainnet" onClick={() => {}} />
          <Typography variant="h3" className={classes.addressLabel}>Manage payments` receiving address</Typography>
          <EditableField
            className={classes.fieldContainer}
            icon={<SuccessIcon className={classes.icon} />}
            value="0x3a9A34d723f080a4f0B2fA72fc9F497028dA6414"
            disabled={!isChangeMode}
            onClick={() => setIsChangeMode(!isChangeMode)}
          />
          <Typography variant="h3" className={classes.contractsLabel}>Set prices for contracts creation</Typography>
        </Grid>
      </Grid>
      <Grid container>
        {contractsMock.map((title) => (
          <Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
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
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          // key={}
        >
          <ChangePriceCard title="Crowdsale DatesChangeable Non-Softcappable Non-Bonusable" price={18.762} />
        </Grid>
      </Grid>
    </Container>
  );
};

import React, {
  FC, useMemo, useState, MouseEvent,
} from 'react';
import {
  Grid,
  Box,
  Collapse,
  IconButton,
  Typography,
  Button,
  TextField,
  Hidden,
  Tooltip,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clsx from 'clsx';
import {
  UserNameBox,
  Copyable,
  CheckBox,
} from 'components';
import userSelectors from 'store/user/selectors';

import { CrownIcon } from 'theme/icons';
import { Permissions } from 'types/store/user';
import { UserView } from 'types';
import { useShallowSelector } from 'hooks';
import { useStyles } from './Row.styles';

type RowProps = {
  row: UserView;
  permissions: Permissions;
  onUserContractsOpen: (event: MouseEvent<HTMLInputElement>) => void;
  onFreezeUser: (event: MouseEvent<HTMLButtonElement>) => void;
  onSendEmailModalOpen: (event: MouseEvent<HTMLButtonElement>) => void;
  onPermissionsOpen: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const Row: FC<RowProps> = ({
  permissions, row, onUserContractsOpen, onFreezeUser, onSendEmailModalOpen, onPermissionsOpen,
}) => {
  const [open, setOpen] = useState(false);
  const { id: userId, countryCodes } = useShallowSelector(
    userSelectors.getUser,
  );
  const localeData = useMemo(
    () => countryCodes.find(({ countryCode }) => countryCode === row.country),
    [countryCodes, row.country],
  );
  const rowCountry = useMemo(
    () => [row.country, localeData?.countryName].filter((item) => item).join(', '),
    [localeData?.countryName, row.country],
  );

  const userCreatedContractsJsx = useMemo(() => (
    <Button variant="outlined" fullWidth onClick={onUserContractsOpen}>
      <Typography variant="button">
        Contracts` addresses created by this user
      </Typography>
    </Button>
  ), [onUserContractsOpen]);

  const hasPermissions = useMemo(
    () => Object.values(row.permissions).some((item) => item),
    [row.permissions],
  );
  const classes = useStyles({ hasPermissions, isExpanded: open });

  return (
    <Grid
      item
      container
      xs={12}
      className={classes.root}
    >
      <Grid item xs={12} className={classes.head}>
        <Box>
          <Grid item container xs={12}>
            <Grid item xs={4} sm={5} md={2}>
              <UserNameBox
                className={classes.userNameBox}
                name={row.userName}
                imageUrl={row.avatarUrl}
                isExtended={false}
              />
            </Grid>
            <Grid item xs={5} sm={5} md={3}>
              <Tooltip title={row.email} arrow interactive>
                <Typography variant="body2" noWrap>{row.email}</Typography>
              </Tooltip>
            </Grid>
            <Hidden only={['xs', 'sm']}>
              <Grid item xs={3}>
                <TextField
                  name="walletAddress"
                  InputProps={{
                    className: classes.textField,
                    readOnly: true,
                    endAdornment: (
                      <Copyable className={classes.copyableIcon} valueToCopy={row.ownerAddress} withIcon />
                    ),
                  }}
                  disabled
                  value={row.ownerAddress}
                />
              </Grid>
            </Hidden>
            <Grid item xs={3} sm={2} md={4} className={classes.actionCol}>
              <Hidden only={['xs', 'sm']}>
                {
                  permissions.freezeUsers && (
                    <CheckBox
                      className={classes.textField}
                      name="Freeze user"
                      value={row.isFrozen}
                      label="Freeze user"
                      onClick={onFreezeUser}
                    />
                  )
                }
              </Hidden>
              {
                permissions.superAdmin && (
                  <IconButton
                    className={classes.permissionsIconBtn}
                    aria-label="set permissions"
                    aria-haspopup="true"
                    color="primary"
                    size="small"
                    onClick={onPermissionsOpen}
                    disabled={userId === row.id}
                  >
                    <CrownIcon />
                  </IconButton>
                )
              }
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid item xs={12}>
            <IconButton
              className={classes.collapseIconBtn}
              aria-label="expand row"
              color="primary"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12} className={classes.collapseCell}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box className={classes.collapseBox}>
            <Grid container>
              <Grid item xs={6} md={2}>
                <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                  Registration time
                </Typography>
                <Typography className={classes.rowText}>
                  {
                    new Date(row.registrationDate).toLocaleString()
                  }
                </Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                  Tel
                </Typography>
                <Typography className={classes.rowText}>{row.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                  Company
                </Typography>
                <Typography className={classes.rowText}>{row.company}</Typography>
              </Grid>
              <Hidden only={['xs', 'sm']}>
                <Grid item sm={5}>
                  {
                    userCreatedContractsJsx
                  }
                </Grid>
              </Hidden>

              <Grid item xs={6} md={2}>
                <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                  Country
                </Typography>
                <Typography className={classes.rowText}>
                  {
                    rowCountry
                  }
                </Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                  Address
                </Typography>
                <Typography className={classes.rowText}>
                  {`${row.city} ${row.street} ${row.office} ${row.building}`}
                </Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                  Zipcode
                </Typography>
                <Typography className={classes.rowText}>{row.zipcode}</Typography>
              </Grid>
              <Hidden only={['md', 'lg', 'xl']}>
                {
                  permissions.freezeUsers && (
                    <Grid item xs={8} sm={6}>
                      <CheckBox
                        className={classes.textField}
                        name="Freeze user"
                        value={row.isFrozen}
                        label="Freeze user"
                        onClick={onFreezeUser}
                      />
                    </Grid>
                  )
                }
                <Grid item xs={12}>
                  {
                    userCreatedContractsJsx
                  }
                </Grid>
              </Hidden>
              {
                permissions.contactUsers && (
                  <Grid item xs={12} md={5}>
                    <Button variant="outlined" fullWidth onClick={onSendEmailModalOpen}>
                      <Typography variant="button">
                        Send an e-mail to user
                      </Typography>
                    </Button>
                  </Grid>
                )
              }
            </Grid>
          </Box>
        </Collapse>
      </Grid>
    </Grid>
  );
};

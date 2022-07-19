import React, {
  FC, useMemo, useState, MouseEvent, useEffect, Fragment,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Box,
  Collapse,
  IconButton,
  Typography,
  Button,
  TextField,
  Menu,
  MenuItem,
  Hidden,
  Checkbox,
  CircularProgress,
  ListSubheader,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clsx from 'clsx';
import { UserNameBox, Copyable, CheckBox } from 'components';
import { SendEmailModal, SendEmailModalProps } from 'components/Modals';
import adminActions from 'store/admin/actions';
import adminActionTypes from 'store/admin/actionTypes';
import uiSelector from 'store/ui/selectors';

import { CrownIcon } from 'theme/icons';
import { Permissions } from 'types/store/user';
import { RequestStatus, UserView } from 'types';
import { useShallowSelector } from 'hooks';
import { TGetContracts, IGetContractsReturnType } from 'store/api/apiRequestBuilder.types';
import { head } from '../AdminPanel.helpers';
import { useStyles, useRowStyles } from './CollapsibleList.styles';

type RowProps = {
  row: UserView;
  permissions: Permissions;
  onUserContractsOpen: (event: MouseEvent<HTMLInputElement>) => void;
  onFreezeUser: (event: MouseEvent<HTMLButtonElement>) => void;
  onSendEmailModalOpen: (event: MouseEvent<HTMLButtonElement>) => void;
  onPermissionsOpen: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Row: FC<RowProps> = ({
  permissions, row, onUserContractsOpen, onFreezeUser, onSendEmailModalOpen, onPermissionsOpen,
}) => {
  const [open, setOpen] = useState(false);
  const getUserContractsRequestStatus = useShallowSelector(
    uiSelector.getProp(`${adminActionTypes.ADMIN_GET_USER_CONTRACTS}_${row.id}`),
  );
  const hasPermissions = useMemo(
    () => Object.values(row.permissions).some((item) => item),
    [row.permissions],
  );
  const classes = useRowStyles({ hasPermissions });

  return (
    <Grid
      item
      container
      xs={12}
      style={{
        alignItems: 'center',
      }}
      className={classes.root}
    >
      <Grid item xs={4} sm={5} md={2}>
        <UserNameBox
          className={classes.userNameBox}
          name={row.userName}
          imageUrl={row.avatarUrl}
          isExtended={false}
        />
      </Grid>
      <Grid item xs={5} sm={5} md={2}>{row.email}</Grid>
      <Hidden only={['xs', 'sm']}>
        <Grid item xs={4}>
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
        <Box>
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
              >
                <CrownIcon />
              </IconButton>
            )
          }

        </Box>

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
                  <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                    Contracts` addresses created by this user
                  </Typography>
                  <TextField
                    defaultValue=""
                    InputProps={{
                      className: classes.textField,
                      startAdornment: getUserContractsRequestStatus === RequestStatus.REQUEST ? (
                        <CircularProgress
                          className={classes.loader}
                          color="inherit"
                          size={24}
                        />
                      ) : null,
                    }}
                    SelectProps={{
                      onOpen: onUserContractsOpen,
                      MenuProps: {
                        style: {
                          maxHeight: 300,
                        },
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                      },
                    }}
                    select
                  >
                    {
                      Object.entries(row.contracts).reduce((
                        accumulator,
                        [contractName, contracts]: [keyof IGetContractsReturnType, TGetContracts[]],
                      ) => {
                        if (contracts.length) {
                          accumulator.push(
                            <ListSubheader key={contractName}>{contractName}</ListSubheader>,
                          );
                        }
                        contracts.forEach((contract) => {
                          accumulator.push(
                            <MenuItem
                              key={contract.address}
                              value={contract.address}
                            >
                              {contract.address}
                            </MenuItem>,
                          );
                        });
                        return accumulator;
                      }, [])
                    }
                  </TextField>
                </Grid>
              </Hidden>

              <Grid item xs={6} md={2}>
                <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                  Country
                </Typography>
                <Typography className={classes.rowText}>{row.country}</Typography>
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
                  <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                    Contracts` addresses created by this user
                  </Typography>
                  <TextField
                    defaultValue=""
                    InputProps={{
                      className: classes.textField,
                      startAdornment: getUserContractsRequestStatus === RequestStatus.REQUEST ? (
                        <CircularProgress
                          className={classes.loader}
                          color="inherit"
                          size={24}
                        />
                      ) : null,
                    }}
                    SelectProps={{
                      onOpen: onUserContractsOpen,
                      MenuProps: {
                        style: {
                          maxHeight: 300,
                        },
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                      },
                    }}
                    select
                  >
                    {
                      Object.entries(row.contracts).reduce((
                        accumulator,
                        [contractName, contracts]: [keyof IGetContractsReturnType, TGetContracts[]],
                      ) => {
                        if (contracts.length) {
                          accumulator.push(
                            <ListSubheader key={contractName}>{contractName}</ListSubheader>,
                          );
                        }
                        contracts.forEach((contract) => {
                          accumulator.push(
                            <MenuItem
                              key={contract.address}
                              value={contract.address}
                            >
                              {contract.address}
                            </MenuItem>,
                          );
                        });
                        return accumulator;
                      }, [])
                    }
                  </TextField>
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

type CollapsibleListProps = {
  permissions: Permissions;
  rows: UserView[];
  currentPage: number;
  maxRows?: number;
};

export const CollapsibleList: FC<CollapsibleListProps> = ({
  rows, permissions, currentPage, maxRows = 5,
}) => {
  const [permissionsMenuEl, setPermissionMenuEl] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState<null | UserView>(null);

  const handlePermissionsOpen = (currentUserData: UserView) => (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    setPermissionMenuEl(event.currentTarget);
    setUserData(currentUserData);
  };
  const handlePermissionsClose = () => setPermissionMenuEl(null);

  const [sendEmailModalState, setSendEmailModalState] = useState<SendEmailModalProps>({
    open: false,
    emailTo: '',
  });
  const handleCloseAdminSendEmailModal = () => {
    setSendEmailModalState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleSendEmailModalOpen = (currentUserData: UserView) => () => {
    setSendEmailModalState((prevState) => ({
      ...prevState,
      open: true,
      emailTo: currentUserData.email,
    }));
    setUserData(currentUserData);
  };

  const dispatch = useDispatch();
  const handleUserContractsOpen = (currentUserData: UserView) => (
    event: MouseEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(
      adminActions.getUserContracts({
        userId: currentUserData.id,
      }),
    );
  };
  const handleAdminSendEmail = (request: string) => {
    dispatch(adminActions.sendEmail({
      userId: userData.id,
      message: request,
    }));
  };

  const handleFreezeUser = (currentUserData: UserView) => () => {
    dispatch(adminActions.setIsFrozenUser({
      userId: currentUserData.id,
      isFrozen: !currentUserData.isFrozen,
    }));
  };

  const adminSendEmailRequestStatus = useShallowSelector(
    uiSelector.getProp(adminActionTypes.ADMIN_SEND_EMAIL),
  );
  useEffect(() => {
    if (adminSendEmailRequestStatus === RequestStatus.SUCCESS) {
      handleCloseAdminSendEmailModal();
    }
  }, [adminSendEmailRequestStatus]);

  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Hidden only={['xs', 'sm']}>
          <Grid item container xs={12} className={classes.head}>
            {
              head.map(({ name, props }) => <Grid key={name} item {...props}>{name}</Grid>)
            }
          </Grid>
        </Hidden>

        {rows.slice((currentPage - 1) * maxRows, currentPage * maxRows).map((row) => (
          <Row
            key={row.id}
            row={row}
            permissions={permissions}
            onUserContractsOpen={handleUserContractsOpen(row)}
            onFreezeUser={handleFreezeUser(row)}
            onSendEmailModalOpen={handleSendEmailModalOpen(row)}
            onPermissionsOpen={handlePermissionsOpen(row)}
          />
        ))}
        <Menu
          PaperProps={{
            className: classes.permissionsMenuPaper,
          }}
          MenuListProps={{
            className: classes.permissionsMenuListRoot,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          getContentAnchorEl={null}
          anchorEl={permissionsMenuEl}
          keepMounted
          open={Boolean(permissionsMenuEl)}
          onClose={handlePermissionsClose}
        >
          <MenuItem className={classes.permissionsMenuItemRoot}>
            <Box className={classes.permissionsMenuItemContent}>
              <Typography className="articleSmallBold" variant="body1">
                Permissions
              </Typography>
              {
                userData &&
                [{
                  isChecked: userData.permissions.viewUsers,
                  name: 'View users database',
                },
                {
                  isChecked: userData.permissions.freezeUsers,
                  name: 'Freeze users',
                },
                {
                  isChecked: userData.permissions.contactUsers,
                  name: 'Contact users',
                },
                {
                  isChecked: userData.permissions.setPrice,
                  name: 'Change prices',
                },
                {
                  isChecked: userData.permissions.changeNetworkMode,
                  name: 'Disable Mainnet toggle',
                },
                {
                  isChecked: userData.permissions.setFeeReceiver,
                  name: 'Change payment address',
                },
                ].map(({ isChecked, name }) => (
                  <Box key={name} className={classes.permissionsMenuItemCheckbox}>
                    <Checkbox
                      className={classes.checkbox}
                      checked={isChecked}
                      tabIndex={-1}
                      disableRipple
                    />
                    <Typography className={classes.checkBoxText}>
                      {name}
                    </Typography>
                  </Box>
                ))
              }
              <Box className={classes.permissionsMenuItemBtnGroup}>
                <Button
                  color="secondary"
                  variant="outlined"
                  fullWidth
                >
                  SAVE
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  fullWidth
                  onClick={handlePermissionsClose}
                >
                  CANCEL
                </Button>
              </Box>
            </Box>
          </MenuItem>
        </Menu>
      </Grid>
      <SendEmailModal
        {...sendEmailModalState}
        onClose={handleCloseAdminSendEmailModal}
        onSubmit={handleAdminSendEmail}
      />
    </>
  );
};

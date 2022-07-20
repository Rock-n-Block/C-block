import React, {
  FC, useState, MouseEvent, useEffect, Fragment,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Hidden,
  Checkbox,
} from '@material-ui/core';
import { SendEmailModal, SendEmailModalProps } from 'components/Modals';
import adminActions from 'store/admin/actions';
import adminActionTypes from 'store/admin/actionTypes';
import uiSelector from 'store/ui/selectors';

import { Permissions } from 'types/store/user';
import { RequestStatus, UserView } from 'types';
import { useShallowSelector } from 'hooks';
import { head } from '../AdminPanel.helpers';
import { useStyles } from './CollapsibleList.styles';
import { Row } from './Row';

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
          <Grid item xs={12} className={classes.head}>
            <Box>
              <Grid container style={{ width: '100%' }}>
                {
                  head.map(({ name, props }) => <Grid key={name} item {...props}>{name}</Grid>)
                }
              </Grid>
            </Box>
            <Box>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
            </Box>
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

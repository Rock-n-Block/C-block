import React, {
  FC, useState, MouseEvent, useEffect, Fragment,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Box,
  Hidden,
} from '@material-ui/core';
import { SendEmailModal, SendEmailModalProps } from 'components/Modals';
import adminActions from 'store/admin/actions';
import adminActionTypes from 'store/admin/actionTypes';
import uiSelector from 'store/ui/selectors';

import { Permissions } from 'types/store/user';
import { RequestStatus, UserView } from 'types';
import { useShallowSelector, useWeb3Provider } from 'hooks';
import { shallowDifference } from 'utils';
import { head } from '../AdminPanel.helpers';
import { useStyles } from './CollapsibleList.styles';
import { Row } from './Row';
import { PermissionsMenu } from './PermissionsMenu';

type CollapsibleListProps = {
  permissions: Permissions;
  rows: UserView[];
  currentPage: number;
  maxRows?: number;
};

export const CollapsibleList: FC<CollapsibleListProps> = ({
  rows, permissions, currentPage, maxRows = 5,
}) => {
  const dispatch = useDispatch();
  const { getDefaultProvider } = useWeb3Provider();
  const [permissionsMenuEl, setPermissionMenuEl] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState<null | UserView>(null);

  const handlePermissionsOpen = (currentUserData: UserView) => (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    setPermissionMenuEl(event.currentTarget);
    setUserData(currentUserData);
  };
  const handlePermissionsClose = () => setPermissionMenuEl(null);
  const handlePermissionsSave = (permissions: Permissions) => {
    const permissionsDiff = shallowDifference(userData.permissions, permissions);
    if (Object.keys(permissionsDiff).length) {
      dispatch(
        adminActions.updatePermissions({
          provider: getDefaultProvider(),
          userId: userData.id,
          permissions: permissionsDiff,
        }),
      );
    }
    handlePermissionsClose();
  };

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
        {
          userData && (
            <PermissionsMenu
              anchorEl={permissionsMenuEl}
              defaultPermissions={userData.permissions}
              onSave={handlePermissionsSave}
              onClose={handlePermissionsClose}
            />
          )
        }
      </Grid>
      <SendEmailModal
        {...sendEmailModalState}
        onClose={handleCloseAdminSendEmailModal}
        onSubmit={handleAdminSendEmail}
      />
    </>
  );
};

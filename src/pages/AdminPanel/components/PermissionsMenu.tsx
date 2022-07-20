import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuProps,
  MenuItem,
  Checkbox,
} from '@material-ui/core';

import { Permissions } from 'types/store/user';
import { useStyles } from './PermissionsMenu.styles';

type PermissionsMenuProps = {
  anchorEl?: MenuProps['anchorEl'];
  defaultPermissions: Permissions;
  onSave?: (permissions: Permissions) => void;
  onClose?: () => void;
};

type PermissionsItem = { key: keyof Permissions; isChecked: boolean; name: string };

export const PermissionsMenu: FC<PermissionsMenuProps> = ({
  anchorEl, defaultPermissions, onSave, onClose,
}) => {
  const [permissions, setPermissions] = useState(defaultPermissions);
  const permissionsArray: PermissionsItem[] = [
    {
      key: 'viewUsers',
      isChecked: permissions.viewUsers,
      name: 'View users database',
    },
    {
      key: 'freezeUsers',
      isChecked: permissions.freezeUsers,
      name: 'Freeze users',
    },
    {
      key: 'contactUsers',
      isChecked: permissions.contactUsers,
      name: 'Contact users',
    },
    {
      key: 'setPrice',
      isChecked: permissions.setPrice,
      name: 'Change prices',
    },
    {
      key: 'changeNetworkMode',
      isChecked: permissions.changeNetworkMode,
      name: 'Disable Mainnet toggle',
    },
    {
      key: 'setFeeReceiver',
      isChecked: permissions.setFeeReceiver,
      name: 'Change payment address',
    },
  ];
  const handleChangeCheckbox = (key: keyof Permissions, isChecked: boolean) => () => {
    setPermissions((prevState) => ({
      ...prevState,
      [key]: isChecked,
    }));
  };
  const handleClose = () => {
    setPermissions(defaultPermissions);
    if (onClose) {
      onClose();
    }
  };
  const handleSave = () => {
    if (onSave) {
      onSave(permissions);
    }
    setPermissions(defaultPermissions);
  };

  useEffect(() => {
    // @see https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props
    setPermissions(defaultPermissions);
  }, [defaultPermissions]);

  useEffect(() => {
    // automatically set viewUsers permission if 'freeze' or 'contact' is enabled
    if (permissions.freezeUsers || permissions.contactUsers) {
      setPermissions((prevState) => ({
        ...prevState,
        viewUsers: true,
      }));
    }
  }, [permissions.contactUsers, permissions.freezeUsers]);

  const classes = useStyles();

  return (
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
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem className={classes.permissionsMenuItemRoot}>
        <Box className={classes.permissionsMenuItemContent}>
          <Typography className="articleSmallBold" variant="body1">
            Permissions
          </Typography>
          {
            permissionsArray.map(({ key, isChecked, name }) => (
              <Box
                key={key}
                className={classes.permissionsMenuItemCheckbox}
                component="button"
                onClick={handleChangeCheckbox(key, !isChecked)}
              >
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
              onClick={handleSave}
            >
              SAVE
            </Button>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              onClick={handleClose}
            >
              CANCEL
            </Button>
          </Box>
        </Box>
      </MenuItem>
    </Menu>
  );
};

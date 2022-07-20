import React, {
  FC,
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
  onSave?: () => void;
  onClose?: () => void;
};

export const PermissionsMenu: FC<PermissionsMenuProps> = ({
  anchorEl, defaultPermissions, onSave, onClose,
}) => {
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
      onClose={onClose}
    >
      <MenuItem className={classes.permissionsMenuItemRoot}>
        <Box className={classes.permissionsMenuItemContent}>
          <Typography className="articleSmallBold" variant="body1">
            Permissions
          </Typography>
          {
            [{
              isChecked: defaultPermissions.viewUsers,
              name: 'View users database',
            },
            {
              isChecked: defaultPermissions.freezeUsers,
              name: 'Freeze users',
            },
            {
              isChecked: defaultPermissions.contactUsers,
              name: 'Contact users',
            },
            {
              isChecked: defaultPermissions.setPrice,
              name: 'Change prices',
            },
            {
              isChecked: defaultPermissions.changeNetworkMode,
              name: 'Disable Mainnet toggle',
            },
            {
              isChecked: defaultPermissions.setFeeReceiver,
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
              onClick={onSave}
            >
              SAVE
            </Button>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              onClick={onClose}
            >
              CANCEL
            </Button>
          </Box>
        </Box>
      </MenuItem>
    </Menu>
  );
};

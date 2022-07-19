import React, {
  FC, useMemo, useState, MouseEvent,
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
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clsx from 'clsx';
import { UserNameBox, Copyable, CheckBox } from 'components';

import { CrownIcon } from 'theme/icons';
import { setActiveModal } from 'store/modals/reducer';
import { Permissions } from 'types/store/user';
import { Modals, UserView } from 'types';
import { head } from '../AdminPanel.helpers';
import { useStyles, useRowStyles } from './CollapsibleList.styles';

type RowProps = {
  row: UserView;
  permissions: Permissions;
  onPermissionsOpen: (event: MouseEvent<HTMLButtonElement>) => void;
};

const contractsCreatedByUser = [
  '0x12321312345454356dsfds',
  '0x12323131321313131231',
];

const Row: FC<RowProps> = ({ permissions, row, onPermissionsOpen }) => {
  const [open, setOpen] = useState(false);
  const hasPermissions = useMemo(
    () => Object.values(row.permissions).some((item) => item),
    [row.permissions],
  );
  const dispatch = useDispatch();
  const handleSendEmail = () => {
    dispatch(
      setActiveModal({
        modals: {
          [Modals.AdminSendEmail]: true,
        },
      }),
    );
  };
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
                  onClick={() => {}}
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
                <Typography className={classes.rowText}>???????</Typography>
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
                    InputProps={{
                      className: classes.textField,
                    }}
                    select
                  >
                    {
                      contractsCreatedByUser.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))
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
                <Grid item xs={8} sm={6}>
                  <CheckBox
                    className={classes.textField}
                    name="Freeze user"
                    value={row.isFrozen}
                    label="Freeze user"
                    onClick={() => {}}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                    Contracts` addresses created by this user
                  </Typography>
                  <TextField
                    InputProps={{
                      className: classes.textField,
                    }}
                    select
                  >
                    {
                      contractsCreatedByUser.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))
                    }
                  </TextField>
                </Grid>
              </Hidden>
              {
                permissions.contactUsers && (
                  <Grid item xs={12} md={5}>
                    <Button variant="outlined" fullWidth onClick={handleSendEmail}>
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
  const [currentPermissions, setCurrentPermissions] = useState<null | UserView>(null);

  const handlePermissionsOpen = (currentUserData: UserView) => (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    setPermissionMenuEl(event.currentTarget);
    setCurrentPermissions(currentUserData);
  };
  const handlePermissionsClose = () => setPermissionMenuEl(null);

  const classes = useStyles();
  return (
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
              currentPermissions &&
              [{
                isChecked: currentPermissions.permissions.viewUsers,
                name: 'View users database',
              },
              {
                isChecked: currentPermissions.permissions.freezeUsers,
                name: 'Freeze users',
              },
              {
                isChecked: currentPermissions.permissions.contactUsers,
                name: 'Contact users',
              },
              {
                isChecked: currentPermissions.permissions.setPrice,
                name: 'Change prices',
              },
              {
                isChecked: currentPermissions.permissions.changeNetworkMode,
                name: 'Disable Mainnet toggle',
              },
              {
                isChecked: currentPermissions.permissions.setFeeReceiver,
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
  );
};

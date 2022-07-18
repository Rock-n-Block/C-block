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
import { Modals } from 'types';
import { createData, head, rows } from '../AdminPanel.helpers';
import { useStyles, useRowStyles } from './CollapsibleList.styles';

type RowData = ReturnType<typeof createData>;
type RowProps = {
  row: RowData;
  onPermissionsOpen: (event: MouseEvent<HTMLButtonElement>) => void;
};

const contractsCreatedByUser = [
  '0x12321312345454356dsfds',
  '0x12323131321313131231',
];

const Row: FC<RowProps> = ({ row, onPermissionsOpen }) => {
  const [open, setOpen] = useState(false);
  const hasPermissions = useMemo(() => Object.values(row.permissions).some((item) => item), [row.permissions]);
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
          name={row.person.name}
          imageUrl={row.person.avatarUrl}
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
                <Copyable className={classes.copyableIcon} valueToCopy={row.walletAddress} withIcon />
              ),
            }}
            disabled
            value={row.walletAddress}
          />
        </Grid>
      </Hidden>
      <Grid item xs={3} sm={2} md={4} className={classes.actionCol}>
        <Box>
          <Hidden only={['xs', 'sm']}>
            <CheckBox
              className={classes.textField}
              name="Freeze user"
              value={row.isFrozen}
              label="Freeze user"
              onClick={() => {}}
            />
          </Hidden>
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
                <Typography className={classes.rowText}>12.01.2022 / 12:22</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                  Tel
                </Typography>
                <Typography className={classes.rowText}>+9 (890) 998-21-21</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                  Company
                </Typography>
                <Typography className={classes.rowText}>Atlantic inc.Monucen</Typography>
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
                <Typography className={classes.rowText}>OAE, Dubai</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                  Address
                </Typography>
                <Typography className={classes.rowText}>Behind Bin Sougat Cent...</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography className={clsx(classes.rowText, classes.collapseContentTitle)}>
                  Zipcode
                </Typography>
                <Typography className={classes.rowText}>23049210</Typography>
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
              <Grid item xs={12} md={5}>
                <Button variant="outlined" fullWidth onClick={handleSendEmail}>
                  <Typography variant="button">
                    Send an e-mail to user
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export const CollapsibleList = () => {
  const [permissionsMenuEl, setPermissionMenuEl] = useState<null | HTMLElement>(null);
  const [currentPermissions, setCurrentPermissions] = useState<null | RowData>(null);

  const handlePermissionsOpen = (currentUserData: RowData) => (
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

      {rows.map((row) => (
        <Row key={row.email} row={row} onPermissionsOpen={handlePermissionsOpen(row)} />
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
                isChecked: currentPermissions.permissions.canViewUsers,
                name: 'View users database',
              },
              {
                isChecked: currentPermissions.permissions.canFreezeUsers,
                name: 'Freeze users',
              },
              {
                isChecked: currentPermissions.permissions.canContactUsers,
                name: 'Contact users',
              },
              {
                isChecked: false,
                name: 'Change prices',
              },
              {
                isChecked: false,
                name: 'Disable Mainnet toggle',
              },
              {
                isChecked: true,
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

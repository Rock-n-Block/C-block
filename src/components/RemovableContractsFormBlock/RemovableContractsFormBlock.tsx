import React, { FC, useMemo } from 'react';
import {
  Typography,
  Box,
  Grid,
} from '@material-ui/core';
import clsx from 'clsx';

import { TrashIcon } from 'theme/icons';
import { useStyles } from './RemovableContractsFormBlock.styles';

interface IRemovableContractsFormBlock {
  className?: string;
  isFirst: boolean;
  title?: string;
  subtitle?: string;
  deleteForm: () => void;
}

export const RemovableContractsFormBlock: FC<IRemovableContractsFormBlock> = ({
  className, children, title, subtitle, isFirst, deleteForm,
}) => {
  const hasTitleSection = !!(title || subtitle);
  const classes = useStyles({ hasTitleSection });

  const deleteFormIcon = useMemo(() => !isFirst && (
    <Box className={classes.deleteIcon} onClick={deleteForm}>
      <TrashIcon />
    </Box>
  ), [classes.deleteIcon, deleteForm, isFirst]);

  return (
    <Box className={clsx(classes.root, className)}>
      {hasTitleSection && (
        <Box className={classes.title}>
          <Box>
            {title && <Typography variant="h3">{title}</Typography>}
            {subtitle && (
              <Typography
                className={clsx('l', 'colorSecondary')}
                variant="body1"
              >{subtitle}
              </Typography>
            )}
          </Box>
          {deleteFormIcon}
        </Box>
      )}
      <Grid className={classes.grid} container>
        {children}
      </Grid>
      {!hasTitleSection && deleteFormIcon}
    </Box>
  );
};

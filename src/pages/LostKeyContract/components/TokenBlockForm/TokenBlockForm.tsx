import React, { FC } from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';
import { TrashIcon } from 'theme/icons';
import clsx from 'clsx';
import { useStyles } from './TokenBlockForm.styles';

type TokenBlockFormValues = {
  isFirst: boolean;
  deleteForm: () => void;
  className?: string;
};

export const TokenBlockForm: FC<TokenBlockFormValues> = ({
  isFirst, deleteForm, children, className,
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)}>
      <Grid className={classes.grid} container>
        {children}
      </Grid>
      <Box className={classes.deleteIcon} onClick={deleteForm}>
        {!isFirst && <TrashIcon />}
      </Box>
    </Box>
  );
};

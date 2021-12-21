import React, { FC } from 'react';
import {
  Typography,
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
      <Box className={classes.title}>
        <Box>
          <Typography variant="h3">Token supported for payment</Typography>
        </Box>
        {!isFirst && (
          <Box className={classes.deleteIcon} onClick={deleteForm}>
            <TrashIcon />
          </Box>
        )}
      </Box>
      <Grid container>
        {children}
      </Grid>
    </Box>
  );
};

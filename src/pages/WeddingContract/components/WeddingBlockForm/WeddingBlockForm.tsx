import React, { FC } from 'react';
import {
  Typography,
  Box,
  Grid,
} from '@material-ui/core';
import { TrashIcon } from 'theme/icons';
import clsx from 'clsx';
import { useStyles } from './WeddingBlockForm.styles';

type TokenBlockFormValues = {
  isFirst: boolean;
  deleteForm: () => void;
  className?: string;
};

export const WeddingBlockForm: FC<TokenBlockFormValues> = ({
  isFirst, deleteForm, children, className,
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)}>
      <Box className={classes.title}>
        <Box>
          <Typography variant="body1">Define address for tokens</Typography>
          <Typography variant="body1" className="s">(after minting it will be sent to this address)</Typography>
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

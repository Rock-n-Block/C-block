import React, { FC } from 'react';
import {
  Typography,
  Box,
  Switch,
} from '@material-ui/core';
import clsx from 'clsx';
import { Field, FormikHandlers } from 'formik';

import { useStyles } from './SwitchableBlockForm.styles';

interface ISwitchableBlockFormProps {
  className?: string;
  title: string;
  description?: string;
  checked: boolean;
  checkboxName: string;
  onChecked: FormikHandlers['handleChange'];
}

export const SwitchableBlockForm: FC<ISwitchableBlockFormProps> = ({
  className, title, description, checked, checkboxName, onChecked, children,
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)}>
      <Box className={classes.header}>
        <Typography className={classes.title} variant="h3">{title}</Typography>
        <Field
          id={checkboxName}
          name={checkboxName}
          render={() => (
            <Switch
              name={checkboxName}
              checked={checked}
              onClick={onChecked}
            />
          )}
        />
      </Box>
      { !!description && (
        <Typography
          className={classes.description}
          variant="body1"
          color="textSecondary"
        >
          {description}
        </Typography>
      )}
      {children}
    </Box>
  );
};

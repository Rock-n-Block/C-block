/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent, ReactElement, useState, VFC,
} from 'react';

import {
  Box, Button, IconButton, TextField,
} from '@material-ui/core';
import clsx from 'clsx';

import { Edit } from 'theme/icons';
import { useStyles } from './EditableField.styles';

export interface EditableFieldProps {
  className?: string;
  icon?: ReactElement;
  value: string|number
  disabled: boolean;
  onClick: (e: string | ChangeEvent<any>) => void;
}

export const EditableField: VFC<EditableFieldProps> = ({
  className, icon, value, disabled, onClick,
}) => {
  const classes = useStyles();
  const [fieldValue, setFieldValue] = useState(value);
  const handleChange = (event) => {
    setFieldValue(event.target.value);
  };

  return (
    <Box className={clsx(classes.root, className)}>
      <TextField
        value={fieldValue}
        disabled={disabled}
        className={classes.textField}
        InputProps={{
          endAdornment: icon,
        }}
        onChange={handleChange}
      />
      {disabled ? (
        <IconButton
          color="primary"
          className={classes.button}
          onClick={onClick}
        ><Edit />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          onClick={onClick}
        >Save
        </Button>
      )}
    </Box>
  );
};

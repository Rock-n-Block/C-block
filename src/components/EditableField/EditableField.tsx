import React, {
  ReactElement, VFC,
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
  value: string | number;
  disabled: boolean;
  onClick: (fieldValue: string | number, isDisabled: boolean) => void;
  onChange: (fieldValue: string | number) => void;
}

export const EditableField: VFC<EditableFieldProps> = ({
  className, icon, value, disabled, onClick, onChange,
}) => {
  const classes = useStyles();
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleEditOrSaveClick = () => {
    if (onClick) {
      onClick(value, disabled);
    }
  };

  return (
    <Box className={clsx(classes.root, className)}>
      <TextField
        value={value}
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
          onClick={handleEditOrSaveClick}
        >
          <Edit />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          onClick={handleEditOrSaveClick}
        >
          Save
        </Button>
      )}
    </Box>
  );
};

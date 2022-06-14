import React, {
  ReactElement, useState, VFC,
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
  defaultValue: string | number
  disabled: boolean;
  onClick: (fieldValue: string | number, isDisabled: boolean) => void;
}

export const EditableField: VFC<EditableFieldProps> = ({
  className, icon, defaultValue, disabled, onClick,
}) => {
  const classes = useStyles();
  const [fieldValue, setFieldValue] = useState(defaultValue);
  const handleChange = (event) => {
    setFieldValue(event.target.value);
  };

  const handleEditOrSaveClick = () => {
    if (onClick) {
      onClick(fieldValue, disabled);
    }
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

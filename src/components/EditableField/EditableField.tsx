import React, {
  ChangeEvent,
  ReactElement, VFC,
} from 'react';

import {
  Box, Button, IconButton, StandardTextFieldProps, TextField,
} from '@material-ui/core';
import clsx from 'clsx';

import { Edit } from 'theme/icons';
import { useStyles } from './EditableField.styles';

export interface EditableFieldProps extends Pick<StandardTextFieldProps, 'InputProps'> {
  className?: string;
  otherClasses?: Partial<{ textField?: string }>;
  icon?: ReactElement;
  value: string | number;
  disabled: boolean;
  onClick: (fieldValue: string | number, isDisabled: boolean) => void;
  onChange: (fieldValue: string | number) => void;
}

export const EditableField: VFC<EditableFieldProps> = ({
  className, value, disabled, InputProps, onClick, onChange, otherClasses,
}) => {
  const classes = useStyles();
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        className={clsx(classes.textField, otherClasses?.textField)}
        InputProps={InputProps}
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

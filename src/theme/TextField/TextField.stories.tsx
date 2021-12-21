import React, { useState, useCallback, ChangeEvent } from 'react';

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TextField,
  TextFieldProps,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { CloseIcon } from 'theme/icons';

export default {
  title: 'theme/TextField',
  component: TextField,
};

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 200,
  },
}));

const Control: React.FC<TextFieldProps> = ({ value: initialValue, ...props }) => {
  const [value, setValue] = useState<string>(() => `${initialValue ?? ''}`);
  const handleChange = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      setValue(event.target.value ?? event.currentTarget.value ?? '');
    },
    [],
  );
  return <TextField value={value} {...props} onChange={handleChange} />;
};

const Controls: React.FC<TextFieldProps> = (props) => {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell className={classes.root}>
        <Control
          value="Text filled"
          label="Label"
          helperText="Assistive text"
          variant="outlined"
          {...props}
        />
      </TableCell>
      <TableCell className={classes.root}>
        <Control
          value="Text filled"
          helperText="Assistive text"
          variant="outlined"
          {...props}
        />
      </TableCell>
      <TableCell className={classes.root}>
        <Control value="Text filled" label="Label" variant="outlined" {...props} />
      </TableCell>
      <TableCell className={classes.root}>
        <Control value="Text filled" variant="outlined" {...props} />
      </TableCell>
      <TableCell className={classes.root}>
        <Control
          placeholder="Placeholder"
          label="Label"
          helperText="Assistive text"
          variant="outlined"
          {...props}
        />
      </TableCell>
      <TableCell className={classes.root}>
        <Control
          placeholder="Placeholder"
          helperText="Assistive text"
          variant="outlined"
          {...props}
        />
      </TableCell>
      <TableCell className={classes.root}>
        <Control
          placeholder="Placeholder"
          label="Label"
          variant="outlined"
          {...props}
        />
      </TableCell>
      <TableCell className={classes.root}>
        <Control placeholder="Placeholder" variant="outlined" {...props} />
      </TableCell>
    </TableRow>
  );
};

export const Default: React.FC = () => (
  <>
    <Controls multiline placeholder="Please describe what kind of the development do you need (new blockchain creation, token contract, individual smart contract etc.)" />
    <Typography variant="h6">Text Fields & Selects</Typography>
    <Table>
      <TableBody>
        <Controls />
        <Controls error helperText="Error description" />
        <Controls disabled />
        <Controls InputProps={{ endAdornment: <CloseIcon /> }} />
        <Controls select fullWidth>
          <MenuItem value="text-filled">Text filled</MenuItem>
          <MenuItem value="text-filled2">Text filled2</MenuItem>
        </Controls>
        <Controls select fullWidth error helperText="Error description">
          <MenuItem value="text-filled">Text filled</MenuItem>
          <MenuItem value="text-filled2">Text filled2</MenuItem>
        </Controls>
        <Controls select fullWidth disabled>
          <MenuItem value="text-filled">Text filled</MenuItem>
          <MenuItem value="text-filled2">Text filled2</MenuItem>
        </Controls>
      </TableBody>
    </Table>
  </>
);

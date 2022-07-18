import React from 'react';

import {
  Box, Button, Divider, IconButton, Typography,
} from '@material-ui/core';
import { WeddingRingIcon } from '../icons';

export default {
  title: 'theme/Button',
};

export const Default: React.FC = () => (
  <Box>
    <Typography>Text</Typography>
    <Box>
      <Button variant="text" size="large">BUTTON Xl</Button>
      <Button variant="text">BUTTON l</Button>
      <Button variant="text" size="small">BUTTON s</Button>
    </Box>

    <Divider />

    <Typography>Text link</Typography>
    <Box>
      <Button variant="text" size="large" href="https://google.com">BUTTON Xl</Button>
      <Button variant="text" href="https://google.com">BUTTON l</Button>
      <Button variant="text" size="small" href="https://google.com">BUTTON s</Button>
    </Box>

    <Divider />

    <Typography>Base</Typography>
    <Box>
      <Typography>outlined</Typography>
      <Button variant="outlined" size="large">BUTTON L</Button>
      <Button variant="outlined">BUTTON m</Button>
      <Button variant="outlined" size="small">BUTTON s</Button>
    </Box>
    <Box>
      <Typography>contained</Typography>
      <Button variant="contained" size="large">BUTTON Xl</Button>
      <Button variant="contained">BUTTON l</Button>
      <Button variant="contained" size="small">BUTTON s</Button>
      <Button className="border-radius-s" variant="contained" size="small">BUTTON s with border-radius-s</Button>
    </Box>

    <Divider />

    <Typography>Disabled</Typography>
    <Box>
      <Typography>outlined</Typography>
      <Button variant="outlined" size="large" disabled>BUTTON Xl</Button>
      <Button variant="outlined" disabled>BUTTON l</Button>
      <Button variant="outlined" size="small" disabled>BUTTON s</Button>
    </Box>
    <Box>
      <Typography>contained</Typography>
      <Button variant="contained" size="large" disabled>BUTTON Xl</Button>
      <Button variant="contained" disabled>BUTTON l</Button>
      <Button variant="contained" size="small" disabled>BUTTON s</Button>
    </Box>

    <Divider />

    <Typography>Icon left</Typography>
    <Box>
      <Typography>outlined</Typography>
      <Button variant="outlined" size="large" startIcon={<WeddingRingIcon />}>BUTTON Xl</Button>
      <Button variant="outlined" startIcon={<WeddingRingIcon />}>BUTTON l</Button>
      <Button variant="outlined" size="small" startIcon={<WeddingRingIcon />}>BUTTON s</Button>
    </Box>
    <Box>
      <Typography>contained</Typography>
      <Button variant="contained" size="large" startIcon={<WeddingRingIcon />}>BUTTON Xl</Button>
      <Button variant="contained" startIcon={<WeddingRingIcon />}>BUTTON l</Button>
      <Button variant="contained" size="small" startIcon={<WeddingRingIcon />}>BUTTON s</Button>
    </Box>

    <Divider />

    <Typography>Icon right</Typography>
    <Box>
      <Typography>outlined</Typography>
      <Button variant="outlined" size="large" endIcon={<WeddingRingIcon />}>BUTTON Xl</Button>
      <Button variant="outlined" endIcon={<WeddingRingIcon />}>BUTTON l</Button>
      <Button variant="outlined" size="small" endIcon={<WeddingRingIcon />}>BUTTON s</Button>
    </Box>
    <Box>
      <Typography>contained</Typography>
      <Button variant="contained" size="large" endIcon={<WeddingRingIcon />}>BUTTON Xl</Button>
      <Button variant="contained" endIcon={<WeddingRingIcon />}>BUTTON l</Button>
      <Button variant="contained" size="small" endIcon={<WeddingRingIcon />}>BUTTON s</Button>
    </Box>

    <Divider />

    <Typography>Icon buttons | Primary</Typography>
    <Box>
      <IconButton color="primary"><WeddingRingIcon /></IconButton>
      <IconButton color="primary"><WeddingRingIcon /></IconButton>
      <IconButton color="primary"><WeddingRingIcon /></IconButton>
    </Box>

    <Typography>Icon buttons | Secondary</Typography>
    <Box>
      <IconButton color="secondary"><WeddingRingIcon /></IconButton>
      <IconButton color="secondary"><WeddingRingIcon /></IconButton>
      <IconButton color="secondary"><WeddingRingIcon /></IconButton>
    </Box>
  </Box>
);

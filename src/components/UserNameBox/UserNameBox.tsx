import React, { VFC } from 'react';
import { Box, Typography } from '@material-ui/core';

import { UserNoImageImg } from 'assets';
import { CrownIcon } from 'theme/icons';

type UserNameBoxProps = {
  name: string; address?: string; imageUrl: string; hasDefaultRole: boolean
};

export const UserNameBox: VFC<UserNameBoxProps> = ({
  name, address = '', imageUrl, hasDefaultRole,
}) => (
  <Box style={{
    display: 'flex',
    alignItems: 'center',
  }}
  >
    {
        !hasDefaultRole && <CrownIcon />
      }
    <Box style={{
      width: 40,
      minWidth: 40,
      height: 40,
      minHeight: 40,
      margin: '0 8px 0 4px',
    }}
    >
      <img
        style={{
          width: 40,
          minWidth: 40,
          height: 40,
          minHeight: 40,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
        src={imageUrl || UserNoImageImg}
        alt="user profile"
      />
    </Box>
    <Typography className="l" variant="body1">{ name || `User ${address.slice(-4)}`}</Typography>
  </Box>
);

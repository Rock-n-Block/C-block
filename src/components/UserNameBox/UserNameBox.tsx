import React, { useCallback, VFC } from 'react';
import { Box, Typography } from '@material-ui/core';

import { UserNoImageImg } from 'assets';
import { CrownIcon } from 'theme/icons';

export const UserNameBox: VFC<{ name: string; imageUrl: string; hasDefaultRole: boolean }> = ({ name, imageUrl, hasDefaultRole }) => {
  const getMockUsername = useCallback(() => `User ${Math.ceil(Math.random() * 1000000)}`, []);

  return (
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
      <Typography className="l" variant="body1">{ name || getMockUsername()}</Typography>
    </Box>
  );
};

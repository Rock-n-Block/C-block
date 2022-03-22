import React, {
  FC,
} from 'react';
import {
  Container,
  Grid,
  Box,
} from '@material-ui/core';

import { htmlContent } from './Privacy.helpers';
import { useStyles } from './Privacy.styles';

export const Privacy: FC = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Box
            className={classes.root}
            dangerouslySetInnerHTML={{
              __html: htmlContent,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

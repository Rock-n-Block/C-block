import React, { FC } from 'react';
import { Loader } from 'components';

import { useStyles } from './FullscreenLoader.styles';

export const FullscreenLoader: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Loader />
    </div>
  );
};

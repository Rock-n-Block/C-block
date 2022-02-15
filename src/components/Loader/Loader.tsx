import React, { FC } from 'react';
import { LoaderIcon } from 'theme/icons';
import clsx from 'clsx';

import { useStyles } from './Loader.styles';

interface Props {
  className?: string;
  width?: string;
}

export const Loader: FC<Props> = ({ className, width = '100px' }) => {
  const classes = useStyles({ width });
  return (
    <div className={clsx(classes.root, className)}>
      <LoaderIcon className={classes.icon} />
    </div>
  );
};

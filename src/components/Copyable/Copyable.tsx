import React, { FC } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import clsx from 'clsx';
import { CopyIcon } from 'theme/icons';
import { Box } from '@material-ui/core';
import { setNotification } from 'utils';
import { useStyles } from './Copyable.styles';

export type CopyableProps = {
  valueToCopy: string,
  onCopy?: () => void,
  withIcon?: boolean,
  className?: string,
  classNameIcon?: string,
  withBorder?: boolean,
  onlyIconActive?: boolean,
};

export const Copyable: FC<CopyableProps> = ({
  valueToCopy,
  onCopy = () => {},
  children,
  withIcon,
  className,
  classNameIcon,
  withBorder,
  onlyIconActive = false,
}) => {
  const classes = useStyles({ withBorder });
  if (onlyIconActive) {
    return (
      <div className={clsx(
        classes.copyableContainer,
        className,
      )}
      >
        {children}
        <CopyToClipboard
          text={valueToCopy}
          onCopy={() => {
            onCopy();
            setNotification({
              type: 'success',
              message: 'Value copied',
            });
          }}
          className={clsx(classes.icon)}
        >
          <Box>
            <CopyIcon />
          </Box>
        </CopyToClipboard>
      </div>
    );
  }
  return (
    <CopyToClipboard
      text={valueToCopy}
      onCopy={() => {
        onCopy();
        setNotification({
          type: 'success',
          message: 'Value copied',
        });
      }}
    >
      <Box className={clsx(
        withIcon && classes.withIcon,
        className,
      )}
      >
        {children}
        {withIcon && <Box className={clsx(classes.icon, classNameIcon)}><CopyIcon /></Box>}
      </Box>
    </CopyToClipboard>
  );
};

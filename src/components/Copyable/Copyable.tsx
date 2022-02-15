import React, {
  FC, useCallback, MouseEventHandler, ComponentProps,
} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Box } from '@material-ui/core';
import clsx from 'clsx';

import { setNotification } from 'utils';
import { CopyIcon } from 'theme/icons';
import { useStyles } from './Copyable.styles';

export type CopyableProps = {
  className?: string,
  valueToCopy: string,
  onCopy?: ComponentProps<typeof CopyToClipboard>['onCopy'],
  withIcon?: boolean,
  classNameIcon?: string,
  withBorder?: boolean,
  onlyIconActive?: boolean,
  stopPropagation?: boolean,
  defaultNotification?: boolean,
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
  stopPropagation = true,
  defaultNotification = true,
}) => {
  const classes = useStyles({ withBorder });

  const CopyToClipboardContainer = useCallback<FC>((props) => (
    <CopyToClipboard
      text={valueToCopy}
      onCopy={(...args) => {
        onCopy(...args);
        if (defaultNotification) {
          setNotification({
            type: 'success',
            message: 'Value copied',
          });
        }
      }}
    >
      {props.children}
    </CopyToClipboard>
  ), [defaultNotification, onCopy, valueToCopy]);

  const handleCopyToClipboardChildrenClick = useCallback<MouseEventHandler<HTMLElement>>((e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
  }, [stopPropagation]);

  if (onlyIconActive) {
    return (
      <div className={clsx(
        classes.copyableContainer,
        className,
      )}
      >
        {children}
        <CopyToClipboardContainer>
          <Box className={clsx(classes.icon)} onClick={handleCopyToClipboardChildrenClick}>
            <CopyIcon />
          </Box>
        </CopyToClipboardContainer>
      </div>
    );
  }
  return (
    <CopyToClipboardContainer>
      <Box
        className={clsx(
          withIcon && classes.withIcon,
          className,
        )}
        onClick={handleCopyToClipboardChildrenClick}
      >
        {children}
        {withIcon && <Box className={clsx(classes.icon, classNameIcon)}><CopyIcon /></Box>}
      </Box>
    </CopyToClipboardContainer>
  );
};

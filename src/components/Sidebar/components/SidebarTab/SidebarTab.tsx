import React, { RefAttributes, useMemo, VFC } from 'react';

import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { BaseSVGIconProps } from 'theme/icons/components/BaseSVGIcon';
import { Link, LinkProps } from 'react-router-dom';
import { useStyles } from './SidebarTab.styles';

export interface SidebarTabProps extends LinkProps, RefAttributes<HTMLAnchorElement> {
  className?: string;
  isSelected?: boolean;
  Icon: React.FC<Partial<Pick<BaseSVGIconProps, 'color' | 'htmlColor'>>>;
  label: string;
  isExternal?: boolean;
}

export const SidebarTab: VFC<SidebarTabProps> = ({
  className, isSelected, isExternal = false, Icon, label, to, ...props
}) => {
  const classes = useStyles({ isSelected });

  const stringLink = useMemo(() => (typeof to === 'string' ? to : undefined), [to]);
  const commonProps = useMemo(() => ({
    className: clsx(classes.tab, className),
    hrefLang: stringLink,
    ...props,
  }), [className, classes.tab, props, stringLink]);

  const children = useMemo(() => (
    <>
      <Box className={classes.iconWrapper}>
        <Icon />
      </Box>
      <Typography variant="body1" className={classes.tabLabel}>{label}</Typography>
    </>
  ), [Icon, classes.iconWrapper, classes.tabLabel, label]);

  if (isExternal) {
    return (
      <a
        href={stringLink}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >{children}
      </a>
    );
  }

  return <Link to={to} {...commonProps}>{children}</Link>;
};

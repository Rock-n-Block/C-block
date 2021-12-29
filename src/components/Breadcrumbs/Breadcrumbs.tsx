import React, { VFC } from 'react';
import {
  NavLink,
} from 'react-router-dom';

import clsx from 'clsx';
import { Box } from '@material-ui/core';
import { useStyles } from './Breadcrumbs.styles';

export type BreadcrumbsPaths = {
  path: string,
  label: string,
};
export type BreadcrumbsProps = {
  paths: BreadcrumbsPaths[],
  className?: string,
};

export const Breadcrumbs: VFC<BreadcrumbsProps> = ({ className, paths }) => {
  const classes = useStyles();
  return (
    <nav
      className={clsx(className)}
    >
      <ul className={classes.breadcrumbsContainer}>
        {paths.map(({ label, path }, index) => (
          <li key={path} className={classes.breadcrumb}>
            <NavLink
              className={index === paths.length - 1 ?
                classes.breadcrumbLabel :
                classes.breadcrumbLabelFirst}
              to={path}
            >
              {label}
            </NavLink>
            {index < paths.length - 1 && <Box className={classes.breadcrumbBreaker} />}
          </li>
        ))}
      </ul>
    </nav>
  );
};

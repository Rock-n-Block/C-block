import React from 'react';
import {
  ErrorIcon, InfoIcon, SuccessContainedIcon, WarningIcon,
} from 'theme/icons';

export const toastifyHelper = {
  success: <SuccessContainedIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
  error: <ErrorIcon />,
};

import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const LoaderIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon
    width="41"
    height="41"
    fill="none"
    viewBox="0 0 41 41"
    {...props}
  >
    <path
      opacity="0.2"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.5 37C29.6127 37 37 29.6127 37 20.5C37 11.3873 29.6127 4 20.5 4C11.3873 4 4 11.3873 4 20.5C4 29.6127 11.3873 37 20.5 37Z"
      stroke="#A0A0A0"
      strokeWidth="2.22689"
    />
    <path
      d="M8.88281 32.2172C11.8647 35.1738 15.969 37 20.4999 37V37C29.6126 37 36.9999 29.6127 36.9999 20.5C36.9999 11.3873 29.6126 4 20.4999 4"
      stroke="#70FF00"
      strokeWidth="2.22689"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseSVGIcon>
);

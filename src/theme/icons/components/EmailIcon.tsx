import React from 'react';

import { COLOR_BLACK_4 } from 'theme/colors';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

const size = '24';

export const EmailIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill={COLOR_BLACK_4}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 18H5C4.449 18 4 17.552 4 17V7.25L11.4 12.8C11.578 12.934 11.789 13 12 13C12.211 13 12.422 12.934 12.6 12.8L20 7.25V17C20 17.552 19.551 18 19 18ZM18.333 6L12 10.75L5.667 6H18.333ZM19 4H5C3.346 4 2 5.346 2 7V17C2 18.654 3.346 20 5 20H19C20.654 20 22 18.654 22 17V7C22 5.346 20.654 4 19 4Z"
    />
    <mask
      id="mask0_114_1031"
      maskUnits="userSpaceOnUse"
      x="2"
      y="4"
      width="20"
      height="16"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 18H5C4.449 18 4 17.552 4 17V7.25L11.4 12.8C11.578 12.934 11.789 13 12 13C12.211 13 12.422 12.934 12.6 12.8L20 7.25V17C20 17.552 19.551 18 19 18ZM18.333 6L12 10.75L5.667 6H18.333ZM19 4H5C3.346 4 2 5.346 2 7V17C2 18.654 3.346 20 5 20H19C20.654 20 22 18.654 22 17V7C22 5.346 20.654 4 19 4Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_114_1031)" />
  </BaseSVGIcon>
);

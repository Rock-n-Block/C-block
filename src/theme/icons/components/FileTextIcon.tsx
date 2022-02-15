import React from 'react';

import { COLOR_BLACK_4 } from 'theme/colors';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

const size = '24';

export const FileTextIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon
    width={size}
    height={size}
    fill={COLOR_BLACK_4}
    viewBox={`0 0 ${size} ${size}`}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9999 14H8.99994C8.44794 14 7.99994 13.552 7.99994 13C7.99994 12.448 8.44794 12 8.99994 12H11.9999C12.5519 12 12.9999 12.448 12.9999 13C12.9999 13.552 12.5519 14 11.9999 14ZM7.99994 17C7.99994 16.448 8.44794 16 8.99994 16H14.9999C15.5529 16 15.9999 16.448 15.9999 17C15.9999 17.552 15.5529 18 14.9999 18H8.99994C8.44794 18 7.99994 17.552 7.99994 17ZM17.4442 20H6.55524C6.24924 20 6.00024 19.776 6.00024 19.5V4.5C6.00024 4.224 6.24924 4 6.55524 4H12.0002V7.15C12.0002 8.722 13.2172 10 14.7142 10H18.0002V19.5C18.0002 19.776 17.7512 20 17.4442 20ZM14.0002 4.978L16.7422 8H14.7142C14.3202 8 14.0002 7.619 14.0002 7.15V4.978ZM19.7402 8.328L14.2962 2.328C14.1062 2.119 13.8382 2 13.5552 2H6.55524C5.14624 2 4.00024 3.122 4.00024 4.5V19.5C4.00024 20.878 5.14624 22 6.55524 22H17.4442C18.8532 22 20.0002 20.878 20.0002 19.5V9C20.0002 8.751 19.9072 8.512 19.7402 8.328Z"
    />
    <mask
      id="mask0_87_334"
      maskUnits="userSpaceOnUse"
      x="4"
      y="2"
      width="17"
      height="20"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 14H8.99994C8.44794 14 7.99994 13.552 7.99994 13C7.99994 12.448 8.44794 12 8.99994 12H11.9999C12.5519 12 12.9999 12.448 12.9999 13C12.9999 13.552 12.5519 14 11.9999 14ZM7.99994 17C7.99994 16.448 8.44794 16 8.99994 16H14.9999C15.5529 16 15.9999 16.448 15.9999 17C15.9999 17.552 15.5529 18 14.9999 18H8.99994C8.44794 18 7.99994 17.552 7.99994 17ZM17.4442 20H6.55524C6.24924 20 6.00024 19.776 6.00024 19.5V4.5C6.00024 4.224 6.24924 4 6.55524 4H12.0002V7.15C12.0002 8.722 13.2172 10 14.7142 10H18.0002V19.5C18.0002 19.776 17.7512 20 17.4442 20ZM14.0002 4.978L16.7422 8H14.7142C14.3202 8 14.0002 7.619 14.0002 7.15V4.978ZM19.7402 8.328L14.2962 2.328C14.1062 2.119 13.8382 2 13.5552 2H6.55524C5.14624 2 4.00024 3.122 4.00024 4.5V19.5C4.00024 20.878 5.14624 22 6.55524 22H17.4442C18.8532 22 20.0002 20.878 20.0002 19.5V9C20.0002 8.751 19.9072 8.512 19.7402 8.328Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_87_334)" />
  </BaseSVGIcon>
);

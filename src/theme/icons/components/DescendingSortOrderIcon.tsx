import React from 'react';
import { COLOR_BLACK_4 } from 'theme/colors';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

const size = '24';

export const DescendingSortOrderIcon: React.FC<IconProps> = (props) => (
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
      d="M19.3052 15.3839L18.0002 16.6439V7.41393V5.00007C18.0002 4.44775 17.5525 4 17.0001 4C16.4478 4 16 4.44778 16.0001 5.00012L16.0002 7.35693V16.5859L14.7072 15.2929C14.3162 14.9029 13.6832 14.9029 13.2932 15.2929C12.9022 15.6839 12.9022 16.3169 13.2932 16.7069L16.2932 19.7069C16.4882 19.9029 16.7442 19.9999 17.0002 19.9999C17.2502 19.9999 17.5002 19.9059 17.6952 19.7199L20.6952 16.8229C21.0922 16.4399 21.1032 15.8069 20.7192 15.4089C20.3362 15.0119 19.7032 15.0009 19.3052 15.3839ZM2 4.00013H9C9.55 4.00013 10 4.45013 10 5.00013C10 5.55013 9.55 6.00013 9 6.00013H2C1.45 6.00013 1 5.55013 1 5.00013C1 4.45013 1.45 4.00013 2 4.00013ZM5 11.0001H9C9.55 11.0001 10 11.4501 10 12.0001C10 12.5501 9.55 13.0001 9 13.0001H5C4.45 13.0001 4 12.5501 4 12.0001C4 11.4501 4.45 11.0001 5 11.0001ZM9 18.0001H7C6.45 18.0001 6 18.4501 6 19.0001C6 19.5501 6.45 20.0001 7 20.0001H9C9.55 20.0001 10 19.5501 10 19.0001C10 18.4501 9.55 18.0001 9 18.0001Z"
    />
    <mask
      id="mask0_270_1724"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="2"
      y="4"
      width="9"
      height="16"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 4H3C2.45 4 2 4.45 2 5C2 5.55 2.45 6 3 6H10C10.55 6 11 5.55 11 5C11 4.45 10.55 4 10 4ZM10 11H6C5.45 11 5 11.45 5 12C5 12.55 5.45 13 6 13H10C10.55 13 11 12.55 11 12C11 11.45 10.55 11 10 11ZM8 18H10C10.55 18 11 18.45 11 19C11 19.55 10.55 20 10 20H8C7.45 20 7 19.55 7 19C7 18.45 7.45 18 8 18Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_270_1724)" />
  </BaseSVGIcon>
);

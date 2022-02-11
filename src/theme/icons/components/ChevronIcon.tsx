import React from 'react';

import { COLOR_BLACK_4 } from 'theme/colors';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

const size = '29';

export const ChevronIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    {...props}
  >
    <g id="27) Icon/chevron-left">
      <path
        id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3623 17C13.1003 17 12.8393 16.898 12.6433 16.695L8.78028 12.695C8.40228 12.302 8.40728 11.679 8.79328 11.293L12.7933 7.29301C13.1833 6.90201 13.8163 6.90201 14.2073 7.29301C14.5973 7.68401 14.5973 8.31601 14.2073 8.70701L10.9023 12.012L14.0813 15.305C14.4653 15.703 14.4543 16.336 14.0573 16.719C13.8623 16.907 13.6123 17 13.3623 17Z"
        fill={COLOR_BLACK_4}
      />
      <mask
        id="mask0_130_2440"
        maskUnits="userSpaceOnUse"
        x="8"
        y="6"
        width="7"
        height="11"
      >
        <path
          id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor_2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.3623 17C13.1003 17 12.8393 16.898 12.6433 16.695L8.78028 12.695C8.40228 12.302 8.40728 11.679 8.79328 11.293L12.7933 7.29301C13.1833 6.90201 13.8163 6.90201 14.2073 7.29301C14.5973 7.68401 14.5973 8.31601 14.2073 8.70701L10.9023 12.012L14.0813 15.305C14.4653 15.703 14.4543 16.336 14.0573 16.719C13.8623 16.907 13.6123 17 13.3623 17Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_130_2440)" />
    </g>
  </BaseSVGIcon>
);

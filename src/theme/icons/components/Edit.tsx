import React from 'react';

import { COLOR_BLACK_4 } from 'theme/colors';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

const size = '24';

export const Edit: React.FC<IconProps> = (props) => (
  <BaseSVGIcon
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill={COLOR_BLACK_4}
    {...props}
  >
    <g id="27) Icon/edit-fill">
      <path
        id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0186 10.6787L13.3236 7.98367L15.2716 6.03467L17.9656 8.72867L16.0186 10.6787ZM19.4036 7.33767L19.4026 7.33667L16.6646 4.59867C15.9236 3.85967 14.6506 3.82467 13.9486 4.52967L4.95259 13.5257C4.62659 13.8507 4.42459 14.2827 4.38259 14.7397L4.00359 18.9097C3.97759 19.2047 4.08259 19.4967 4.29259 19.7067C4.48159 19.8957 4.73659 19.9997 4.99959 19.9997C5.03059 19.9997 5.06059 19.9987 5.09059 19.9957L9.26059 19.6167C9.71859 19.5747 10.1496 19.3737 10.4746 19.0487L19.4716 10.0517C20.1996 9.32167 20.1686 8.10367 19.4036 7.33767Z"
      />
      <mask
        id="mask0_130_2565"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="3"
        y="4"
        width="17"
        height="16"
      >
        <path
          id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor_2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.0186 10.6787L13.3236 7.98367L15.2716 6.03467L17.9656 8.72867L16.0186 10.6787ZM19.4036 7.33767L19.4026 7.33667L16.6646 4.59867C15.9236 3.85967 14.6506 3.82467 13.9486 4.52967L4.95259 13.5257C4.62659 13.8507 4.42459 14.2827 4.38259 14.7397L4.00359 18.9097C3.97759 19.2047 4.08259 19.4967 4.29259 19.7067C4.48159 19.8957 4.73659 19.9997 4.99959 19.9997C5.03059 19.9997 5.06059 19.9987 5.09059 19.9957L9.26059 19.6167C9.71859 19.5747 10.1496 19.3737 10.4746 19.0487L19.4716 10.0517C20.1996 9.32167 20.1686 8.10367 19.4036 7.33767Z"
        />
      </mask>
      <g mask="url(#mask0_130_2565)" />
    </g>
  </BaseSVGIcon>
);

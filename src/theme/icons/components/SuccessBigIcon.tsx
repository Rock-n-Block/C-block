import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const SuccessBigIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="184" height="186" viewBox="0 0 184 186" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#filter0_d_730_29691)">
      <path fillRule="evenodd" clipRule="evenodd" d="M92.0026 14.3335C52.4211 14.3335 20.3359 46.4187 20.3359 86.0002C20.3359 125.574 52.4211 157.667 92.0026 157.667C131.584 157.667 163.669 125.574 163.669 86.0002C163.669 46.4187 131.584 14.3335 92.0026 14.3335Z" fill="#70FF00" />
      <g mask="url(#mask0_730_29691)">
        <path fillRule="evenodd" clipRule="evenodd" d="M126.368 68.8391L93.6303 111.839C92.283 113.609 90.1975 114.656 87.9758 114.67H87.9256C85.7255 114.67 83.6471 113.652 82.2855 111.918L64.8561 89.6511C62.4195 86.5407 62.9641 82.0329 66.0816 79.5962C69.192 77.1524 73.707 77.6971 76.1436 80.8217L87.8468 95.7714L114.965 60.1602C117.359 57.0141 121.853 56.3977 125.013 58.7986C128.159 61.1994 128.768 65.6929 126.368 68.8391Z" fill="#254B07" />
      </g>
    </g>
    <defs>
      <filter id="filter0_d_730_29691" x="-14" y="-12" width="212" height="212" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="8" />
        <feGaussianBlur stdDeviation="10" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.439216 0 0 0 0 1 0 0 0 0 0 0 0 0 0.17 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_730_29691" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_730_29691" result="shape" />
      </filter>
    </defs>
  </BaseSVGIcon>
);

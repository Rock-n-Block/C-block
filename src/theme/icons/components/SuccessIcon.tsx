import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

const size = '16';

export const SuccessIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    {...props}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071L0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289C0.683417 5.90237 1.31658 5.90237 1.70711 6.29289L5 9.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893Z" fill="#70FF00" />

  </BaseSVGIcon>
);

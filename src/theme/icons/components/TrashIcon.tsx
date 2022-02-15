import React from 'react';

import { COLOR_BLACK_4 } from 'theme/colors';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const TrashIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="24" height="22" fill={COLOR_BLACK_4} viewBox="0 0 24 22" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.33341 3.60632C8.33341 3.47715 8.51175 3.33299 8.75008 3.33299H11.2501C11.4884 3.33299 11.6667 3.47715 11.6667 3.60632V4.99965H8.33341V3.60632ZM17.5001 4.99965H16.6667H13.3334V3.60632C13.3334 2.53632 12.3992 1.66632 11.2501 1.66632H8.75008C7.60091 1.66632 6.66675 2.53632 6.66675 3.60632V4.99965H3.33341H2.50008C2.04175 4.99965 1.66675 5.37549 1.66675 5.83299C1.66675 6.29132 2.04175 6.66632 2.50008 6.66632H3.33341V15.833C3.33341 17.2122 4.45508 18.333 5.83342 18.333H14.1667C15.5451 18.333 16.6667 17.2122 16.6667 15.833V6.66632H17.5001C17.9584 6.66632 18.3334 6.29132 18.3334 5.83299C18.3334 5.37549 17.9584 4.99965 17.5001 4.99965Z" />
    <mask id="mask0_130_1687" maskUnits="userSpaceOnUse" x="1" y="1" width="18" height="18">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.33341 3.60632C8.33341 3.47715 8.51175 3.33299 8.75008 3.33299H11.2501C11.4884 3.33299 11.6667 3.47715 11.6667 3.60632V4.99965H8.33341V3.60632ZM17.5001 4.99965H16.6667H13.3334V3.60632C13.3334 2.53632 12.3992 1.66632 11.2501 1.66632H8.75008C7.60091 1.66632 6.66675 2.53632 6.66675 3.60632V4.99965H3.33341H2.50008C2.04175 4.99965 1.66675 5.37549 1.66675 5.83299C1.66675 6.29132 2.04175 6.66632 2.50008 6.66632H3.33341V15.833C3.33341 17.2122 4.45508 18.333 5.83342 18.333H14.1667C15.5451 18.333 16.6667 17.2122 16.6667 15.833V6.66632H17.5001C17.9584 6.66632 18.3334 6.29132 18.3334 5.83299C18.3334 5.37549 17.9584 4.99965 17.5001 4.99965Z" fill="white" />
    </mask>
    <g mask="url(#mask0_130_1687)" />
  </BaseSVGIcon>
);

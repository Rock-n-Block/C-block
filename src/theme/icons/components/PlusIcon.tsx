import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const PlusIcon: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
    <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor" fillRule="evenodd" clipRule="evenodd" d="M19 11H13V5C13 4.447 12.552 4 12 4C11.448 4 11 4.447 11 5V11H5C4.448 11 4 11.447 4 12C4 12.553 4.448 13 5 13H11V19C11 19.553 11.448 20 12 20C12.552 20 13 19.553 13 19V13H19C19.552 13 20 12.553 20 12C20 11.447 19.552 11 19 11Z" fill="#64656A" />
    <mask id="mask0_123_1448" maskUnits="userSpaceOnUse" x="4" y="4" width="16" height="16">
      <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor_2" fillRule="evenodd" clipRule="evenodd" d="M19 11H13V5C13 4.447 12.552 4 12 4C11.448 4 11 4.447 11 5V11H5C4.448 11 4 11.447 4 12C4 12.553 4.448 13 5 13H11V19C11 19.553 11.448 20 12 20C12.552 20 13 19.553 13 19V13H19C19.552 13 20 12.553 20 12C20 11.447 19.552 11 19 11Z" fill="white" />
    </mask>
    <g mask="url(#mask0_123_1448)" />
  </BaseSVGIcon>
);

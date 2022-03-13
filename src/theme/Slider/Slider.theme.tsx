import React from 'react';
import { Theme, Tooltip } from '@material-ui/core';
import { Overrides } from '@material-ui/core/styles/overrides';
import { ComponentsProps } from '@material-ui/core/styles/props';
import {
  COLOR_ACID_GREEN, COLOR_AKZ, COLOR_BLACK_3, COLOR_GREY_2,
} from '../colors';

export const getMuiSlider = (theme: Theme): Overrides['MuiSlider'] => ({
  root: {
    color: COLOR_ACID_GREEN,
    height: 8,
  },
  thumb: {
    height: 40,
    width: 40,
    top: 3,
    background: COLOR_AKZ,
    border: `3px solid ${theme.palette.type === 'dark' ? COLOR_BLACK_3 : COLOR_GREY_2}`,
    transform: 'translate(-50%)',
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 16px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
});

export const getMuiSliderDefaultProps = (): ComponentsProps['MuiSlider'] => ({
  ValueLabelComponent: ({ children, open, value }) => (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>{children}</Tooltip>
  ),
  valueLabelDisplay: 'auto',
  'aria-label': 'pretto slider',
  step: 1,
});

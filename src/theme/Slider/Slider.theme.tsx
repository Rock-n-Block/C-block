import { Overrides } from '@material-ui/core/styles/overrides';
import { ComponentsProps } from '@material-ui/core/styles/props';
import { COLOR_ACID_GREEN, COLOR_ACID_GREEN_GRADIENT } from '../colors';

export const getMuiSlider = (): Overrides['MuiSlider'] => ({
  root: {
    color: COLOR_ACID_GREEN,
    height: 8,
  },
  thumb: {
    height: 40,
    width: 40,
    top: 3,
    background: COLOR_ACID_GREEN_GRADIENT,
    border: '3px solid #25272E',
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

export const getMuiSliderDefaultProps = (): ComponentsProps['MuiSlider'] => ({ });

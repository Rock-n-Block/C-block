import { Slider, SliderProps } from '@material-ui/core';
import React, { FC } from 'react';

import { useStyles } from './SliderWithMaxSectionValue.style';

type ISliderWithMaxSectionValue = {
  maxSectionValue: number;
  onChange?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
} & Omit<SliderProps, 'onChange'>;

export const SliderWithMaxSectionValue: FC<ISliderWithMaxSectionValue> = ({
  maxSectionValue,
  ...sliderProps
}) => {
  const { min, max } = sliderProps;
  const minMaxDiff = max - min;
  const disabledSectionWidth = ((max - maxSectionValue) / minMaxDiff) * 100;
  const disabledSectionLeftMargin = (maxSectionValue / minMaxDiff) * 100;
  const classes = useStyles({
    railLeftMargin: disabledSectionLeftMargin,
    railWidth: disabledSectionWidth,
  });
  return (
    <Slider
      {...sliderProps}
      classes={{
        rail: classes.rail,
      }}
    />
  );
};

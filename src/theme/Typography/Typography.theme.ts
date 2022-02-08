import { TypographyOptions } from '@material-ui/core/styles/createTypography';

import {
  COLOR_ACID_GREEN, COLOR_AKZ, COLOR_BLACK, COLOR_BLACK_4,
} from 'theme/colors';

// eslint-disable-next-line no-shadow
export enum FontWeights {
  fontWeightRegular = 400,
  fontWeightMedium = 500,
  fontWeightBold = 600,
}

export const getTypographyOptions = ({ color = COLOR_BLACK }): TypographyOptions => {
  const boldStyles = {
    '& strong': {
      fontWeight: FontWeights.fontWeightMedium,
    },
  };

  return {
    fontFamily: 'Arial',
    // fontWeightRegular: FontWeights.fontWeightRegular,
    // fontWeightMedium: FontWeights.fontWeightMedium,
    // fontWeightBold: FontWeights.fontWeightBold,

    allVariants: {
      color,
      fontWeight: FontWeights.fontWeightRegular,
      textAlign: 'left',
      fontStyle: 'normal',
    },

    h1: {
      fontSize: '80px',
      fontWeight: FontWeights.fontWeightMedium,
      lineHeight: '80px',
      letterSpacing: '-0.005em',
      textTransform: 'capitalize',
    },
    h2: {
      fontSize: '32px',
      fontWeight: FontWeights.fontWeightBold,
      lineHeight: '40px',
      letterSpacing: '0px',
      textTransform: 'capitalize',

      '&.acidGreen': {
        background: COLOR_ACID_GREEN,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        '&.gradient': {
          background: COLOR_AKZ,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      },
    },
    h3: {
      fontSize: '20px',
      fontWeight: FontWeights.fontWeightBold,
      lineHeight: '30px',
      letterSpacing: '0px',
      textTransform: 'capitalize',
    },
    h4: {
      fontSize: '26px',
      fontWeight: FontWeights.fontWeightMedium,
      lineHeight: '32px',
      letterSpacing: '0.01em',
      textTransform: 'capitalize',
    },
    h5: {
      fontSize: '20px',
      fontWeight: FontWeights.fontWeightMedium,
      lineHeight: '28px',
      letterSpacing: '0.01em',
      textTransform: 'capitalize',
    },
    h6: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0.01em',
    },
    button: {
      fontFamily: 'Arial Black',
      fontSize: '18px',
      fontWeight: FontWeights.fontWeightMedium,
      lineHeight: '24px',
      letterSpacing: '-0.5px',
      textTransform: 'unset',
    },
    body1: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.02em',
      ...boldStyles,

      '&.colorSecondary': {
        color: COLOR_BLACK_4,
      },

      '&.l': {
        fontSize: '18px',
        fontWeight: FontWeights.fontWeightMedium,
        lineHeight: '30px',
        letterSpacing: '-0.5px',
        textTransform: 'none',
      },

      '&.s': {
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0px',
      },

      '&.xs': {
        fontSize: '12px',
        fontWeight: FontWeights.fontWeightMedium,
        lineHeight: '20px',
        letterSpacing: '0px',
      },

      '&.articleLargeLink': {
        fontSize: '20px',
        lineHeight: '32px',
        letterSpacing: '0.01em',
        textDecoration: 'underline',
        textDecorationThickness: '1.5px',
        textUnderlineOffset: '2px',
      },

      '&.articleSmall': {
        fontSize: '16px',
        lineHeight: '26px',
        letterSpacing: '0.02em',
      },

      '&.articleSmallBold': {
        fontSize: '16px',
        fontWeight: FontWeights.fontWeightMedium,
        lineHeight: '26px',
        letterSpacing: '0.02em',
      },

      '&.articleSmallLink': {
        fontSize: '16px',
        lineHeight: '26px',
        letterSpacing: '0.02em',
        textDecoration: 'underline',
        textUnderlineOffset: '1px',
      },
    },
    body2: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.5px',
    },
    caption: {
      '&.category': {
        fontFamily: 'Arial Black',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      },
      '&.backToTop': {
        fontSize: '12px',
        lineHeight: '12px',
        letterSpacing: '0.02em',
        color: COLOR_BLACK,
      },
    },
  };
};

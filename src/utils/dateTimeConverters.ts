import { TPingIntervalUnit } from 'types';

const YEAR_AS_DAYS = 365;
const MONTH_AS_DAYS = 30;
const DAY_AS_SECONDS = 24 * 60 * 60;

export const convertIntervalAsSeconds = (
  interval: string | number, units: TPingIntervalUnit,
) => {
  let seconds: number = +interval;
  switch (units) {
    case 'Day': {
      seconds *= DAY_AS_SECONDS;
      break;
    }
    case 'Month': {
      seconds *= MONTH_AS_DAYS * DAY_AS_SECONDS;
      break;
    }
    case 'Year': {
      seconds *= YEAR_AS_DAYS * DAY_AS_SECONDS;
      break;
    }
    default: {
      throw new Error('Wrong units passed');
    }
  }
  return seconds;
};

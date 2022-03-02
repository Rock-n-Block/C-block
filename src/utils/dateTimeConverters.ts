import { TPingIntervalUnit } from 'types';

const YEAR_AS_DAYS = 365;
const MONTH_AS_DAYS = 30;
export const MINUTE_AS_SECONDS = 60;
export const HOUR_AS_SECONDS = 60 * MINUTE_AS_SECONDS;
export const DAY_AS_SECONDS = 24 * HOUR_AS_SECONDS;

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

export const convertIntervalFromSeconds = (
  interval: string | number,
  units: TPingIntervalUnit,
  shouldRound = true,
) => {
  let result: number = +interval;
  switch (units) {
    case 'Day': {
      result /= DAY_AS_SECONDS;
      break;
    }
    case 'Month': {
      result /= MONTH_AS_DAYS * DAY_AS_SECONDS;
      break;
    }
    case 'Year': {
      result /= YEAR_AS_DAYS * DAY_AS_SECONDS;
      break;
    }
    default: {
      throw new Error('Wrong units passed');
    }
  }

  return shouldRound ? Math.floor(result) : result;
};

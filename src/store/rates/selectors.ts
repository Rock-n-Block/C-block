import type { State } from 'types';

export default {
  selectRates: (state: State) => state.rates.rates,
};

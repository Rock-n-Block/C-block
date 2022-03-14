import type { State } from 'types';

export default {
  getAllFinishedContracts: (state: State) => state.earn.items,
};

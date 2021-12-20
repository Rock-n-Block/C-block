import type { WeddingFormsState, State } from 'types';

export default {
  getWeddingForms: (state: State): WeddingFormsState => state.weddingForms,
};

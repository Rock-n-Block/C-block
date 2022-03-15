import type { State } from 'types';

export default {
  getModals: (state: State) => state.modals,
  getActiveModal: (state: State) => state.modals.activeModal,
  getIsOpenModal: (state: State) => state.modals.open,
};

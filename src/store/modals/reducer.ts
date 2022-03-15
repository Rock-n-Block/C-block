import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ModalsState, Modals,
} from 'types';

export const initialState: ModalsState = {
  activeModal: Modals.Init,
  open: false,
};

export const modalsReducer = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setActiveModal: (
      state,
      action: PayloadAction<ModalsState>,
    ) => ({
      ...state,
      ...action.payload,
    }),

    closeModal: (
      state,
    ) => ({
      ...state,
      ...initialState,
    }),
  },
});

export const {
  setActiveModal,
  closeModal,
} = modalsReducer.actions;

export default modalsReducer.reducer;

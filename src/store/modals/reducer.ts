import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ModalsState, Modals,
} from 'types';

export const initialState: ModalsState = {
  activeModal: Modals.Init,
  open: false,
  modals: {
    Init: false,
    SendTxPending: false,
    SendTxRejected: false,
    SendTxSuccess: false,
    FullscreenLoader: false,

    PasswordReset: false,
    PasswordResetPending: false,
    PasswordResetByEmail: false,
    PasswordResetByEmailPending: false,
    PasswordChange: false,
    PasswordChangePending: false,
    SignUp: false,
    SignUpPending: false,
    Login: false,
    LoginPending: false,

    AdminChangePaymentsReceiverPending: false,
    AdminChangePaymentsReceiverSuccess: false,
    AdminChangePaymentsReceiverError: false,
    AdminChangePricePending: false,
    AdminChangePriceSuccess: false,
    AdminChangePriceError: false,
    AdminSendEmail: false,
  },
};

export const modalsReducer = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setActiveModal: (
      state,
      action: PayloadAction<Partial<ModalsState>>,
    ) => ({
      ...state,
      ...action.payload,
      modals: {
        ...state.modals,
        ...action.payload?.modals,
      },
    }),

    closeModal: (
      state,
      action?: PayloadAction<Modals>,
    ) => {
      const ret = {
        ...state,
        ...initialState,
        modals: state.modals,
      };
      if (action?.payload) {
        ret.modals = {
          ...ret.modals,
          [action.payload]: false,
        };
      }
      return ret;
    },

    closeAllModals: (
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
  closeAllModals,
} = modalsReducer.actions;

export default modalsReducer.reducer;

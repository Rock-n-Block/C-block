/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeddingContract, WeddingFormsState } from '../../types';

const initialState: WeddingFormsState = {
  weddingContract: {
    contractName: '',
    partnerOneAddress: '',
    partnerTwoAddress: '',
    partnerOneEmail: '',
    partnerTwoEmail: '',
    daysForDivorceApproval: '',
    partnerOneSliderValue: 20,
    partnerTwoSliderValue: 50,
    daysForWithdrawalApproval: '',
  },
};

export const weddingFormReducer = createSlice({
  name: 'weddingForms',
  initialState,
  reducers: {
    setWeddingContractForm: (state, action: PayloadAction<WeddingContract>) => ({
      ...state,
      weddingContract: action.payload,
    }),
    deleteWeddingContractForm: (state) => ({
      ...state,
      weddingContract: initialState.weddingContract,
    }),
  },
});

export const {
  setWeddingContractForm, deleteWeddingContractForm,
} = weddingFormReducer.actions;

export default weddingFormReducer.reducer;

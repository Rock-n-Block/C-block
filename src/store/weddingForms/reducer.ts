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
    partnerOneSliderValue: 50,
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
    setWeddingFirstSliderValueForm: (state, action) => ({
      ...state,
      weddingContract: {
        ...state.weddingContract,
        partnerOneSliderValue: action.payload,
        partnerTwoSliderValue: 100 - action.payload,
      },
    }),
    deleteWeddingContractForm: (state) => ({
      ...state,
      weddingContract: initialState.weddingContract,
    }),
  },
});

export const {
  setWeddingContractForm, deleteWeddingContractForm, setWeddingFirstSliderValueForm,
} = weddingFormReducer.actions;

export default weddingFormReducer.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContractFormsState, IWeddingContract } from 'types';
import { ICrowdsaleContract, TokenContract } from 'types/store/contractForms';
import { formattedDate } from 'utils';

export const dynamicFormDataTemplate = {
  address: '',
  name: '',
  amount: '',
  isFrozen: false,
  frozenUntilDate: formattedDate(),
};

export const crowdsaleContractDynamicFormInitialData = {
  address: '',
  rate: '',
};

const initialState: ContractFormsState = {
  tokenContract: {
    tokenName: '',
    tokenOwner: '',
    tokenSymbol: '',
    decimals: '',
    futureMinting: false,
    burnable: false,
    freezable: false,
    tokens: [dynamicFormDataTemplate],
  },
  crowdsaleContract: {
    contractName: '',
    tokenAddress: '',
    crowdsaleOwner: '',
    tokens: [crowdsaleContractDynamicFormInitialData],
    softcapTokens: '',
    saleDuration: '',
    changingDates: false,

    minMaxInvestmentsSection: false,
    minInvestments: '',
    maxInvestments: '',

    amountBonusSection: false,
    amountBonus: '',
    minimumContribution: '',
  },
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

export const contractFormReducer = createSlice({
  name: 'contractForms',
  initialState,
  reducers: {
    setTokenContractForm: (state, action: PayloadAction<TokenContract>) => ({
      ...state,
      tokenContract: action.payload,
    }),
    setCrowdsaleContractForm: (state, action: PayloadAction<ICrowdsaleContract>) => ({
      ...state,
      crowdsaleContract: action.payload,
    }),
    deleteTokenContractForm: (state) => ({
      ...state,
      tokenContract: initialState.tokenContract,
    }),
    setWeddingContractForm: (state, action: PayloadAction<IWeddingContract>) => ({
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
  setTokenContractForm,
  setCrowdsaleContractForm,
  deleteTokenContractForm,
  setWeddingContractForm,
  deleteWeddingContractForm,
} = contractFormReducer.actions;

export default contractFormReducer.reducer;

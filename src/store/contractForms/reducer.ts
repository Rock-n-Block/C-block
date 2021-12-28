import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContractFormsState, IWeddingContract } from 'types';
import {
  TokenContract,
  TokenContractDynamicForm,
  ICrowdsaleContract,
  ICrowdsaleContractDynamicForm,
  ILostKeyContract,
  ILostKeyContractDynamicForm,
  IWillContract,
  IWillContractDynamicForm,
} from 'types/store/contractForms';
import { formattedDate } from 'utils';

export const dynamicFormDataTemplate: TokenContractDynamicForm = {
  address: '',
  name: '',
  amount: '',
  isFrozen: false,
  frozenUntilDate: formattedDate(),
};

export const crowdsaleContractDynamicFormInitialData: ICrowdsaleContractDynamicForm = {
  address: '',
  rate: '',
};

export const lostKeyContractDynamicFormInitialData: ILostKeyContractDynamicForm = {
  reserveAddress: '',
  email: '',
  percents: '0',
};

export const willContractDynamicFormInitialData: IWillContractDynamicForm = {
  reserveAddress: '',
  email: '',
  percents: '0',
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
    minInvestments: '0',
    maxInvestments: '0',

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
  lostKeyContract: {
    contractName: '',
    managementAddress: '',
    reservesConfigs: [lostKeyContractDynamicFormInitialData],
    pingIntervalAsValue: '6',
    pingIntervalAsDateUnits: 'Month',
  },
  willContract: {
    contractName: '',
    managementAddress: '',
    reservesConfigs: [willContractDynamicFormInitialData],
    pingIntervalAsValue: '6',
    pingIntervalAsDateUnits: 'Month',
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
    deleteTokenContractForm: (state) => ({
      ...state,
      tokenContract: initialState.tokenContract,
    }),

    setCrowdsaleContractForm: (state, action: PayloadAction<ICrowdsaleContract>) => ({
      ...state,
      crowdsaleContract: action.payload,
    }),
    deleteCrowdsaleContractForm: (state) => ({
      ...state,
      crowdsaleContract: initialState.crowdsaleContract,
    }),

    setWeddingContractForm: (state, action: PayloadAction<IWeddingContract>) => ({
      ...state,
      weddingContract: action.payload,
    }),
    deleteWeddingContractForm: (state) => ({
      ...state,
      weddingContract: initialState.weddingContract,
    }),

    setLostKeyContractForm: (state, action: PayloadAction<ILostKeyContract>) => ({
      ...state,
      lostKeyContract: action.payload,
    }),
    deleteLostKeyContractForm: (state) => ({
      ...state,
      lostKeyContract: initialState.lostKeyContract,
    }),

    setWillContractForm: (state, action: PayloadAction<IWillContract>) => ({
      ...state,
      willContract: action.payload,
    }),
    deleteWillContractForm: (state) => ({
      ...state,
      willContract: initialState.willContract,
    }),
  },
});

export const {
  setTokenContractForm,
  deleteTokenContractForm,

  setCrowdsaleContractForm,
  deleteCrowdsaleContractForm,

  setWeddingContractForm,
  deleteWeddingContractForm,

  setLostKeyContractForm,
  deleteLostKeyContractForm,

  setWillContractForm,
  deleteWillContractForm,
} = contractFormReducer.actions;

export default contractFormReducer.reducer;

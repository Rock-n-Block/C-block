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
  ContractAdditionalField,
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

const contractAdditionalFieldsInitialData: ContractAdditionalField = {
  additional: {
    contractCreationPrice: '',
  },
};

const tokenContractInitialState: TokenContract = {
  tokenName: '',
  tokenOwner: '',
  tokenSymbol: '',
  decimals: '',
  futureMinting: false,
  burnable: false,
  freezable: false,
  tokens: [dynamicFormDataTemplate],
  ...contractAdditionalFieldsInitialData,
};

const crowdsaleContractInitialState: ICrowdsaleContract = {
  contractName: '',
  tokenAddress: '',
  crowdsaleOwner: '',
  tokens: [crowdsaleContractDynamicFormInitialData],
  softcapTokens: '', // if > 0 then isSoftcappable = true, otherwise `false`
  saleDuration: '', // amount of days to be passed as seconds
  changingDates: false,

  minMaxInvestmentsSection: false,
  minInvestments: '0',
  maxInvestments: '0',

  amountBonusSection: false,
  amountBonus: '', // percents (to be sent on the blockain 100% = 1000)
  minimumContribution: '', // tokenAddress's amount (5.34343 NEW)

  additional: {
    contractCreationPrice: '',
    paymentTokensSymbols: [], // to be fetched after user successfully fills contract fields
    tokenToSaleSymbol: '', // to be fetched after user successfully fills contract fields
  },
};

const weddingContractInitialState: IWeddingContract = {
  contractName: '',
  partnerOneAddress: '',
  partnerTwoAddress: '',
  partnerOneEmail: '',
  partnerTwoEmail: '',
  daysForDivorceApproval: '',
  partnerOneSliderValue: 50,
  partnerTwoSliderValue: 50,
  daysForWithdrawalApproval: '',
  ...contractAdditionalFieldsInitialData,
};

const lostKeyContractInitialState: ILostKeyContract = {
  contractName: '',
  managementAddress: '',
  reservesConfigs: [lostKeyContractDynamicFormInitialData],
  pingIntervalAsValue: '6',
  pingIntervalAsDateUnits: 'Month',
  rewardAmount: '',
  ownerEmail: '',
  ...contractAdditionalFieldsInitialData,
};

const willContractInitialState: IWillContract = {
  contractName: '',
  managementAddress: '',
  reservesConfigs: [willContractDynamicFormInitialData],
  pingIntervalAsValue: '6',
  pingIntervalAsDateUnits: 'Month',
  rewardAmount: '',
  ownerEmail: '',
  ...contractAdditionalFieldsInitialData,
};

export const initialState: ContractFormsState = {
  tokenContract: tokenContractInitialState,
  crowdsaleContract: crowdsaleContractInitialState,
  weddingContract: weddingContractInitialState,
  lostKeyContract: lostKeyContractInitialState,
  willContract: willContractInitialState,
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { contractButtonsHelper, IContractsCard, isFoundContract } from 'pages/MyContracts/MyContracts.helpers';
import {
  MyContractsState,
} from 'types';

export const initialState: MyContractsState = {
  contracts: [],
};

export const myContractsReducer = createSlice({
  name: 'myContracts',
  initialState,
  reducers: {
    setMyContracts: (state: MyContractsState, action: PayloadAction<IContractsCard[]>) => ({
      ...state,
      contracts: action.payload,
    }),

    enableWeddingRequestWithdrawal: (
      state: MyContractsState,
      action: PayloadAction<{
        address: string
      }>,
    ) => {
      const { address } = action.payload;
      const newState = state.contracts.map((card) => {
        if (isFoundContract(card, address)) {
          return {
            ...card,
            additionalContentRenderType: 'weddingRequestWithdrawal',
            contractButtons: [
              contractButtonsHelper.viewContract,
              // contractButtonsHelper.requestDivorce, // dunno
            ],
          } as typeof card;
        }
        return card;
      });

      return {
        ...state,
        contracts: newState,
      };
    },

    enableWeddingRequestDivorce: (
      state: MyContractsState,
      action: PayloadAction<{
        address: string
      }>,
    ) => {
      const { address } = action.payload;
      const newState = state.contracts.map((card) => {
        if (isFoundContract(card, address)) {
          return {
            ...card,
            additionalContentRenderType: 'weddingRequestDivorce',
            contractButtons: [
              contractButtonsHelper.viewContract,
            ],
          } as typeof card;
        }
        return card;
      });

      return {
        ...state,
        contracts: newState,
      };
    },

    enableWeddingSuccessfulWithdrawal: (
      state: MyContractsState,
      action: PayloadAction<{
        contractAddress: string
      }>,
    ) => {
      const { contractAddress } = action.payload;
      const newState = state.contracts.map((card) => {
        if (isFoundContract(card, contractAddress)) {
          return {
            ...card,
            additionalContentRenderType: 'weddingSuccessfulWithdrawal',
            contractButtons: [
              contractButtonsHelper.viewContract,
            ],
          } as typeof card;
        }
        return card;
      });

      return {
        ...state,
        contracts: newState,
      };
    },

    enableWeddingSuccessfulDivorce: (
      state: MyContractsState,
      action: PayloadAction<{
        contractAddress: string
      }>,
    ) => {
      const { contractAddress } = action.payload;
      const newState = state.contracts.map((card) => {
        if (isFoundContract(card, contractAddress)) {
          return {
            ...card,
            additionalContentRenderType: 'weddingSuccessfulDivorce',
            contractButtons: [
              contractButtonsHelper.viewContract,
              contractButtonsHelper.getFunds,
            ],
          } as typeof card;
        }
        return card;
      });

      return {
        ...state,
        contracts: newState,
      };
    },
  },
});

export const {
  setMyContracts,
  enableWeddingRequestWithdrawal,
  enableWeddingRequestDivorce,
  enableWeddingSuccessfulWithdrawal,
  enableWeddingSuccessfulDivorce,
} = myContractsReducer.actions;

export default myContractsReducer.reducer;

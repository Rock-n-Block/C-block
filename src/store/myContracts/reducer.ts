import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { contractButtonsHelper, IContractsCard, isFoundContract } from 'pages/MyContracts/MyContracts.helpers';
import {
  ISetUpModalTokenAddressField,
  ISpecificLostKeyContractData,
  MyContractsState,
} from 'types';

export const initialState: MyContractsState = {
  contracts: [],
};

export const myContractsReducer = createSlice({
  name: 'myContracts',
  initialState,
  reducers: {
    setMyContracts: (state, action: PayloadAction<IContractsCard[]>) => ({
      ...state,
      contracts: action.payload,
    }),

    enableWeddingRequestWithdrawal: (
      state,
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
      state,
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
      state,
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
      state,
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

    // Set Up Moodal Reducer
    setUpModalClearInputs(
      state,
      action: PayloadAction<{
        contractAddress: string,
      }>,
    ) {
      const { contractAddress } = action.payload;
      const newState = state.contracts.map((card) => {
        if (isFoundContract(card, contractAddress)) {
          return {
            ...card,
            specificContractData: {
              ...card.specificContractData,
              addresses: [
                {
                  id: 0,
                  address: '',
                  allowance: '0',
                },
              ],
            } as ISpecificLostKeyContractData,
          } as typeof card;
        }
        return card;
      });

      return {
        ...state,
        contracts: newState,
      };
    },

    setUpModalResetField(
      state,
      action: PayloadAction<{
        contractAddress: string,
        fieldId: number,
      }>,
    ) {
      const { contractAddress, fieldId } = action.payload;
      const newState = state.contracts.map((card) => {
        if (isFoundContract(card, contractAddress)) {
          const specificContractData = card.specificContractData as ISpecificLostKeyContractData;
          return {
            ...card,
            specificContractData: {
              ...specificContractData,
              addresses: specificContractData.addresses.map((item) => (item.id === fieldId ? {
                id: fieldId,
                address: '',
                allowance: '',
              } : item)),
            } as ISpecificLostKeyContractData,
          } as typeof card;
        }
        return card;
      });

      return {
        ...state,
        contracts: newState,
      };
    },

    setUpModalSetAddresses(
      state,
      action: PayloadAction<{
        contractAddress: string,
        addresses: ISetUpModalTokenAddressField[],
      }>,
    ) {
      const { contractAddress, addresses } = action.payload;
      const newState = state.contracts.map((card) => {
        if (isFoundContract(card, contractAddress)) {
          const specificContractData = card.specificContractData as ISpecificLostKeyContractData;
          return {
            ...card,
            specificContractData: {
              ...specificContractData,
              addresses,
            } as ISpecificLostKeyContractData,
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

  setUpModalClearInputs,
  setUpModalResetField,
  setUpModalSetAddresses,
} = myContractsReducer.actions;

export default myContractsReducer.reducer;

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { ContractFormsState, UserState } from 'types';
import reducer from './rootReducer';
import rootSaga from './rootSaga';
import contractFormsActionTypes from './contractForms/actionTypes';
import myContractsActionTypes from './myContracts/actionTypes';
import myContractsWeddingActionTypes from './myContracts/weddingContracts/actionTypes';
import earnActionTypes from './earn/actionTypes';
import { initWalletConnectStore } from './configureWalletConnectStore';

const sagaMiddleware = createSagaMiddleware();

const userPersistConfig: {
  key: 'user';
  storage: typeof storage;
  whitelist: (keyof UserState)[];
} = {
  key: 'user',
  storage,
  whitelist: ['address', 'wallet', 'isLight', 'isMainnet'],
};

const contractFormsPersistConfig: {
  key: 'contractForms';
  storage: typeof storage;
  whitelist: (keyof ContractFormsState)[];
} = {
  key: 'contractForms',
  storage,
  whitelist: ['tokenContract', 'crowdsaleContract', 'weddingContract', 'lostKeyContract', 'willContract'],
};

const reducers = {
  ...reducer,
  user: persistReducer(userPersistConfig, reducer.user),
  contractForms: persistReducer(contractFormsPersistConfig, reducer.contractForms),
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          contractFormsActionTypes.APPROVE,
          contractFormsActionTypes.GET_CONTRACT_CREATION_PRICE,
          contractFormsActionTypes.CREATE_TOKEN_CONTRACT,
          contractFormsActionTypes.CREATE_LOSTKEY_CONTRACT,
          contractFormsActionTypes.CREATE_WILL_CONTRACT,
          contractFormsActionTypes.CREATE_CROWDSALE_CONTRACT,
          contractFormsActionTypes.CREATE_WEDDING_CONTRACT,
          contractFormsActionTypes.GET_CROWDSALE_CONTRACT_ADDITIONAL_DATA,
          contractFormsActionTypes.GET_ERC20_SYMBOL,

          myContractsActionTypes.GET_MY_CONTRACTS,
          myContractsWeddingActionTypes.INIT_DIVORCE,
          myContractsWeddingActionTypes.APPROVE_DIVORCE,
          myContractsWeddingActionTypes.REJECT_DIVORCE,
          myContractsWeddingActionTypes.INIT_WITHDRAWAL,
          myContractsWeddingActionTypes.APPROVE_WITHDRAWAL,
          myContractsWeddingActionTypes.REJECT_WITHDRAWAL,
          myContractsWeddingActionTypes.GET_FUNDS_AFTER_DIVORCE,

          earnActionTypes.GET_FINISHED_CONTRACTS,
          earnActionTypes.TRANSFER_REWARD,
        ],
      },
    },
  ).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

initWalletConnectStore(store);

export function getProduction() {
  return store.getState().user.isMainnet;
}

export default { store, persistor };

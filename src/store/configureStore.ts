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
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    },
  ).concat(sagaMiddleware),
});

const persistor = persistStore(store);

export default { store, persistor };

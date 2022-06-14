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
import erc20ActionTypes from './erc20/actionTypes';
import contractFormsActionTypes from './contractForms/actionTypes';
import myContractsActionTypes from './myContracts/actionTypes';
import myContractsWeddingActionTypes from './myContracts/weddingContracts/actionTypes';
import earnActionTypes from './earn/actionTypes';
import setUpActionTypes from './myContracts/setUpModal/actionTypes';
import confirmActiveStatusModalActionTypes from './myContracts/confirmActiveStatusModal/actionTypes';
import burnTokenModalActionTypes from './myContracts/burnTokenModal/actionTypes';
import mintTokenModalActionTypes from './myContracts/mintTokenModal/actionTypes';
import authActionTypes from './user/auth/actionTypes';
import adminActionTypes from './admin/actionTypes';
import { initWalletConnectStore } from './configureWalletConnectStore';

const sagaMiddleware = createSagaMiddleware();

const userPersistConfig: {
  key: 'user';
  storage: typeof storage;
  whitelist: (keyof UserState)[];
} = {
  key: 'user',
  storage,
  whitelist: ['address', 'wallet', 'isLight', 'email', 'registrationEmail', 'registrationWalletAddress'],
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
          erc20ActionTypes.APPROVE,
          erc20ActionTypes.GET_ERC20_SYMBOL,

          contractFormsActionTypes.GET_CONTRACTS_MIN_CREATION_PRICE,
          contractFormsActionTypes.GET_CONTRACT_CREATION_PRICE,
          contractFormsActionTypes.CREATE_TOKEN_CONTRACT,
          contractFormsActionTypes.CREATE_LOSTKEY_CONTRACT,
          contractFormsActionTypes.CREATE_WILL_CONTRACT,
          contractFormsActionTypes.CREATE_CROWDSALE_CONTRACT,
          contractFormsActionTypes.CREATE_WEDDING_CONTRACT,
          contractFormsActionTypes.GET_CROWDSALE_CONTRACT_ADDITIONAL_DATA,

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

          setUpActionTypes.SETUP_MODAL_UPDATE_ALLOWANCE,
          setUpActionTypes.SETUP_MODAL_APPROVE,
          setUpActionTypes.GET_SETUP_MODAL_TOKEN_ADDRESSES,
          setUpActionTypes.SETUP_MODAL_ADD_TOKENS,

          confirmActiveStatusModalActionTypes.CONFIRM_ACTIVE_STATUS_MODAL_CONFIRM,

          burnTokenModalActionTypes.BURN_TOKEN_MODAL_BURN,
          mintTokenModalActionTypes.MINT_TOKEN_MODAL_MINT,

          authActionTypes.USER_AUTH_REGISTER_ACCOUNT,

          adminActionTypes.ADMIN_CHECK_IS_ADMIN,
          adminActionTypes.ADMIN_SET_PAYMENTS_RECEIVER,
          adminActionTypes.ADMIN_SET_PRICE,
          adminActionTypes.ADMIN_GET_PAYMENTS_RECEIVER,
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

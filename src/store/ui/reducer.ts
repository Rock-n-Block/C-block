import { UIState, RequestStatus } from 'types';
import erc20ActionTypes from 'store/erc20/actionTypes';
import contractFormsActionTypes from 'store/contractForms/actionTypes';
import { getUIReducer } from '.';

const initialState: UIState = {
  [erc20ActionTypes.APPROVE]: RequestStatus.INIT,
  [contractFormsActionTypes.CREATE_TOKEN_CONTRACT]: RequestStatus.INIT,
  [contractFormsActionTypes.CREATE_LOSTKEY_CONTRACT]: RequestStatus.INIT,
  [contractFormsActionTypes.CREATE_WILL_CONTRACT]: RequestStatus.INIT,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;

import { UIState } from 'types';
import { RequestStatus } from 'types/store';
import contractFormsActionTypes from 'store/contractForms/actionTypes';
import { getUIReducer } from '.';

const initialState: UIState = {
  [contractFormsActionTypes.APPROVE]: RequestStatus.INIT,
  [contractFormsActionTypes.CREATE_TOKEN_CONTRACT]: RequestStatus.INIT,
  [contractFormsActionTypes.CREATE_LOSTKEY_CONTRACT]: RequestStatus.INIT,
  [contractFormsActionTypes.CREATE_WILL_CONTRACT]: RequestStatus.INIT,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;

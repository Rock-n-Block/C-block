import { UIState } from 'types';
import { RequestStatus } from 'types/store';
import contractFormsActionTypes from 'store/contractForms/actionTypes';
import { getUIReducer } from '.';

const initialState: UIState = {
  [contractFormsActionTypes.CREATE_TOKEN_CONTRACT]: RequestStatus.INIT,
  [contractFormsActionTypes.APPROVE]: RequestStatus.INIT,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;

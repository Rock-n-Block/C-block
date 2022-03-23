import { createAction } from '@reduxjs/toolkit';

import {
  TConfirmActiveStatusModalConfirmAction,
} from 'types';

import actionTypes from './actionTypes';

export const confirmActiveStatusModalConfirm = createAction<TConfirmActiveStatusModalConfirmAction>(
  actionTypes.CONFIRM_ACTIVE_STATUS_MODAL_CONFIRM,
);

export default {
  confirmActiveStatusModalConfirm,
};

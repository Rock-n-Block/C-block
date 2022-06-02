export enum Modals {
  PasswordResetByEmail = 'PasswordResetByEmail',
  PasswordReset = 'PasswordReset',
  FullscreenLoader = 'FullscreenLoader',
  SendTxPending = 'SendTxPending',
  SendTxRejected = 'SendTxRejected',
  SendTxSuccess = 'SendTxSuccess',
  Init = 'Init',
}

export type ModalsState = {
  activeModal: Modals;
  open: boolean;
};

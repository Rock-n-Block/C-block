export enum Modals {
  PasswordResetByEmail = 'PasswordResetByEmail',
  PasswordReset = 'PasswordReset',
  SignUp = 'SignUp',
  Login = 'Login',
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

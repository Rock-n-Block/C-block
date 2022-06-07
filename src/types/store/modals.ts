export enum Modals {
  PasswordResetByEmail = 'PasswordResetByEmail',
  PasswordResetByEmailPending = 'PasswordResetByEmailPending',
  PasswordReset = 'PasswordReset',
  PasswordResetPending = 'PasswordResetPending',
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
  modals: {
    [modalType in Modals]: boolean;
  }
};

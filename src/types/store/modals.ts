export enum Modals {
  PasswordResetByEmail = 'PasswordResetByEmail',
  PasswordResetByEmailPending = 'PasswordResetByEmailPending',
  PasswordReset = 'PasswordReset',
  PasswordResetPending = 'PasswordResetPending',
  SignUp = 'SignUp',
  SignUpPending = 'SignUpPending',
  Login = 'Login',
  LoginPending = 'LoginPending',

  AdminChangePaymentsReceiverPending = 'AdminChangePaymentsReceiverPending',
  AdminChangePaymentsReceiverSuccess = 'AdminChangePaymentsReceiverSuccess',
  AdminChangePaymentsReceiverError = 'AdminChangePaymentsReceiverError',

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

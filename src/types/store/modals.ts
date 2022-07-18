export enum Modals {
  PasswordResetByEmail = 'PasswordResetByEmail',
  PasswordResetByEmailPending = 'PasswordResetByEmailPending',
  PasswordReset = 'PasswordReset',
  PasswordResetPending = 'PasswordResetPending',
  PasswordChange = 'PasswordChange',
  PasswordChangePending = 'PasswordChangePending',
  SignUp = 'SignUp',
  SignUpPending = 'SignUpPending',
  Login = 'Login',
  LoginPending = 'LoginPending',

  AdminChangePaymentsReceiverPending = 'AdminChangePaymentsReceiverPending',
  AdminChangePaymentsReceiverSuccess = 'AdminChangePaymentsReceiverSuccess',
  AdminChangePaymentsReceiverError = 'AdminChangePaymentsReceiverError',
  AdminChangePricePending = 'AdminChangePricePending',
  AdminChangePriceSuccess = 'AdminChangePriceSuccess',
  AdminChangePriceError = 'AdminChangePriceError',
  AdminSendEmail = 'AdminSendEmail',

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

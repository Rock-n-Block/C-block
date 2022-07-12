export interface IResetPassword {
  email: string;
}

export interface IResetPasswordReturnType {
  detail: string;
}

export interface IConfirmResetPassword {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
}

export interface IChangePassword {
  old_password: string;
  new_password1: string;
  new_password2: string;
}

export type IGetMetamaskMessageReturnType = string;
export interface IRegisterAccount {
  email: string;
  password1: string;
  password2: string;
  owner_address: string;
  message: string;
  signature: string;
}

export interface ILogin {
  email: string;
  password: string;
}

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

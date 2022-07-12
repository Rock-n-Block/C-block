import { TProvider } from '../../actions';

export type TResetPasswordAction = {
  email: string;
};

export type TConfirmResetPasswordAction = {
  password: string;
  uid: string;
  token: string;
};
export type TChangePasswordAction = {
  oldPassword: string;
  password: string;
};
export type TRegisterAccountAction = TProvider & {
  email: string;
  password1: string;
  password2: string;
};

export type TLogoutAction = {
  showErrorNotification: boolean;
};

export type TLoginAction = {
  email: string;
  password: string;
};

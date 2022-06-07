import { TProvider } from '../../actions';

export type TResetPasswordAction = {
  email: string;
};

export type TConfirmResetPasswordAction = {
  password: string;
  uid: string;
  token: string;
};
export type TRegisterAccountAction = TProvider & {
  email: string;
  password1: string;
  password2: string;
};

// import { TProvider } from '../../actions';

export type TResetPasswordAction = {
  email: string;
};

export type TConfirmResetPasswordAction = {
  password: string;
  uid: string;
  token: string;
};

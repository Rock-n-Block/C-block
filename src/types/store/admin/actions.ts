import { TProvider } from '../actions';

export type TAdminCheckIsAdminAction = TProvider;
export type TAdminSetPaymentsReceiverAction = TProvider & {
  paymentsReceiverAddress: string;
};

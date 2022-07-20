import { FactoryContracts, TDeployContractCreationMethodNames, Tokens } from 'types/utils/contractsHelper';
import { Permissions } from 'types/store/user';
import { TProvider } from '../actions';

export type TAdminCheckIsAdminAction = TProvider;
export type TAdminSetPaymentsReceiverAction = TProvider & {
  paymentsReceiverAddress: string;
};
export type TAdminSetPriceAction = TProvider & {
  contractType: FactoryContracts;
  deployContractName: TDeployContractCreationMethodNames;
  price: string;
  tokenName: Tokens;
};
export type TAdminGetPaymentsReceiverAction = TProvider;
export type TSetIsMainnetDisabledAction = {
  isMainnetDisabled: boolean;
};
// export type TGetUsersAction = {};
export type TSendEmailAction = {
  userId: number;
  message: string;
};
export type TSetIsFrozenUserAction = {
  userId: number;
  isFrozen: boolean;
};
export type TAdminGetUserContractsAction = {
  userId: number;
};
export type TAdminUpdatePermissionsAction = TProvider & {
  userId: number;
  permissions: Partial<Permissions>;
};

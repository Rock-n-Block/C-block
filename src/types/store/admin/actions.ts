import { FactoryContracts, TDeployContractCreationMethodNames } from 'types/utils/contractsHelper';
import { TProvider } from '../actions';

export type TAdminCheckIsAdminAction = TProvider;
export type TAdminSetPaymentsReceiverAction = TProvider & {
  paymentsReceiverAddress: string;
};
export type TAdminSetPriceAction = TProvider & {
  contractType: FactoryContracts;
  deployContractName: TDeployContractCreationMethodNames;
  price: string;
};
export type TAdminGetPaymentsReceiverAction = TProvider;
export type TSetIsMainnetDisabledAction = {
  isMainnetDisabled: boolean;
};

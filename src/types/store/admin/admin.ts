import { IGetContractsReturnType } from 'store/api/apiRequestBuilder.types';
import { Permissions } from '../user';

export type UserView = {
  id: number;
  email: string;
  ownerAddress: string;
  registrationDate: string;

  userName: string;
  company: string;
  phoneNumber: string;
  country: string;
  city: string;
  street: string;
  office: string;
  building: string;
  zipcode: string;
  avatarUrl: string;
  isFrozen: boolean;
  isCompletedProfile: boolean;
  permissions: Permissions;

  contracts: IGetContractsReturnType;
};

export type AdminState = {
  isMainnetDisabled: boolean;
  paymentsReceiverAddress: string;
  users: UserView[];
};

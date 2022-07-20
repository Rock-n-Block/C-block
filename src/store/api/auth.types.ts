import { CountryCodesRawItem, TNullable } from 'types';

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

export type PermissionsBackend = {
  can_change_network_mode: boolean;
  can_change_payment_addresses: boolean;
  can_change_price: boolean;
  can_contact_users: boolean;
  can_freeze_users: boolean;
  can_view_users: boolean;
  contract_super_admin: boolean;
};

export type TGetUserDataReturnType = {
  id: number;

  date_joined: string;
  email: string;
  owner_address: string;
  avatar: TNullable<string>;
  city: TNullable<string>;
  company: TNullable<string>;
  country: string;
  is_completed_profile: boolean;
  name: TNullable<string>;
  office: TNullable<string>;
  phone_number: TNullable<string>;
  street: TNullable<string>;
  building: TNullable<string>;
  zipcode: TNullable<string>;

  freezed: boolean;
  permissions: PermissionsBackend;
};

export type IUpdateProfile = Omit<TGetUserDataReturnType, 'email' | 'owner_address' | 'is_completed_profile' | 'avatar' | 'freezed' | 'id' | 'permissions' | 'date_joined'>;

export type TGetCountryCodesReturnType = CountryCodesRawItem[];

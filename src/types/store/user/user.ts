import { WalletProviders } from '../../walletConnect';

export type UserProfile = {
  userName: string;
  company: string;
  telephone: {
    countryCode: string;
    body: string;
  };
  country: string;
  city: string;
  street: string;
  office: string;
  building: string;
  zipcode: string;
  avatarUrl: string;
  avatar: File;

  isCompletedProfile: boolean;
};

export type CountryCodesRawItem = {
  country_code: string;
  country_name: string;
  phone_code: number;
};
export type CountryCodesItem = {
  countryCode: string;
  countryName: string;
  phoneCode: number;
};

export type Permissions = {
  superAdmin: boolean;
  changeNetworkMode: boolean;
  setFeeReceiver: boolean;
  setPrice: boolean;
  contactUsers: boolean;
  freezeUsers: boolean;
  viewUsers: boolean;
};

export type UserState = {
  id: number;
  address: string;
  wallet: WalletProviders;
  isLight: boolean;
  isMainnet: boolean;

  registrationDate: string;
  email: string;
  registrationEmail: string;
  registrationWalletAddress: string;

  profile: UserProfile;

  countryCodes: CountryCodesItem[];

  isFrozen: boolean;

  permissions: Permissions;
};

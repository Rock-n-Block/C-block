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

export type UserState = {
  address: string;
  wallet: WalletProviders;
  isLight: boolean;
  isMainnet: boolean;

  email: string;
  registrationEmail: string;
  registrationWalletAddress: string;

  profile: UserProfile;

  permissions: {
    setFeeReceiver: boolean;
    setPrice: boolean;
    superAdmin: boolean;
  };
};

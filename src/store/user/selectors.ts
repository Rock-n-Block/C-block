import type { State, UserState } from 'types';

export default {
  getUser: (state: State): UserState => state.user,
  selectProfile: (state: State) => state.user.profile,
  selectIsAuthenticated: (state: State) => {
    const {
      email, registrationEmail, address, registrationWalletAddress,
    } = state.user;
    if (!email || !registrationEmail || !address || !registrationWalletAddress) return false;
    return email.toLowerCase() === registrationEmail.toLowerCase() &&
    address.toLowerCase() === registrationWalletAddress.toLowerCase();
  },
  selectIsAdmin: (state: State) => {
    const { address: userWalletAddress } = state.user;
    if (!userWalletAddress) return false;
    return Object.values(state.user.permissions).some((permission) => permission);
  },
};

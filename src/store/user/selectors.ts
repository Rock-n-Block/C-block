import type { State, UserState } from 'types';

export default {
  getUser: (state: State): UserState => state.user,
  selectIsAuthenticated: (state: State) => {
    const {
      email, registrationEmail, address, registrationWalletAddress,
    } = state.user;
    if (!email || !registrationEmail || !address || !registrationWalletAddress) return false;
    return email.toLowerCase() === registrationEmail.toLowerCase() &&
    address.toLowerCase() === registrationWalletAddress.toLowerCase();
  },
};

export default {
  createTokenContract: 'new_token/',
  createLostKeyContract: 'new_lostkey/',
  createWillContract: 'new_lastwill/',
  createCrowdsaleContract: 'new_crowdsale/',
  createWeddingContract: 'new_wedding/',
  getContracts: 'history/',
  getFinishedWillContracts: 'lastwill_finished/',
  getFinishedLostKeyContracts: 'lostkey_finished/',

  getRates: 'rates/',
  getIsMainnetDisabled: 'network_mode/',
  setIsMainnetDisabled: 'network_mode/update',

  accounts: {
    getMetamaskMessage: 'accounts/get_metamask_message/',
    registerAccount: 'accounts/registration/',
    login: 'accounts/login/',
    logout: 'accounts/logout/',
    resetPassword: 'accounts/password/reset/',
    confirmResetPassword: 'accounts/password/reset/confirm/',
    changePassword: 'accounts/password/change/',
    accountsUser: 'accounts/user/',
    countryCodes: 'accounts/country_codes/',

    roleSystem: {
      usersList: 'accounts/role_system/users_list/',
      contactUser: 'accounts/role_system/contact_user/',
    },
  },
};

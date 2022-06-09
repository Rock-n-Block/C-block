import axios, {
  AxiosRequestConfig, AxiosInstance, AxiosResponse,
} from 'axios';
import { URL } from 'appConstants';
// import configureStore from '../configureStore';
// import userSelectors from '../user/selectors';
import {
  ICreateWillContractData,
  ICreateCrowdsaleContractData,
  ICreateLostKeyContractData,
  ICreateTokenContractData,
  ICreateWeddingContractData,
  IGetContractsData,
  TGetContractsReturnType,
  IGetFinishedWillContractsReturnType,
  IGetFinishedLostKeyContractsReturnType,
  TGetRatesReturnType,
} from './apiRequestBuilder.types';
import {
  IConfirmResetPassword,
  IResetPassword,
  IResetPasswordReturnType,
  IGetMetamaskMessageReturnType,
  IRegisterAccount,
  ILogin,
} from './auth.types';

const client: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

export default async function ajax<T>(
  requestConfig: AxiosRequestConfig,
) {
  const apiCall: AxiosResponse<T, typeof requestConfig> = await client(requestConfig);
  return apiCall;
}

export const authApi = {
  getMetamaskMessage() {
    return ajax<IGetMetamaskMessageReturnType>({
      method: 'get',
      url: URL.accounts.getMetamaskMessage,
    });
  },
  registerAccount(data: IRegisterAccount) {
    return ajax({
      method: 'post',
      url: URL.accounts.registerAccount,
      data,
    });
  },
  login(data: ILogin) {
    return ajax({
      method: 'post',
      url: URL.accounts.login,
      data,
      withCredentials: true,
    });
  },
  logout() {
    return ajax({
      method: 'post',
      url: URL.accounts.logout,
      withCredentials: true,
    });
  },
  resetPassword(data: IResetPassword) {
    return ajax<IResetPasswordReturnType>({
      method: 'post',
      url: URL.accounts.resetPassword,
      data,
    });
  },
  confirmResetPassword(data: IConfirmResetPassword) {
    return ajax({
      method: 'post',
      url: URL.accounts.confirmResetPassword,
      data,
    });
  },
  getRegistrationAccountData() {
    return ajax({
      method: 'get',
      url: URL.accounts.getRegistrationAccountData,
      withCredentials: true,
    });
  },
};

export const baseApi = {
  createTokenContract(data: ICreateTokenContractData) {
    return ajax({
      method: 'post',
      url: URL.createTokenContract,
      data,
    });
  },
  createLostKeyContract(data: ICreateLostKeyContractData) {
    return ajax({
      method: 'post',
      url: URL.createLostKeyContract,
      data,
    });
  },
  createWillContract(data: ICreateWillContractData) {
    return ajax({
      method: 'post',
      url: URL.createWillContract,
      data,
    });
  },
  createCrowdsaleContract(data: ICreateCrowdsaleContractData) {
    return ajax({
      method: 'post',
      url: URL.createCrowdsaleContract,
      data,
    });
  },
  createWeddingContract(data: ICreateWeddingContractData) {
    return ajax({
      method: 'post',
      url: URL.createWeddingContract,
      data,
    });
  },

  getContracts(data: IGetContractsData) {
    const { walletAddress } = data;
    return ajax<TGetContractsReturnType>({
      method: 'get',
      url: `${URL.getContracts}${walletAddress}`,
    });
  },

  getFinishedWillContracts() {
    return ajax<IGetFinishedWillContractsReturnType>({
      method: 'get',
      url: URL.getFinishedWillContracts,
    });
  },
  getFinishedLostKeyContracts() {
    return ajax<IGetFinishedLostKeyContractsReturnType>({
      method: 'get',
      url: URL.getFinishedLostKeyContracts,
    });
  },

  getRates() {
    return ajax<TGetRatesReturnType>({
      method: 'GET',
      url: URL.getRates,
    });
  },
};

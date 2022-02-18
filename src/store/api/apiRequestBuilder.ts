import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { URL } from 'appConstants';

interface IContractData {
  tx_hash: string;
  contract_name: string;
}
interface ICreateTokenContractData extends IContractData {
  address_list: string[];
}
interface ICreateLostKeyContractData extends IContractData {
  mail_list: string[];
  owner_mail: string;
}
interface ICreateWillContractData extends ICreateLostKeyContractData {}
// TODO: to be updated in the next PR
interface ICreateCrowdsaleContractData {
  tx_hash: string;
  name: string;
}

const client: AxiosInstance = axios.create({
  baseURL: 'https://devcblock.rocknblock.io/api/v1/',
});

export default async function ajax(
  requestConfig: AxiosRequestConfig,
) {
  const apiCall = await client(requestConfig);
  return apiCall;
}

export const baseApi = {
  createTokenContract(data: ICreateTokenContractData): unknown {
    return ajax({
      method: 'post',
      url: URL.createTokenContract,
      data,
    });
  },
  createLostKeyContract(data: ICreateLostKeyContractData): unknown {
    return ajax({
      method: 'post',
      url: URL.createLostKeyContract,
      data,
    });
  },
  createWillContract(data: ICreateWillContractData): unknown {
    return ajax({
      method: 'post',
      url: URL.createWillContract,
      data,
    });
  },
  createCrowdsaleContract(data: ICreateCrowdsaleContractData): unknown {
    return ajax({
      method: 'post',
      url: URL.createCrowdsaleContract,
      data,
    });
  },
};

import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { URL } from 'appConstants';

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
  createTokenContract(data): unknown {
    return ajax({
      method: 'post',
      url: URL.createTokenContract,
      data,
    });
  },

};

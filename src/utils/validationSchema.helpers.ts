import * as Yup from 'yup';
import Web3 from 'web3';

export const ethereumAddressSchema = Yup
  .string()
  .test('is-ethereum-address', (value) => Web3.utils.isAddress(value));

import * as Yup from 'yup';
import Web3 from 'web3';
import { latinAndNumbers } from './regExps';

export const ethereumAddressSchema = Yup
  .string()
  .test('is-ethereum-address', (value) => Web3.utils.isAddress(value));

export const contractNameSchema = Yup.string().matches(latinAndNumbers).min(5);

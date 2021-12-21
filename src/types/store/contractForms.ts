import { ICrowdsaleContract } from './crowdsaleContract';
import { TokenContract } from './tokenContract';

export * from './crowdsaleContract';
export * from './tokenContract';

export type ContractFormsState = {
  tokenContract: TokenContract;
  crowdsaleContract: ICrowdsaleContract;
};

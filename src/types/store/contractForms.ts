import { ICrowdsaleContract } from './crowdsaleContract';
import { TokenContract } from './tokenContract';
import { IWeddingContract } from './weddingContract';

export * from './crowdsaleContract';
export * from './tokenContract';
export * from './weddingContract';

export type ContractFormsState = {
  tokenContract: TokenContract;
  crowdsaleContract: ICrowdsaleContract;
  weddingContract: IWeddingContract;
};

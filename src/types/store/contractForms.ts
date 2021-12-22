import { ICrowdsaleContract } from './crowdsaleContract';
import { TokenContract } from './tokenContract';
import { IWeddingContract } from './weddingContract';
import { ILostKeyContract } from './lostKeyContract';

export * from './crowdsaleContract';
export * from './tokenContract';
export * from './weddingContract';
export * from './lostKeyContract';

export type ContractFormsState = {
  tokenContract: TokenContract;
  crowdsaleContract: ICrowdsaleContract;
  weddingContract: IWeddingContract;
  lostKeyContract: ILostKeyContract;
};

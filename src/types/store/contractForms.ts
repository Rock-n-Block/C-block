import { ICrowdsaleContract } from './crowdsaleContract';
import { TokenContract } from './tokenContract';
import { IWeddingContract } from './weddingContract';
import { ILostKeyContract } from './lostKeyContract';
import { IWillContract } from './willContract';

export type ContractFormsState = {
  tokenContract: TokenContract;
  crowdsaleContract: ICrowdsaleContract;
  weddingContract: IWeddingContract;
  lostKeyContract: ILostKeyContract;
  willContract: IWillContract;
};

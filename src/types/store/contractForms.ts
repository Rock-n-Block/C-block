import { ICrowdsaleContract } from './crowdsaleContract';
import { TokenContract } from './tokenContract';
import { IWeddingContract } from './weddingContract';
import { ILostKeyContract } from './lostKeyContract';
import { IWillContract } from './willContract';

export type ContractAdditionalField = {
  additional: {
    contractCreationPrice: string;
  };
};
export * from './crowdsaleContract';
export * from './tokenContract';
export * from './weddingContract';
export * from './lostKeyContract';
export * from './willContract';

export type ContractFormsState = {
  tokenContract: TokenContract;
  crowdsaleContract: ICrowdsaleContract;
  weddingContract: IWeddingContract;
  lostKeyContract: ILostKeyContract;
  willContract: IWillContract;
};

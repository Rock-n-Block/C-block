import { ICrowdsaleContract } from './crowdsaleContract';
import { TokenContract } from './tokenContract';
import { IWeddingContract, ISpecificWeddingContractData } from './weddingContract';
import { ILostKeyContract, ISpecificLostKeyContractData } from './lostKeyContract';
import { IWillContract, ISpecificWillContractData } from './willContract';

export type TMyContracts =
  | ILostKeyContract
  | ICrowdsaleContract
  | IWeddingContract
  | IWillContract
  | TokenContract;

export type ContractFormsState = {
  tokenContract: TokenContract;
  crowdsaleContract: ICrowdsaleContract;
  weddingContract: IWeddingContract;
  lostKeyContract: ILostKeyContract;
  willContract: IWillContract;
};

export type TSpecificContractData =
  | {}
  | ISpecificWeddingContractData
  | ISpecificLostKeyContractData
  | ISpecificWillContractData;

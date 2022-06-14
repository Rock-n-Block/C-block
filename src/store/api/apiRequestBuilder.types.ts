import { TChainType } from 'types';

export interface IContractData {
  tx_hash: string;
  name: string;
  is_testnet: boolean;
}

interface IAddresses {
  addresses: Record<string, string>; // Map<ownerName, ownerAddress>
}

export interface ICreateTokenContractData extends IContractData, IAddresses {}
export interface IMailsMap {
  mails: Record<string, string>; // Map<email, ethAddress>
}
interface IMailsWithOwnerMail extends IMailsMap {
  owner_mail: string;
}
export interface ICreateLostKeyContractData extends IContractData, IMailsWithOwnerMail {}
export interface ICreateWillContractData extends ICreateLostKeyContractData {}
export interface ICreateCrowdsaleContractData extends IContractData {}
export interface ICreateWeddingContractData extends IContractData, IMailsMap {}

export interface IGetContractsData {
  walletAddress: string;
}

interface IGetContractsBaseContractData {
  address?: string;
}
export interface IGetContractsTokenContract
  extends ICreateTokenContractData,
  IGetContractsBaseContractData {
  contract_type?: string;
}
export interface IGetContractsLostKeyContract
  extends ICreateLostKeyContractData,
  IGetContractsBaseContractData {}
export interface IGetContractsWillContract
  extends ICreateWillContractData,
  IGetContractsBaseContractData {}
export interface IGetContractsCrowdsaleContract
  extends ICreateCrowdsaleContractData,
  IGetContractsBaseContractData {}
export interface IGetContractsWeddingContract
  extends ICreateWeddingContractData,
  IGetContractsBaseContractData {}

export type TGetContracts =
  & IGetContractsTokenContract
  & IGetContractsLostKeyContract
  & IGetContractsWillContract
  & IGetContractsCrowdsaleContract
  & IGetContractsWeddingContract;
export interface IGetContractsReturnType {
  tokens: IGetContractsTokenContract[];
  lostkeys: IGetContractsLostKeyContract[];
  lastwills: IGetContractsWillContract[];
  crowdsales: IGetContractsCrowdsaleContract[];
  weddings: IGetContractsWeddingContract[];
}
export type TGetContractsReturnType = {
  [chainType in TChainType]: IGetContractsReturnType;
};

// lastwill_finished/ & lostkey_finished/ endpoints' types
interface IAddress {
  address: string;
}
export interface IFinishedWillContract extends IAddress, IMailsWithOwnerMail {}
export interface IGetFinishedWillContractsReturnType {
  lastwills: {
    [chainType in TChainType]: IFinishedWillContract[];
  }
}

export interface IFinishedLostKeyContract extends IFinishedWillContract {}
export interface IGetFinishedLostKeyContractsReturnType {
  lostkeys: {
    [chainType in TChainType]: IFinishedLostKeyContract[];
  }
}

interface IGetRatesReturnType {
  rate: string;
  symbol: string;
  name: string;
}
export type TGetRatesReturnType = IGetRatesReturnType[];

export type TGetIsMainnetDisabledReturnType = {
  mainnet_enabled: boolean;
};
export type TSetIsMainnetDisabledData = TGetIsMainnetDisabledReturnType;

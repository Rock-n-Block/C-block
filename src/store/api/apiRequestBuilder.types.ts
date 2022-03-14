export interface IContractData {
  tx_hash: string;
  name: string;
}

interface IAddresses {
  addresses: Record<string, string>; // Map<ownerName, ownerAddress>
}

export interface ICreateTokenContractData extends IContractData, IAddresses {}
interface IMails {
  mails: string[];
}
interface IMailsWithOwnerMail extends IMails {
  owner_mail: string;
}
export interface ICreateLostKeyContractData extends IContractData, IMailsWithOwnerMail {}
export interface ICreateWillContractData extends ICreateLostKeyContractData {}
export interface ICreateCrowdsaleContractData extends IContractData {}
export interface ICreateWeddingContractData extends IContractData, IMails {}
// export type TCreateContractsData =
//   | ICreateTokenContractData
//   | ICreateLostKeyContractData
//   | ICreateWillContractData
//   | ICreateCrowdsaleContractData
//   | ICreateWeddingContractData;

export interface IGetContractsData {
  walletAddress: string;
}

interface IGetContractsBaseContractData {
  address?: string;
  test_node?: boolean;
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

// lastwill_finished/ & lostkey_finished/ endpoints' types
interface IAddress {
  address: string;
}
export interface IFinishedWillContract extends IAddress, IMailsWithOwnerMail {}
export interface IGetFinishedWillContractsReturnType {
  lastwills: IFinishedWillContract[];
}

export interface IFinishedLostKeyContract extends IFinishedWillContract {}
export interface IGetFinishedLostKeyContractsReturnType {
  lostkeys: IFinishedLostKeyContract[];
}

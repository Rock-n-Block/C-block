export interface IContractData {
  tx_hash: string;
  name: string;
}
export interface ICreateTokenContractData extends IContractData {
  addresses: string[];
}
export interface ICreateLostKeyContractData extends IContractData {
  mails: string[];
  owner_mail: string;
}
export interface ICreateWillContractData extends ICreateLostKeyContractData {}
export interface ICreateCrowdsaleContractData extends IContractData {}
export interface ICreateWeddingContractData extends IContractData {
  mails: string[];
}

export interface IGetContractsData {
  walletAddress: string;
}

interface IGetContractsBaseContractData {
  address?: string;
  test_node?: boolean;
}
export interface IGetContractsTokenContract extends ICreateTokenContractData, IGetContractsBaseContractData {
  contract_type?: string;
}
// TODO: split in lostkey/lastwill
export interface IGetContractsProbateContract extends ICreateLostKeyContractData, IGetContractsBaseContractData {}
export interface IGetContractsCrowdsaleContract extends ICreateCrowdsaleContractData, IGetContractsBaseContractData {}
export interface IGetContractsWeddingContract extends ICreateWeddingContractData, IGetContractsBaseContractData {}

export interface IGetContractsReturnType {
  tokens: IGetContractsTokenContract[];
  probates: IGetContractsProbateContract[];
  crowdsales: IGetContractsCrowdsaleContract[];
  weddings: IGetContractsWeddingContract[];
}

export interface IGetContractsSplittedProbatesReturnType extends Omit<IGetContractsReturnType, 'probates'> {
  lostkeys: IGetContractsProbateContract[];
  lastwills: IGetContractsProbateContract[];
}

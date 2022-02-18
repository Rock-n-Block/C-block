import { ContractAdditionalField, TPingIntervalUnit } from '.';

export interface IWillContractDynamicForm {
  reserveAddress: string;
  email: string;
  percents: string;
}

export interface IWillContract extends ContractAdditionalField {
  contractName: string;
  managementAddress: string;
  reservesConfigs: IWillContractDynamicForm[];
  pingIntervalAsValue: string;
  pingIntervalAsDateUnits: TPingIntervalUnit;
  rewardAmount: string;
  ownerEmail: string;
}

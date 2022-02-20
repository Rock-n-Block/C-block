import { ContractAdditionalField } from './contractForms.shared';
import { TPingIntervalUnit } from './globals';

export interface ILostKeyContractDynamicForm {
  reserveAddress: string;
  email: string;
  percents: string;
}

export interface ILostKeyContract extends ContractAdditionalField {
  contractName: string;
  managementAddress: string;
  reservesConfigs: ILostKeyContractDynamicForm[];
  pingIntervalAsValue: string;
  pingIntervalAsDateUnits: TPingIntervalUnit;
  rewardAmount: string;
  ownerEmail: string;
}

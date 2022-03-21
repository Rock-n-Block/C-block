import { ContractAdditionalField } from './contractForms.shared';
import { TPingIntervalUnit } from './globals';
import { ISetUpModalTokenAddressField } from './setUpModal/storeTypes';

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

export interface ISpecificWillContractData {
  isLostKey: boolean;
  terminated: boolean;
  addresses: ISetUpModalTokenAddressField[];
}

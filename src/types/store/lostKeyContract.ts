import { TPingIntervalUnit } from '.';

export interface ILostKeyContractDynamicForm {
  reserveAddress: string;
  email: string;
  percents: string;
}

export interface ILostKeyContract {
  contractName: string;
  managementAddress: string;
  reservesConfigs: ILostKeyContractDynamicForm[];
  pingIntervalAsValue: string;
  pingIntervalAsDateUnits: TPingIntervalUnit;
  rewardAmount: string;
  ownerEmail: string;
}

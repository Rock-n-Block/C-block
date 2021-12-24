export interface ILostKeyContractDynamicForm {
  address: string;
  email: string;
  percents: string;
}

export interface ILostKeyContract {
  contractName: string;
  managementAddress: string;
  reservesConfigs: ILostKeyContractDynamicForm[];
  pingIntervalAsValue: string;
  pingIntervalAsDateUnits: string;
}

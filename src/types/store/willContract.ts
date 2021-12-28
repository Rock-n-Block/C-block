export interface IWillContractDynamicForm {
  reserveAddress: string;
  email: string;
  percents: string;
}

export interface IWillContract {
  contractName: string;
  managementAddress: string;
  reservesConfigs: IWillContractDynamicForm[];
  pingIntervalAsValue: string;
  pingIntervalAsDateUnits: string;
}

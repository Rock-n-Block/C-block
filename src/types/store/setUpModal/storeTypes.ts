export interface ISetUpModalTokenAddress {
  address: string;
  allowance: string;
  isAdded: boolean;
}

export interface ISetUpModalTokenAddressField extends ISetUpModalTokenAddress {
  id: number;
}

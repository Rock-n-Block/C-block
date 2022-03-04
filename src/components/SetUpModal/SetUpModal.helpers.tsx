export interface ISetUpModalTokenAddress {
  address: string;
  allowance: string;
}

export interface ISetUpModalTokenAddressField extends ISetUpModalTokenAddress {
  id: number,
}

export const initTokensAddressesArr: ISetUpModalTokenAddressField[] = [
  {
    id: 0,
    address: '',
    allowance: '0',
  },
];

export const createAddressesArr = (
  tokensAddresses: ISetUpModalTokenAddress[],
) => tokensAddresses.map((item, id) => ({
  ...item,
  id,
})) as ISetUpModalTokenAddressField[];

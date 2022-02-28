export interface ISetUpModalTokenAddress {
  address: string;
  allowance: string;
}

export interface ISetUpModalTokenAddressField extends ISetUpModalTokenAddress {
  id: number,
}

export const incrementId = (addresses: ISetUpModalTokenAddressField[]) => {
  const lastIndex = addresses.length - 1;
  if (lastIndex >= 0) {
    return addresses[lastIndex].id + 1;
  }
  return 0;
};

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

export interface IGetFundsModalTokenAddressField {
  id: number;
  address: string;
}

export const incrementId = (addresses: IGetFundsModalTokenAddressField[]) => {
  const lastIndex = addresses.length - 1;
  if (lastIndex >= 0) {
    return addresses[lastIndex].id + 1;
  }
  return 0;
};

export const fieldsHelper: IGetFundsModalTokenAddressField[] = [
  {
    id: 0,
    address: '',
  },
];

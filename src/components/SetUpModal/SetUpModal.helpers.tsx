interface AddressesI {
  address: string;
  id: number,
}

export type AddressesT = AddressesI[];

export const addressesArr: AddressesT = [
  {
    address: '',
    id: 0,
  },
];

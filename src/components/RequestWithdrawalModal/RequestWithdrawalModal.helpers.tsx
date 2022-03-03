export type TFieldKeys = 'tokenAddress' | 'amount' | 'addressToSend';
export interface IField {
  key: TFieldKeys;
  label: string;
}

export interface IModalFieldsState extends Record<TFieldKeys, string> {}

export const fieldsHelper: IField[] = [
  {
    key: 'tokenAddress',
    label: 'Token address',
  },
  {
    key: 'amount',
    label: 'Amount',
  },
  {
    key: 'addressToSend',
    label: 'Sent to',
  },
];

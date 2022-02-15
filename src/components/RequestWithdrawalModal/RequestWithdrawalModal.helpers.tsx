export interface IField {
  id: number;
  label: string;
  value: string;
}

export const fieldsHelper: IField[] = [
  {
    id: 0,
    label: 'Token address',
    value: '0x12A64F3D1194b084CBA4829',
  },
  {
    id: 1,
    label: 'Amount',
    value: '35',
  },
  {
    id: 2,
    label: 'Sent to',
    value: '0x12A64F3D1194b084CBA4829',
  },
];

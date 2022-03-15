import type { Dispatch as DispatchReact } from 'react';
import { ContractFormsState } from './contractForms';
import { UserState } from './user';
// eslint-disable-next-line import/no-cycle
import { MyContractsState } from './myContracts';
import { EarnState } from './earn';
import { ModalsState } from './modals';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T, P = any, M = void> = { type: T; payload?: P; meta?: M };
export type Dispatch = DispatchReact<{ type: string }>;

export type State = {
  user: UserState,
  contractForms: ContractFormsState,
  myContracts: MyContractsState,
  earn: EarnState,
  modals: ModalsState,
};

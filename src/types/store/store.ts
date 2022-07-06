import type { Dispatch as DispatchReact } from 'react';
import { ContractFormsState } from './contractForms';
import { UserState } from './user';
import { MyContractsState } from './myContracts';
import { EarnState } from './earn';
import { ModalsState } from './modals';
import { UIState } from './ui';
import { AdminState } from './admin';
import { RatesState } from './rates';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T, P = any, M = void> = { type: T; payload?: P; meta?: M };
export type Dispatch = DispatchReact<{ type: string }>;

export type State = {
  ui: UIState;
  user: UserState;
  contractForms: ContractFormsState;
  myContracts: MyContractsState;
  earn: EarnState;
  modals: ModalsState;
  admin: AdminState;
  rates: RatesState;
};

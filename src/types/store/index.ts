import type { Dispatch as DispatchReact } from 'react';
import { ContractFormsState } from './contractForms';
import { UserState } from './user';

export * from './ui';
export * from './user';
export * from './contractForms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T, P = any, M = void> = { type: T; payload?: P; meta?: M };
export type Dispatch = DispatchReact<{ type: string }>;

export type State = {
  user: UserState,
  contractForms: ContractFormsState,
};

export * from './actions';
export * from './globals';

import { TGetUserDataReturnType } from './auth.types';

export type TGetUsersListReturnType = TGetUserDataReturnType[];
export type IAdminSendEmail = {
  id: number;
  message: string;
};
export type ISetIsFrozenUser = {
  id: number;
  freezed: boolean;
};

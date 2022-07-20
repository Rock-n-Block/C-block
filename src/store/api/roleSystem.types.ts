import { TGetUserDataReturnType, PermissionsBackend } from './auth.types';

export type TGetUsersListReturnType = TGetUserDataReturnType[];
export type IAdminSendEmail = {
  id: number;
  message: string;
};
export type ISetIsFrozenUser = {
  id: number;
  freezed: boolean;
};
export type IUpdatePermissions = {
  id: number;
} & Partial<PermissionsBackend>;

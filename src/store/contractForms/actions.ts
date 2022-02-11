/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';
import actionTypes from './actionTypes';

// TODO: move to types
export const createTokenContract = createAction<{ provider: any }>(actionTypes.CREATE_TOKEN_CONTRACT);
export const approve = createAction<{ provider: any, spender: string, tokenAddress: string, amount: string | number }>(actionTypes.APPROVE);

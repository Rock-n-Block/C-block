import { IFinishedLostKeyContract, IFinishedWillContract } from 'store/api/apiRequestBuilder.types';

export type TFinishedContract = (IFinishedWillContract | IFinishedLostKeyContract) & {
  rewardAmount?: string;
};

export type EarnState = {
  items: TFinishedContract[];
};

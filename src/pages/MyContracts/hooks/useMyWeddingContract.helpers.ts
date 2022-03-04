import { IWeddingContractActiveWithdrawalProposal } from 'types';

export enum DivorceStatusesEnum {
  DIVORCE_NOT_STARTED = 'DIVORCE_NOT_STARTED',
  DIVORCE_PENDING = 'DIVORCE_PENDING',
  DIVORCE_DONE = 'DIVORCE_DONE'
}

export enum WithdrawalStatusesEnum {
  WITHDRAWAL_NOT_STARTED = 'WITHDRAWAL_NOT_STARTED',
  WITHDRAWAL_PENDING = 'WITHDRAWAL_PENDING',
  WITHDRAWAL_DONE = 'WITHDRAWAL_DONE'
}

export const getDivorceStatus = (
  divorceTimestamp: number,
): DivorceStatusesEnum => {
  if (divorceTimestamp === 0) {
    return DivorceStatusesEnum.DIVORCE_NOT_STARTED;
  }

  const nowTimestamp = Math.floor(Date.now() / 1000);
  if (nowTimestamp <= divorceTimestamp) {
    return DivorceStatusesEnum.DIVORCE_PENDING;
  }
  return DivorceStatusesEnum.DIVORCE_DONE;
};

export const getWithdrawalStatus = (
  withdrawalProposalPending: boolean,
  activeWithdrawalProposal: IWeddingContractActiveWithdrawalProposal,
): WithdrawalStatusesEnum => {
  if (!withdrawalProposalPending) {
    return WithdrawalStatusesEnum.WITHDRAWAL_NOT_STARTED;
  }

  if (withdrawalProposalPending && activeWithdrawalProposal.timestamp === '0') {
    return WithdrawalStatusesEnum.WITHDRAWAL_DONE;
  }
  return WithdrawalStatusesEnum.WITHDRAWAL_PENDING;
};

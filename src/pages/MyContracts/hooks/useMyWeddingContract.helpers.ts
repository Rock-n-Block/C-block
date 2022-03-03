type TGetDivorceStatusReturnType = 'DIVORCE_NOT_STARTED' | 'DIVORCE_PENDING' | 'DIVORCE_DONE';
export const getDivorceStatus = (divorceTimestamp: number): TGetDivorceStatusReturnType => {
  if (divorceTimestamp === 0) {
    return 'DIVORCE_NOT_STARTED';
  }

  const nowTimestamp = Math.floor(Date.now() / 1000);
  if (nowTimestamp <= divorceTimestamp) {
    return 'DIVORCE_PENDING';
  }
  return 'DIVORCE_DONE';
};

type IGetWithdrawalStatusReturnType = 'WITHDRAWAL_NOT_STARTED' | 'WITHDRAWAL_DONE' | 'WITHDRAWAL_PENDING';
export const getWithdrawalStatus = (
  withdrawalProposalPending: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeWithdrawalProposal: any,
): IGetWithdrawalStatusReturnType => {
  if (!withdrawalProposalPending) {
    return 'WITHDRAWAL_NOT_STARTED';
  }

  // const nowTimestamp = Math.floor(Date.now() / 1000);
  if (withdrawalProposalPending && !activeWithdrawalProposal) {
    return 'WITHDRAWAL_DONE';
  }
  return 'WITHDRAWAL_PENDING';
};

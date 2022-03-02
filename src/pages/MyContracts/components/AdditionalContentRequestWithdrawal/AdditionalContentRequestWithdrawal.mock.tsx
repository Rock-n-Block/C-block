import { ComponentProps } from 'react';
import { AdditionalContentRequestWithdrawal } from './AdditionalContentRequestWithdrawal';

export const mockedProps: ComponentProps<typeof AdditionalContentRequestWithdrawal> = {
  countdownUntilTimestamp: 1646222940,
  onApprove() {},
  onReject() {},
};

import { ComponentProps } from 'react';
import { AdditionalContentRequestDivorce } from './AdditionalContentRequestDivorce';

export const mockedProps: ComponentProps<typeof AdditionalContentRequestDivorce> = {
  countdownUntilTimestamp: 1646222940,
  onApprove() {},
  onReject() {},
};

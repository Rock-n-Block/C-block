import { ComponentProps } from 'react';

import { BurnTokenModal } from './BurnTokenModal';

export const mockedProps: ComponentProps<typeof BurnTokenModal> = {
  open: true,
  contractAddress: '',
  decimals: 0,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  setIsModalOpen() {},
};

import { ComponentProps } from 'react';
import { ConfirmStatusModal } from './ConfirmStatusModal';

export const mockedProps: ComponentProps<typeof ConfirmStatusModal> = {
  open: true,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  date: new Date(),
  setIsModalOpen() {},
  statusType: 'active',
};

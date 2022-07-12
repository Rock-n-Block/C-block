import { PasswordChangeModalProps } from './PasswordChangeModal';

export const mockedProps: PasswordChangeModalProps = {
  open: true,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  onAccept(): void {
    throw new Error('Function not implemented.');
  },
  setIsModalOpen() {},
};

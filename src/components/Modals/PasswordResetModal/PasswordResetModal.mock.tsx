import { PasswordResetModalProps } from './PasswordResetModal';

export const mockedProps: PasswordResetModalProps = {
  open: true,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  onAccept(): void {
    throw new Error('Function not implemented.');
  },
  setIsModalOpen() {},
};

import { PasswordResetByEmailModalProps } from './PasswordResetByEmailModal';

export const mockedProps: PasswordResetByEmailModalProps = {
  open: true,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  onSubmit(): void {
    throw new Error('Function not implemented.');
  },
  setIsModalOpen() {},
};

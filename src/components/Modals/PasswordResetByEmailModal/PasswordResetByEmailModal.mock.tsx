import { Props } from './PasswordResetByEmailModal';

export const mockedProps: Props = {
  open: true,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  onSubmit(): void {
    throw new Error('Function not implemented.');
  },
  setIsModalOpen() {},
};

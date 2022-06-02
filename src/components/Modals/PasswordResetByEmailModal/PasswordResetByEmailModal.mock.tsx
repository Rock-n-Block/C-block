import { Props } from './PasswordResetByEmailModal';

export const mockedProps: Props = {
  open: true,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  onAccept(): void {
    throw new Error('Function not implemented.');
  },
  setIsModalOpen() {},
};

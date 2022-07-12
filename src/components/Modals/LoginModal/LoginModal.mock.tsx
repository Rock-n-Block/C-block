import { LoginModalProps } from './LoginModal';

export const mockedProps: LoginModalProps = {
  open: true,
  mode: 'login',
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  setIsModalOpen() {},
};

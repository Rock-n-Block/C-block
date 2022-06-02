import { Props } from './LoginModal';

export const mockedProps: Props = {
  open: true,
  mode: 'login',
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  onAccept(): void {
    throw new Error('Function not implemented.');
  },
  setIsModalOpen() {},
};

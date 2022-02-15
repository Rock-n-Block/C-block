import { Props } from './GetFundsModal';

export const getFundsModalPropsMocked: Props = {
  open: true,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  onAccept(): void {
    throw new Error('Function not implemented.');
  },
  setIsModalOpen() {},
};

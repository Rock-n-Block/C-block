import { DisclaimerModalProps } from './DisclaimerModal';

export const disclaimerModalPropsMocked: DisclaimerModalProps = {
  open: false,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  onAccept(): void {
    throw new Error('Function not implemented.');
  },
};

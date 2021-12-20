import { PaymentModalProps } from './PaymentModal';

export const paymentModalPropsMocked: PaymentModalProps = {
  open: false,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  onAccept(): void {
    throw new Error('Function not implemented.');
  },
  paymentAmount: '',
};

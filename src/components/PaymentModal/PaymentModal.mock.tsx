import { PaymentModalProps } from './PaymentModal';

export const paymentModalPropsMocked: PaymentModalProps = {
  open: true,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  onAccept(): void {
    throw new Error('Function not implemented.');
  },
  paymentAmount: '32423.4354',
};

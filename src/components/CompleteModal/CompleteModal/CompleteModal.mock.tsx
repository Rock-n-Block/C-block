export const paymentModalPropsMocked = {
  open: false,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  onAccept(): void {
    throw new Error('Function not implemented.');
  },
  paymentAmount: '',
};

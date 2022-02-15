import { CompleteModalProps } from './CompleteModal';

export const mockedProps: CompleteModalProps = {
  open: true,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  result: true,
};

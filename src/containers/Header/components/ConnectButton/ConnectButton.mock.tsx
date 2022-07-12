import { ConnectButtonProps } from './ConnectButton';

export const connectButtonPropsMocked: ConnectButtonProps = {
  handleModal(): void {
    throw new Error('Function not implemented.');
  },
  address: '0x123',
};

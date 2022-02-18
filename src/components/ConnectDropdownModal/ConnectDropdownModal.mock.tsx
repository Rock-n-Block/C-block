import { noop } from 'lodash';

import { ConnectDropdownModalProps } from './ConnectDropdownModal';

export const connectDropdownModalPropsMocked: ConnectDropdownModalProps = {
  open: true,
  onClose: noop,
  address: '',
};

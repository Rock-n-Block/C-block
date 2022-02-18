import { noop } from 'lodash';
import { ModalProps } from './Modal';

export const modalPropsMocked: ModalProps = {
  title: 'title',
  open: true,
  onClose: noop,
};

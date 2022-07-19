import { SendEmailModalProps } from './SendEmailModal';

export const mockedProps: SendEmailModalProps = {
  open: true,
  onClose(): void {
    throw new Error('Function not implemented.');
  },
  setIsModalOpen() {},
  emailTo: 'testmail@mail.com',
};

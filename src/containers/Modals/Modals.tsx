import React, { FC } from 'react';
import modalsSelector from 'store/modals/selectors';
import {
  CompleteModal,
  FullscreenLoader,
  SendTransactionModal,
} from 'components';
import { useShallowSelector } from 'hooks';
import { Modals } from 'types';
import { PasswordResetByEmailModal } from 'components/Modals/PasswordResetByEmailModal';
import { PasswordResetModal } from 'components/Modals/PasswordResetModal';
import { LoginModal } from 'components/Modals/LoginModal';

export const ModalsContainer: FC = () => {
  const activeModal = useShallowSelector(modalsSelector.getActiveModal);
  const isOpen = useShallowSelector(modalsSelector.getIsOpenModal);

  if (activeModal === Modals.PasswordResetByEmail) {
    return <PasswordResetByEmailModal open={isOpen} />;
  }

  if (activeModal === Modals.PasswordReset) {
    return <PasswordResetModal open={isOpen} />;
  }

  if (activeModal === Modals.Login) {
    return <LoginModal open={isOpen} mode="login" />;
  }

  if (activeModal === Modals.SignUp) {
    return <LoginModal open={isOpen} mode="signup" />;
  }

  if (activeModal === Modals.FullscreenLoader) {
    return isOpen && <FullscreenLoader />;
  }

  if (activeModal === Modals.SendTxPending) {
    return <SendTransactionModal open={isOpen} />;
  }

  if (activeModal === Modals.SendTxSuccess) {
    return <CompleteModal open={isOpen} result />;
  }

  if (activeModal === Modals.SendTxRejected) {
    return <CompleteModal open={isOpen} result={false} />;
  }
  return null;
};

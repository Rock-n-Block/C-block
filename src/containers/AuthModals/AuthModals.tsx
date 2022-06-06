import React, { FC, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import modalsSelector from 'store/modals/selectors';
import { useAuthHandlers, useShallowSelector } from 'hooks';
import { Modals } from 'types';
import { PasswordResetByEmailModal } from 'components/Modals/PasswordResetByEmailModal';
import { PasswordResetModal } from 'components/Modals/PasswordResetModal';
import { LoginModal } from 'components/Modals/LoginModal';
import { closeAllModals, closeModal } from 'store/modals/reducer';

export const AuthModalsContainer: FC = () => {
  const isPasswordResetByEmailOpen = useShallowSelector(
    modalsSelector.selectModalState(Modals.PasswordResetByEmail),
  );
  const isPasswordResetOpen = useShallowSelector(
    modalsSelector.selectModalState(Modals.PasswordReset),
  );
  const isLoginOpen = useShallowSelector(
    modalsSelector.selectModalState(Modals.Login),
  );
  const isSignUpOpen = useShallowSelector(
    modalsSelector.selectModalState(Modals.SignUp),
  );

  const {
    handlePasswordResetByEmail,
  } = useAuthHandlers();
  const dispatch = useDispatch();
  const handleClosePasswordResetByEmailModal = useCallback(() => {
    dispatch(closeModal(Modals.PasswordResetByEmail));
  }, [dispatch]);
  const handleClosePasswordResetModal = useCallback(() => {
    dispatch(closeModal(Modals.PasswordReset));
  }, [dispatch]);
  const handleCloseLoginModal = useCallback(() => {
    dispatch(closeModal(Modals.Login));
  }, [dispatch]);
  const handleCloseSignUpModal = useCallback(() => {
    dispatch(closeModal(Modals.SignUp));
  }, [dispatch]);

  const location = useLocation();

  useEffect(() => {
    dispatch(closeAllModals());
  }, [dispatch, location.pathname]);

  return (
    <>
      <PasswordResetByEmailModal
        open={isPasswordResetByEmailOpen}
        onSubmit={handlePasswordResetByEmail}
        onClose={handleClosePasswordResetByEmailModal}
      />
      <PasswordResetModal open={isPasswordResetOpen} onClose={handleClosePasswordResetModal} />
      <LoginModal open={isLoginOpen} mode="login" onClose={handleCloseLoginModal} />
      <LoginModal open={isSignUpOpen} mode="signup" onClose={handleCloseSignUpModal} />
    </>
  );
};

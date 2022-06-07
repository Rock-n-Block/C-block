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
import { LoadingModal } from 'components/Modals';

export const AuthModalsContainer: FC = () => {
  const isPasswordResetByEmailOpen = useShallowSelector(
    modalsSelector.selectModalState(Modals.PasswordResetByEmail),
  );
  const isPasswordResetByEmailPending = useShallowSelector(
    modalsSelector.selectModalState(Modals.PasswordResetByEmailPending),
  );
  const isPasswordResetOpen = useShallowSelector(
    modalsSelector.selectModalState(Modals.PasswordReset),
  );
  const isPasswordResetPending = useShallowSelector(
    modalsSelector.selectModalState(Modals.PasswordResetPending),
  );
  const isLoginOpen = useShallowSelector(
    modalsSelector.selectModalState(Modals.Login),
  );
  const isSignUpOpen = useShallowSelector(
    modalsSelector.selectModalState(Modals.SignUp),
  );
  const isSignUpPending = useShallowSelector(
    modalsSelector.selectModalState(Modals.SignUpPending),
  );

  const {
    handlePasswordResetByEmail,
    handlePasswordReset,
    handleSignUp,
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
      <LoadingModal open={isPasswordResetByEmailPending} text="Sending password reset e-mail" />
      <PasswordResetModal
        open={isPasswordResetOpen}
        onAccept={handlePasswordReset}
        onClose={handleClosePasswordResetModal}
      />
      <LoadingModal open={isPasswordResetPending} text="Setting new password" />
      <LoginModal
        open={isLoginOpen}
        mode="login"
        // onLogin={handleLogin}
        onSignUp={handleSignUp}
        onClose={handleCloseLoginModal}
      />
      <LoginModal
        open={isSignUpOpen}
        mode="signup"
        // onLogin={handleLogin}
        onSignUp={handleSignUp}
        onClose={handleCloseSignUpModal}
      />
      <LoadingModal open={isSignUpPending} text="Signing up" />
    </>
  );
};

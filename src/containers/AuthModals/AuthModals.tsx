import React, { FC, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import modalsSelector from 'store/modals/selectors';
import { useAuthHandlers, useShallowSelector } from 'hooks';
import { Modals } from 'types';
import { PasswordResetByEmailModal } from 'components/Modals/PasswordResetByEmailModal';
import { PasswordResetModal } from 'components/Modals/PasswordResetModal';
import { PasswordChangeModal } from 'components/Modals/PasswordChangeModal';
import { LoginModal } from 'components/Modals/LoginModal';
import { closeAllModals, closeModal, setActiveModal } from 'store/modals/reducer';
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
  const isPasswordChangeOpen = useShallowSelector(
    modalsSelector.selectModalState(Modals.PasswordChange),
  );
  const isPasswordChangePending = useShallowSelector(
    modalsSelector.selectModalState(Modals.PasswordChangePending),
  );
  const isLoginOpen = useShallowSelector(
    modalsSelector.selectModalState(Modals.Login),
  );
  const isLoginPending = useShallowSelector(
    modalsSelector.selectModalState(Modals.LoginPending),
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
    handlePasswordChange,
    handleSignUp,
    handleLogin,
  } = useAuthHandlers();
  const dispatch = useDispatch();
  const handleClosePasswordResetByEmailModal = useCallback(() => {
    dispatch(setActiveModal({
      modals: {
        [Modals.Login]: true,
        [Modals.PasswordResetByEmail]: false,
      },
    }));
  }, [dispatch]);
  const handleClosePasswordResetModal = useCallback(() => {
    dispatch(closeModal(Modals.PasswordReset));
  }, [dispatch]);
  const handleClosePasswordChangeModal = useCallback(() => {
    dispatch(closeModal(Modals.PasswordChange));
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
      <PasswordChangeModal
        open={isPasswordChangeOpen}
        onAccept={handlePasswordChange}
        onClose={handleClosePasswordChangeModal}
      />
      <LoadingModal open={isPasswordChangePending} text="Setting new password" />
      <LoginModal
        open={isLoginOpen}
        mode="login"
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onClose={handleCloseLoginModal}
      />
      <LoadingModal open={isLoginPending} text="Log in" />
      <LoginModal
        open={isSignUpOpen}
        mode="signup"
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onClose={handleCloseSignUpModal}
      />
      <LoadingModal open={isSignUpPending} text="Signing up" />
    </>
  );
};

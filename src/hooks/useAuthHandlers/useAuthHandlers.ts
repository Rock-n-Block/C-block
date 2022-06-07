import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { resetPassword, confirmResetPassword } from 'store/user/auth/actions';
import authActionTypes from 'store/user/auth/actionTypes';
import uiSelector from 'store/ui/selectors';
import { closeModal, setActiveModal } from 'store/modals/reducer';

import useShallowSelector from 'hooks/useShallowSelector';

import { Modals, RequestStatus } from 'types';
import { routes } from 'appConstants';
import { setNotification } from 'utils';

export const useAuthHandlers = () => {
  const dispatch = useDispatch();
  const handlePasswordResetByEmail = useCallback((email: string) => {
    dispatch(resetPassword({
      email,
    }));
  }, [dispatch]);

  const location = useLocation();
  const handlePasswordReset = useCallback((password: string) => {
    // should extract first 2 paths to compare it with confirm reset password first two paths
    // and then must extract 3rd and 4th path (uid & token)
    const [, firstPath, secondPath, uid, token] = location.pathname.split('/');
    const [, firstRoutePath, secondRoutePath] = routes['password/reset/:uid/:token'].root.split('/');
    if (firstPath !== firstRoutePath || secondPath !== secondRoutePath) {
      setNotification({
        type: 'error',
        message: 'Error occured while resetting password. Check if link that sent to email is valid',
      });
      return;
    }
    dispatch(
      confirmResetPassword({
        password,
        uid,
        token,
      }),
    );
  }, [dispatch, location.pathname]);

  const resetPasswordRequestStatus = useShallowSelector(
    uiSelector.getProp(authActionTypes.USER_AUTH_RESET_PASSWORD),
  );
  const confirmResetPasswordRequestStatus = useShallowSelector(
    uiSelector.getProp(authActionTypes.USER_AUTH_CONFIRM_RESET_PASSWORD),
  );

  useEffect(() => {
    if (resetPasswordRequestStatus === RequestStatus.REQUEST) {
      dispatch(setActiveModal({
        modals: {
          [Modals.PasswordResetByEmailPending]: true,
        },
      }));
    }
  }, [dispatch, resetPasswordRequestStatus]);
  useEffect(() => {
    if (confirmResetPasswordRequestStatus === RequestStatus.REQUEST) {
      dispatch(setActiveModal({
        modals: {
          [Modals.PasswordResetPending]: true,
        },
      }));
    }
  }, [dispatch, confirmResetPasswordRequestStatus]);

  useEffect(() => {
    if (resetPasswordRequestStatus === RequestStatus.SUCCESS ||
      resetPasswordRequestStatus === RequestStatus.ERROR) {
      dispatch(closeModal(Modals.PasswordResetByEmailPending));
    }
  }, [dispatch, resetPasswordRequestStatus]);
  useEffect(() => {
    if (confirmResetPasswordRequestStatus === RequestStatus.SUCCESS ||
      confirmResetPasswordRequestStatus === RequestStatus.ERROR) {
      dispatch(closeModal(Modals.PasswordResetPending));
    }
  }, [dispatch, confirmResetPasswordRequestStatus]);

  return {
    handlePasswordResetByEmail,
    handlePasswordReset,
  };
};

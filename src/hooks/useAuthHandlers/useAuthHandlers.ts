import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  resetPassword, confirmResetPassword, changePassword, registerAccount, login, checkAuthentication,
} from 'store/user/auth/actions';
import authActionTypes from 'store/user/auth/actionTypes';
import uiSelector from 'store/ui/selectors';
import { closeModal, setActiveModal } from 'store/modals/reducer';
import apiActions from 'store/ui/actions';

import useShallowSelector from 'hooks/useShallowSelector';

import { Modals, RequestStatus } from 'types';
import { routes } from 'appConstants';
import { setNotification } from 'utils';
import { useWeb3Provider } from 'hooks/walletService';

type EmailAndPassword = { email: string; password: string; };
type HandleSignUpArgs = EmailAndPassword & {
  confirmPassword: string;
};
type HandleLoginArgs = EmailAndPassword;

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
        message: 'Error occurred while resetting password. Check if link that sent to email is valid',
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

  const handlePasswordChange = useCallback((oldPassword: string, password: string) => {
    dispatch(
      changePassword({
        oldPassword,
        password,
      }),
    );
  }, [dispatch]);

  const { getDefaultProvider } = useWeb3Provider();
  const handleSignUp = useCallback(
    ({
      email,
      password,
      confirmPassword,
    }: HandleSignUpArgs) => {
      dispatch(
        registerAccount({
          provider: getDefaultProvider(),
          email,
          password1: password,
          password2: confirmPassword,
        }),
      );
    }, [dispatch, getDefaultProvider],
  );

  const handleLogin = useCallback(({ email, password }: HandleLoginArgs) => {
    dispatch(
      login({
        email,
        password,
      }),
    );
  }, [dispatch]);

  const resetPasswordRequestStatus = useShallowSelector(
    uiSelector.getProp(authActionTypes.USER_AUTH_RESET_PASSWORD),
  );
  const confirmResetPasswordRequestStatus = useShallowSelector(
    uiSelector.getProp(authActionTypes.USER_AUTH_CONFIRM_RESET_PASSWORD),
  );
  const changePasswordRequestStatus = useShallowSelector(
    uiSelector.getProp(authActionTypes.USER_AUTH_CHANGE_PASSWORD),
  );
  const registerAccountRequestStatus = useShallowSelector(
    uiSelector.getProp(authActionTypes.USER_AUTH_REGISTER_ACCOUNT),
  );
  const loginRequestStatus = useShallowSelector(
    uiSelector.getProp(authActionTypes.USER_AUTH_LOGIN),
  );

  // Handle modals pending state
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
    if (changePasswordRequestStatus === RequestStatus.REQUEST) {
      dispatch(setActiveModal({
        modals: {
          [Modals.PasswordChangePending]: true,
        },
      }));
    }
  }, [dispatch, changePasswordRequestStatus]);
  useEffect(() => {
    if (registerAccountRequestStatus === RequestStatus.REQUEST) {
      dispatch(setActiveModal({
        modals: {
          [Modals.SignUpPending]: true,
        },
      }));
    }
  }, [dispatch, registerAccountRequestStatus]);
  useEffect(() => {
    if (loginRequestStatus === RequestStatus.REQUEST) {
      dispatch(setActiveModal({
        modals: {
          [Modals.LoginPending]: true,
        },
      }));
    }
  }, [dispatch, loginRequestStatus]);

  // Handle modals' result state
  useEffect(() => {
    if (resetPasswordRequestStatus === RequestStatus.SUCCESS ||
      resetPasswordRequestStatus === RequestStatus.ERROR) {
      dispatch(closeModal(Modals.PasswordResetByEmailPending));
    }
  }, [dispatch, resetPasswordRequestStatus]);
  useEffect(() => {
    if (resetPasswordRequestStatus === RequestStatus.SUCCESS) {
      setTimeout(() => {
        dispatch(setActiveModal({
          modals: {
            [Modals.Login]: true,
            [Modals.PasswordResetByEmail]: false,
          },
        }));
      }, 1000);
    }
  }, [dispatch, resetPasswordRequestStatus]);
  useEffect(() => {
    if (confirmResetPasswordRequestStatus === RequestStatus.SUCCESS ||
      confirmResetPasswordRequestStatus === RequestStatus.ERROR) {
      dispatch(closeModal(Modals.PasswordResetPending));
    }
  }, [dispatch, confirmResetPasswordRequestStatus]);
  useEffect(() => {
    if (confirmResetPasswordRequestStatus === RequestStatus.SUCCESS) {
      dispatch(
        setActiveModal({
          modals: {
            [Modals.PasswordReset]: false,
            [Modals.Login]: true,
          },
        }),
      );
      dispatch(
        apiActions.reset(authActionTypes.USER_AUTH_CONFIRM_RESET_PASSWORD),
      );
    }
  }, [dispatch, confirmResetPasswordRequestStatus]);
  useEffect(() => {
    if (changePasswordRequestStatus === RequestStatus.SUCCESS ||
      changePasswordRequestStatus === RequestStatus.ERROR) {
      dispatch(closeModal(Modals.PasswordChangePending));
    }
  }, [dispatch, changePasswordRequestStatus]);
  useEffect(() => {
    if (changePasswordRequestStatus === RequestStatus.SUCCESS) {
      dispatch(setActiveModal({
        modals: {
          [Modals.PasswordChange]: false,
        },
      }));
    }
  }, [dispatch, changePasswordRequestStatus]);
  useEffect(() => {
    if (registerAccountRequestStatus === RequestStatus.SUCCESS ||
      registerAccountRequestStatus === RequestStatus.ERROR) {
      dispatch(closeModal(Modals.SignUpPending));
    }
  }, [dispatch, registerAccountRequestStatus]);
  useEffect(() => {
    if (loginRequestStatus === RequestStatus.SUCCESS ||
      loginRequestStatus === RequestStatus.ERROR) {
      dispatch(closeModal(Modals.LoginPending));
    }
  }, [dispatch, loginRequestStatus]);
  useEffect(() => {
    if (loginRequestStatus === RequestStatus.SUCCESS) {
      dispatch(setActiveModal({
        modals: {
          [Modals.Login]: false,
        },
      }));
      dispatch(
        apiActions.reset(authActionTypes.USER_AUTH_LOGIN),
      );
    }
  }, [dispatch, loginRequestStatus]);

  useEffect(() => {
    dispatch(
      checkAuthentication(),
    );
  }, [dispatch]);

  return {
    handlePasswordResetByEmail,
    handlePasswordReset,
    handlePasswordChange,
    handleSignUp,
    handleLogin,
  };
};

import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { resetPassword } from 'store/user/auth/actions';
import authActionTypes from 'store/user/auth/actionTypes';
import uiSelector from 'store/ui/selectors';
import { closeModal, setActiveModal } from 'store/modals/reducer';

import useShallowSelector from 'hooks/useShallowSelector';

import { Modals, RequestStatus } from 'types';

export const useAuthHandlers = () => {
  const dispatch = useDispatch();
  const handlePasswordResetByEmail = useCallback((email: string) => {
    dispatch(resetPassword({
      email,
    }));
  }, [dispatch]);

  const resetPasswordRequestStatus = useShallowSelector(
    uiSelector.getProp(authActionTypes.USER_AUTH_RESET_PASSWORD),
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
    if (resetPasswordRequestStatus === RequestStatus.SUCCESS ||
      resetPasswordRequestStatus === RequestStatus.ERROR) {
      dispatch(closeModal(Modals.PasswordResetByEmailPending));
    }
  }, [dispatch, resetPasswordRequestStatus]);

  return {
    handlePasswordResetByEmail,
  };
};

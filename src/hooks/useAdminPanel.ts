import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { checkIsAdmin } from 'store/admin/actions';
import userSelectors from 'store/user/selectors';
import uiSelector from 'store/ui/selectors';
import apiActions from 'store/ui/actions';
import adminActionTypes from 'store/admin/actionTypes';
import { Modals, RequestStatus } from 'types';
import { closeModal, setActiveModal } from 'store/modals/reducer';
import useShallowSelector from './useShallowSelector';
import { useWeb3Provider } from './walletService';

export const useAdminPanel = () => {
  const { address } = useShallowSelector(
    userSelectors.getUser,
  );
  const dispatch = useDispatch();
  const { getDefaultProvider } = useWeb3Provider();
  useEffect(() => {
    dispatch(
      checkIsAdmin({
        provider: getDefaultProvider(),
      }),
    );
  }, [address, dispatch, getDefaultProvider]);

  const setPaymentsReceiverRequestStatus = useShallowSelector(
    uiSelector.getProp(adminActionTypes.ADMIN_SET_PAYMENTS_RECEIVER),
  );

  useEffect(() => {
    if (setPaymentsReceiverRequestStatus === RequestStatus.REQUEST) {
      dispatch(setActiveModal({
        modals: {
          [Modals.AdminChangePaymentsReceiverPending]: true,
        },
      }));
    }
  }, [dispatch, setPaymentsReceiverRequestStatus]);

  useEffect(() => {
    if (setPaymentsReceiverRequestStatus === RequestStatus.SUCCESS) {
      dispatch(setActiveModal({
        modals: {
          [Modals.AdminChangePaymentsReceiverSuccess]: true,
        },
      }));
    }
  }, [dispatch, setPaymentsReceiverRequestStatus]);

  useEffect(() => {
    if (setPaymentsReceiverRequestStatus === RequestStatus.ERROR) {
      dispatch(setActiveModal({
        modals: {
          [Modals.AdminChangePaymentsReceiverError]: true,
        },
      }));
    }
  }, [dispatch, setPaymentsReceiverRequestStatus]);

  useEffect(() => {
    if (setPaymentsReceiverRequestStatus === RequestStatus.ERROR || setPaymentsReceiverRequestStatus === RequestStatus.SUCCESS) {
      dispatch(apiActions.reset(adminActionTypes.ADMIN_SET_PAYMENTS_RECEIVER));
      dispatch(closeModal(Modals.AdminChangePaymentsReceiverPending));
    }
  }, [dispatch, setPaymentsReceiverRequestStatus]);
};

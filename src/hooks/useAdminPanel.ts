import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { checkIsAdmin, getPaymentsReceiver, getIsMainnetDisabled } from 'store/admin/actions';
import userSelectors from 'store/user/selectors';
import uiSelector from 'store/ui/selectors';
import apiActions from 'store/ui/actions';
import adminActionTypes from 'store/admin/actionTypes';
import adminSelectors from 'store/admin/selectors';
import { Modals, RequestStatus } from 'types';
import { closeModal, setActiveModal } from 'store/modals/reducer';
import { setNotification } from 'utils';
import useShallowSelector from './useShallowSelector';
import { useWeb3Provider } from './walletService';

export const useAdminPanel = () => {
  const { address } = useShallowSelector(
    userSelectors.getUser,
  );
  const { isMainnetDisabled } = useShallowSelector(
    adminSelectors.selectState,
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
  useEffect(() => {
    dispatch(
      getPaymentsReceiver({
        provider: getDefaultProvider(),
      }),
    );
  }, [dispatch, getDefaultProvider]);
  useEffect(() => {
    dispatch(
      getIsMainnetDisabled(),
    );
  }, [dispatch]);

  const setPaymentsReceiverRequestStatus = useShallowSelector(
    uiSelector.getProp(adminActionTypes.ADMIN_SET_PAYMENTS_RECEIVER),
  );
  const setPriceRequestStatus = useShallowSelector(
    uiSelector.getProp(adminActionTypes.ADMIN_SET_PRICE),
  );
  const setIsMainnetDisabledRequestStatus = useShallowSelector(
    uiSelector.getProp(adminActionTypes.ADMIN_SET_IS_MAINNET_DISABLED),
  );

  // Requests
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
    if (setPriceRequestStatus === RequestStatus.REQUEST) {
      dispatch(setActiveModal({
        modals: {
          [Modals.AdminChangePricePending]: true,
        },
      }));
    }
  }, [dispatch, setPriceRequestStatus]);

  // Success
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
    if (setPriceRequestStatus === RequestStatus.SUCCESS) {
      dispatch(setActiveModal({
        modals: {
          [Modals.AdminChangePriceSuccess]: true,
        },
      }));
    }
  }, [dispatch, setPriceRequestStatus]);
  useEffect(() => {
    if (setIsMainnetDisabledRequestStatus === RequestStatus.SUCCESS) {
      setNotification({
        type: 'success',
        message: isMainnetDisabled ? 'Success! Now users are not allowed to deploy contracts to mainnet' : 'Success! Now users can deploy contracts to mainnet',
      });
    }
  }, [dispatch, isMainnetDisabled, setIsMainnetDisabledRequestStatus]);

  // Errors
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
    if (setPriceRequestStatus === RequestStatus.ERROR) {
      dispatch(setActiveModal({
        modals: {
          [Modals.AdminChangePriceError]: true,
        },
      }));
    }
  }, [dispatch, setPriceRequestStatus]);
  useEffect(() => {
    if (setIsMainnetDisabledRequestStatus === RequestStatus.ERROR) {
      setNotification({
        type: 'error',
        message: 'Error occurred while switching deploy contracts to mainnet settings',
      });
    }
  }, [dispatch, setIsMainnetDisabledRequestStatus]);

  // Reset
  useEffect(() => {
    if (setPaymentsReceiverRequestStatus === RequestStatus.ERROR || setPaymentsReceiverRequestStatus === RequestStatus.SUCCESS) {
      dispatch(apiActions.reset(adminActionTypes.ADMIN_SET_PAYMENTS_RECEIVER));
      dispatch(closeModal(Modals.AdminChangePaymentsReceiverPending));
    }
  }, [dispatch, setPaymentsReceiverRequestStatus]);
  useEffect(() => {
    if (setPriceRequestStatus === RequestStatus.ERROR ||
      setPriceRequestStatus === RequestStatus.SUCCESS) {
      dispatch(apiActions.reset(adminActionTypes.ADMIN_SET_PRICE));
      dispatch(closeModal(Modals.AdminChangePricePending));
    }
  }, [dispatch, setPriceRequestStatus]);
  useEffect(() => {
    if (setIsMainnetDisabledRequestStatus === RequestStatus.ERROR ||
      setIsMainnetDisabledRequestStatus === RequestStatus.SUCCESS) {
      dispatch(apiActions.reset(adminActionTypes.ADMIN_SET_IS_MAINNET_DISABLED));
    }
  }, [dispatch, setIsMainnetDisabledRequestStatus]);
};

import React, { FC, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import modalsSelector from 'store/modals/selectors';
import { useShallowSelector } from 'hooks';
import { Modals } from 'types';
import { closeAllModals, closeModal } from 'store/modals/reducer';
import { LoadingModal } from 'components/Modals';
import { CompleteModal } from 'components';

export const AdminModalsContainer: FC = () => {
  // Change payments receiver
  const isAdminChangePaymentsReceiverPending = useShallowSelector(
    modalsSelector.selectModalState(Modals.AdminChangePaymentsReceiverPending),
  );
  const isAdminChangePaymentsReceiverSuccess = useShallowSelector(
    modalsSelector.selectModalState(Modals.AdminChangePaymentsReceiverSuccess),
  );
  const isAdminChangePaymentsReceiverError = useShallowSelector(
    modalsSelector.selectModalState(Modals.AdminChangePaymentsReceiverError),
  );
  // Change price
  const isAdminChangePricePending = useShallowSelector(
    modalsSelector.selectModalState(Modals.AdminChangePricePending),
  );
  const isAdminChangePriceSuccess = useShallowSelector(
    modalsSelector.selectModalState(Modals.AdminChangePriceSuccess),
  );
  const isAdminChangePriceError = useShallowSelector(
    modalsSelector.selectModalState(Modals.AdminChangePriceError),
  );

  const dispatch = useDispatch();
  const handleCloseAdminChangePaymentsReceiverSuccessModal = useCallback(() => {
    dispatch(closeModal(Modals.AdminChangePaymentsReceiverSuccess));
  }, [dispatch]);
  const handleCloseAdminChangePaymentsReceiverErrorModal = useCallback(() => {
    dispatch(closeModal(Modals.AdminChangePaymentsReceiverError));
  }, [dispatch]);
  const handleCloseAdminChangePriceSuccessModal = useCallback(() => {
    dispatch(closeModal(Modals.AdminChangePriceSuccess));
  }, [dispatch]);
  const handleCloseAdminChangePriceErrorModal = useCallback(() => {
    dispatch(closeModal(Modals.AdminChangePriceError));
  }, [dispatch]);

  const location = useLocation();

  useEffect(() => {
    dispatch(closeAllModals());
  }, [dispatch, location.pathname]);

  return (
    <>
      <LoadingModal open={isAdminChangePaymentsReceiverPending} text="Change Address" />
      <CompleteModal
        open={isAdminChangePaymentsReceiverSuccess}
        result
        successText="Payments` receiving address was successfully changed."
        onClose={handleCloseAdminChangePaymentsReceiverSuccessModal}
      />
      <CompleteModal
        open={isAdminChangePaymentsReceiverError}
        result={false}
        errorText="Error occurred while saving payments` receiving address"
        onClose={handleCloseAdminChangePaymentsReceiverErrorModal}
      />

      <LoadingModal open={isAdminChangePricePending} text="Change Price" />
      <CompleteModal
        open={isAdminChangePriceSuccess}
        result
        successText="Price was successfully changed."
        onClose={handleCloseAdminChangePriceSuccessModal}
      />
      <CompleteModal
        open={isAdminChangePriceError}
        result={false}
        errorText="Error occurred while saving price"
        onClose={handleCloseAdminChangePriceErrorModal}
      />
    </>
  );
};

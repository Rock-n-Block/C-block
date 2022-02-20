import React, {
  useCallback, useMemo, useState,
} from 'react';

import userSelector from 'store/user/selectors';
import { ConnectDropdownModal } from 'components/ConnectDropdownModal';
import useShallowSelector from '../useShallowSelector';

export const useConnectDropdownModal = () => {
  const { address } = useShallowSelector(userSelector.getUser);

  const isWalletConnected = useMemo(() => !!address, [address]);

  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = useCallback(() => {
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const closeConnectDropdownModal = useCallback(() => {
    setModalOpen(false);
  }, []);
  const openConnectDropdownModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const connectDropdownModal = useMemo(() => (
    <ConnectDropdownModal
      address={address}
      open={isModalOpen}
      onClose={closeConnectDropdownModal}
    />
  ), [address, closeConnectDropdownModal, isModalOpen]);

  return {
    isWalletConnected,
    connectDropdownModal,
    isModalOpen,
    toggleModal,
    closeConnectDropdownModal,
    openConnectDropdownModal,
  };
};

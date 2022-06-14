import {
  useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import userSelector from 'store/user/selectors';
import { setActiveModal } from 'store/modals/reducer';
import { useShallowSelector, useConnectDropdownModal } from 'hooks';
import { Modals } from 'types';

export const useAuthConnectWallet = () => {
  const isAuthenticated = useShallowSelector(userSelector.selectIsAuthenticated);

  const {
    connectDropdownModal,
    openConnectDropdownModal,
  } = useConnectDropdownModal();
  const dispatch = useDispatch();
  const handleConnect = useCallback(() => {
    if (!isAuthenticated) {
      dispatch(setActiveModal({
        modals: {
          [Modals.Login]: true,
        },
      }));
    } else {
      openConnectDropdownModal();
    }
  }, [isAuthenticated, dispatch, openConnectDropdownModal]);

  return {
    isAuthenticated,
    connectDropdownModal,
    handleConnect,
  };
};

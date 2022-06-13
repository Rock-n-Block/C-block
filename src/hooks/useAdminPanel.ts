import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { checkIsAdmin } from 'store/admin/actions';
import userSelectors from 'store/user/selectors';

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
};

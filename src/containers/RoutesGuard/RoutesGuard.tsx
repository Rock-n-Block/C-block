import { FC, ReactElement, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import adminActionTypes from 'store/admin/actionTypes';
import uiSelectors from 'store/ui/selectors';

import { routes } from 'appConstants';
import { setNotification } from 'utils';
import { RequestStatus } from 'types';

type Props = {
  children: ReactElement;
};

export const RoutesGuard: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useShallowSelector(userSelector.selectIsAuthenticated);
  const profile = useShallowSelector(userSelector.selectProfile);

  useEffect(() => {
    if (location.pathname === routes.profile.root) return;
    if (!isAuthenticated) return;
    if (!profile.isCompletedProfile) {
      setNotification({
        type: 'info',
        message: 'You must fill all profile fields in order to complete registration',
      });
      navigate(routes.profile.root);
    }
  }, [isAuthenticated, location.pathname, profile.isCompletedProfile]);

  const { isFrozen } = useShallowSelector(userSelector.getUser);

  useEffect(() => {
    if (!isFrozen) return;
    if ([
      routes['token-contract'].root,
      routes['lostkey-contract'].root,
      routes['will-contract'].root,
      routes['crowdsale-contract'].root,
      routes['wedding-contract'].root,
    ].some((path) => path.endsWith(location.pathname))) {
      setNotification({
        type: 'error',
        message: `Your account has been frozen.
        You can not create new contracts`,
      });
      navigate(routes.root);
    }
  }, [isFrozen, location.pathname]);

  const isAdmin = useShallowSelector(userSelector.selectIsAdmin);
  const adminCheckIsAdminRequestStatus = useShallowSelector(
    uiSelectors.getProp(adminActionTypes.ADMIN_CHECK_IS_ADMIN),
  );
  useEffect(() => {
    if (location.pathname !== routes['admin-panel'].root) return;
    if (adminCheckIsAdminRequestStatus !== RequestStatus.SUCCESS &&
      adminCheckIsAdminRequestStatus !== RequestStatus.ERROR) return;
    if (isAdmin) return;
    navigate(routes.root);
    setNotification({
      type: 'error',
      message: 'You have insufficient permissions to see this page',
    });
    // NOTE: make sure that deps has no `nagivate`, due to `navigate` in the deps causes to run this effect twice
  }, [adminCheckIsAdminRequestStatus, isAdmin, location.pathname]);

  return children;
};

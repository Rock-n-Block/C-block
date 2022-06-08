import React, { FC, useMemo } from 'react';
import {
  Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { routes } from 'appConstants';
import {
  CreateContract,
  CustomDevelopment,
  AdminPanel,
  MyContracts,
  TokenContract,
  TokenContractPreview,
  CrowdsaleContract,
  CrowdsaleContractPreview,
  WeddingContract,
  WeddingContractPreview,
  LostKeyContract,
  LostKeyContractPreview,
  WillContract,
  WillContractPreview,
  Earn,
  Terms,
  Privacy,
} from 'pages';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';

const RedirectToHomePage = <Navigate replace to={routes.root} />;

const RoutesContainer: FC = () => {
  const location = useLocation();

  const { address } = useShallowSelector(userSelector.getUser);
  const isWalletConnected = useMemo(() => !!address, [address]);

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <>
          <Routes location={location}>
            <Route path={routes.root} element={<CreateContract />} />

            <Route
              path={routes['token-contract'].root}
              element={<TokenContract />}
            />
            <Route
              path={routes['crowdsale-contract'].root}
              element={<CrowdsaleContract />}
            />
            <Route
              path={routes['wedding-contract'].root}
              element={<WeddingContract />}
            />
            <Route
              path={routes['lostkey-contract'].root}
              element={<LostKeyContract />}
            />
            <Route
              path={routes['will-contract'].root}
              element={<WillContract />}
            />

            <Route
              path={routes['token-contract']['preview-contract'].root}
              element={<TokenContractPreview />}
            />
            <Route
              path={routes['crowdsale-contract']['preview-contract'].root}
              element={<CrowdsaleContractPreview />}
            />
            <Route
              path={routes['wedding-contract']['preview-contract'].root}
              element={<WeddingContractPreview />}
            />
            <Route
              path={routes['lostkey-contract']['preview-contract'].root}
              element={<LostKeyContractPreview />}
            />
            <Route
              path={routes['will-contract']['preview-contract'].root}
              element={<WillContractPreview />}
            />

            <Route
              path={routes['my-contracts'].root}
              element={isWalletConnected ? <MyContracts /> : RedirectToHomePage}
            />

            <Route
              path={routes['my-contracts']['preview-token-contract'].root}
              element={<TokenContractPreview />}
            />
            <Route
              path={routes['my-contracts']['preview-crowdsale-contract'].root}
              element={<CrowdsaleContractPreview />}
            />
            <Route
              path={routes['my-contracts']['preview-wedding-contract'].root}
              element={<WeddingContractPreview />}
            />
            <Route
              path={routes['my-contracts']['preview-lostkey-contract'].root}
              element={<LostKeyContractPreview />}
            />
            <Route
              path={routes['my-contracts']['preview-will-contract'].root}
              element={<WillContractPreview />}
            />

            <Route path={routes['earn'].root} element={<Earn />} />

            <Route
              path={routes['custom-development'].root}
              element={<CustomDevelopment />}
            />

            <Route
              path={routes['admin-panel'].root}
              element={<AdminPanel />}
            />

            <Route
              path={routes['terms'].root}
              element={<Terms />}
            />
            <Route
              path={routes['privacy'].root}
              element={<Privacy />}
            />

            <Route path="*" element={RedirectToHomePage} />
          </Routes>
        </>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default RoutesContainer;

import React from 'react';
import { routes } from 'appConstants';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  CreateContract,
  CustomDevelopment,
  TokenContract,
  TokenContractPreview,
  CrowdsaleContract, WeddingContract,
  WeddingContractPreview,
} from 'pages';

const RoutesContainer = () => (
  <Routes>
    <Route path={routes.root} element={<CreateContract />} />
    <Route path={routes['token-contract'].root} element={<TokenContract />} />
    <Route path={routes['crowdsale-contract'].root} element={<CrowdsaleContract />} />
    <Route path={routes['my-contracts'].root} element={<div>5</div>} />
    <Route path={routes['wedding-contract'].root} element={<WeddingContract />} />
    <Route path={routes['my-contracts'].root} element={<div>myContracts</div>} />
    <Route path={routes['custom-development'].root} element={<CustomDevelopment />} />
    <Route path={routes['token-contract']['preview-contract'].root} element={<TokenContractPreview />} />
    <Route path={routes['wedding-contract']['preview-contract'].root} element={<WeddingContractPreview />} />
    <Route path="/" element={<Navigate replace to={routes.root} />} />
  </Routes>
);

export default RoutesContainer;

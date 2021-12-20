import React from 'react';
import { routes } from 'appConstants';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CreateContract } from 'pages/CreateContract';
import { CustomDevelopment } from 'pages/CustomDevelopment';
import TokenContract from 'pages/TokenContract/TokenContract';
import WeddingContract from 'pages/WeddingContract/WeddingContract';
import TokenContractPreview from 'pages/TokenContractPreview/TokenContractPreview';


const RoutesContainer = () => (
  <Routes>
    <Route path={routes.root} element={<CreateContract />} />
    <Route path={routes['token-contract'].root} element={<TokenContract />} />
    <Route path={routes['wedding-contract'].root} element={<WeddingContract />} />
    <Route path={routes['my-contracts'].root} element={<div>myContracts</div>} />
    <Route path={routes['custom-development'].root} element={<CustomDevelopment />} />
    <Route path={routes['token-contract']['preview-contract'].root} element={<TokenContractPreview />} />
    <Route path="/" element={<Navigate replace to={routes.root} />} />
  </Routes>
);

export default RoutesContainer;

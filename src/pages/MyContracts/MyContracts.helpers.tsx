import React from 'react';
import {
  ContractToken as ContractTokenIcon, CrowdsaleIcon, KeyIcon, WeddingRingIcon, WillContract,
} from 'theme/icons';
import { formattedDate } from 'utils';

export type TContractButtonsTypes = 'viewContract' | 'setUp' | 'requestDivorce' | 'requestWithdrawal' | 'divorceApprove' | 'withdrawalApprove' | 'getFunds' | 'confirmLiveStatus' | 'confirmActiveStatus';

export type TAdditionalContentRenderType = 'weddingRequestDivorce' | 'weddingRequestWithdrawal' | 'weddingSuccessfulDivorce' | 'weddingSuccessfulWithdrawal';

interface IContractButton {
  type: TContractButtonsTypes;
  title: string;
}

type TContractButtons = IContractButton[];
export interface IContractsCard {
  contractKey?: string;
  contractDate: string;
  contractType: string;
  contractLogo: React.ReactElement;
  contractName: string;
  contractButtons: TContractButtons;
  additionalContentRenderType?: TAdditionalContentRenderType;
}

const currentDate = formattedDate('.');

export const contractButtons: Partial<Record<TContractButtonsTypes, IContractButton>> = {
  viewContract: {
    type: 'viewContract',
    title: 'View contract',
  },
  setUp: {
    type: 'setUp',
    title: 'Set up',
  },
  confirmActiveStatus: {
    type: 'confirmActiveStatus',
    title: 'Confirm active status',
  },
  confirmLiveStatus: {
    type: 'confirmLiveStatus',
    title: 'Confirm live status',
  },
  requestWithdrawal: {
    type: 'requestWithdrawal',
    title: 'Request withdrawal',
  },
  requestDivorce: {
    type: 'requestDivorce',
    title: 'Request divorce',
  },
  getFunds: {
    type: 'getFunds',
    title: 'Get funds',
  },
};

const createCrowdsaleCard = (date: string, contractName = '_Cr0wds@ale contract') => ({
  contractDate: date,
  contractType: 'Crowdsale contract',
  contractLogo: <CrowdsaleIcon />,
  contractName,
  contractButtons: [
    contractButtons.viewContract,
  ],
} as IContractsCard);

const createTokenCard = (date: string, contractName = 'TokEn contract') => ({
  contractDate: date,
  contractType: 'Token contract',
  contractLogo: <ContractTokenIcon />,
  contractName,
  contractButtons: [
    contractButtons.viewContract,
  ],
} as IContractsCard);

const createLostkeyCard = (date: string, contractName = 'L0ssst1Key contract') => ({
  contractDate: date,
  contractType: 'Lostkey Contract',
  contractLogo: <KeyIcon />,
  contractName,
  contractButtons: [
    contractButtons.viewContract,
    contractButtons.setUp,
    contractButtons.confirmActiveStatus,
  ],
} as IContractsCard);

const createWillCard = (date: string, contractName = 'W1ll c0NtR@ Ct') => ({
  contractDate: date,
  contractType: 'Will Contract',
  contractLogo: <WillContract />,
  contractName,
  contractButtons: [
    contractButtons.viewContract,
    contractButtons.setUp,
    contractButtons.confirmLiveStatus,
  ],
} as IContractsCard);

const createWeddingCard = (date: string, contractName = 'W3Ddding contract') => ({
  contractDate: date,
  contractType: 'Wedding contract',
  contractLogo: <WeddingRingIcon />,
  contractName,
  contractButtons: [
    contractButtons.viewContract,
    contractButtons.requestWithdrawal,
    contractButtons.requestDivorce,
  ],
} as IContractsCard);

export const contractsCards: IContractsCard[] = [
  createCrowdsaleCard(currentDate),
  createTokenCard(currentDate),
  createLostkeyCard(currentDate),
  createWillCard(currentDate),
  createWeddingCard(currentDate),
].map((item, index) => ({ ...item, contractKey: index.toString() } as IContractsCard));

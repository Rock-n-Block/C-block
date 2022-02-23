import React from 'react';
import {
  IGetContractsCrowdsaleContract,
  IGetContractsProbateContract,
  IGetContractsTokenContract,
  IGetContractsWeddingContract,
} from 'store/api/apiRequestBuilder.types';
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
  address: string;
  contractDate: string;
  isTestnet: boolean;
  contractType: string;
  contractLogo: React.ReactElement;
  contractName: string;
  contractButtons: TContractButtons;
  additionalContentRenderType?: TAdditionalContentRenderType;
}

export interface ICreatedAtField { createdAt: string | number }
export interface IGetContractsTokenContractWithCreatedAtField extends IGetContractsTokenContract, ICreatedAtField {}
export interface IGetContractsProbateContractWithCreatedAtField extends IGetContractsProbateContract, ICreatedAtField {}
export interface IGetContractsCrowdsaleContractWithCreatedAtField extends IGetContractsCrowdsaleContract, ICreatedAtField {}
export interface IGetContractsWeddingContractWithCreatedAtField extends IGetContractsWeddingContract, ICreatedAtField {}
export interface IGetContractsWithCreatedAtField {
  tokens: IGetContractsTokenContractWithCreatedAtField[];
  lostkeys: IGetContractsProbateContractWithCreatedAtField[];
  lastwills: IGetContractsProbateContractWithCreatedAtField[];
  crowdsales: IGetContractsCrowdsaleContractWithCreatedAtField[];
  weddings: IGetContractsWeddingContractWithCreatedAtField[];
}

export const contractButtonsHelper: Partial<Record<TContractButtonsTypes, IContractButton>> = {
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

// eslint-disable-next-line arrow-body-style
const createContractCard = (
  contractName: string, address: string, isTestnet: boolean, createdAt: string | number,
) => ({
  contractName,
  address,
  contractDate: formattedDate('.', new Date(+createdAt * 1000)),
  isTestnet,
});

const createCrowdsaleCard = ({
  name, address, test_node, createdAt,
}: IGetContractsCrowdsaleContractWithCreatedAtField) => ({
  ...createContractCard(name, address, test_node, createdAt),
  contractType: 'Crowdsale contract',
  contractLogo: <CrowdsaleIcon />,
  contractButtons: [
    contractButtonsHelper.viewContract,
  ],
} as IContractsCard);

const createTokenCard = ({
  name, address, test_node, createdAt,
}: IGetContractsTokenContractWithCreatedAtField) => ({
  ...createContractCard(name, address, test_node, createdAt),
  contractType: 'Token contract',
  contractLogo: <ContractTokenIcon />,
  contractButtons: [
    contractButtonsHelper.viewContract,
  ],
} as IContractsCard);

const createLostkeyCard = ({
  name, address, test_node, createdAt,
}: IGetContractsProbateContractWithCreatedAtField) => ({
  ...createContractCard(name, address, test_node, createdAt),
  contractType: 'Lostkey Contract',
  contractLogo: <KeyIcon />,
  contractButtons: [
    contractButtonsHelper.viewContract,
    contractButtonsHelper.setUp,
    contractButtonsHelper.confirmActiveStatus,
  ],
} as IContractsCard);

const createWillCard = ({
  name, address, test_node, createdAt,
}: IGetContractsProbateContractWithCreatedAtField) => ({
  ...createContractCard(name, address, test_node, createdAt),
  contractType: 'Will Contract',
  contractLogo: <WillContract />,
  contractButtons: [
    contractButtonsHelper.viewContract,
    contractButtonsHelper.setUp,
    contractButtonsHelper.confirmLiveStatus,
  ],
} as IContractsCard);

const createWeddingCard = ({
  name, address, test_node, createdAt,
}: IGetContractsWeddingContractWithCreatedAtField) => ({
  ...createContractCard(name, address, test_node, createdAt),
  contractType: 'Wedding contract',
  contractLogo: <WeddingRingIcon />,
  contractButtons: [
    contractButtonsHelper.viewContract,
    contractButtonsHelper.requestWithdrawal,
    contractButtonsHelper.requestDivorce,
  ],
} as IContractsCard);

export const createContractCards = (data: IGetContractsWithCreatedAtField) => [
  ...data.crowdsales.map((crowdsale) => createCrowdsaleCard(crowdsale)),
  createCrowdsaleCard({
    name: 'MOCK_CROWDSALE', createdAt: Date.now() / 1000, tx_hash: '0x000000', address: '0x11111', test_node: false,
  }),
  ...data.tokens.map((token) => createTokenCard(token)),
  ...data.lostkeys.map((lostkey) => createLostkeyCard(lostkey)),
  ...data.lastwills.map((lastwill) => createWillCard(lastwill)),
  ...data.weddings.map((wedding) => createWeddingCard(wedding)),
].map((item, index) => ({ ...item, contractKey: index.toString() } as IContractsCard));

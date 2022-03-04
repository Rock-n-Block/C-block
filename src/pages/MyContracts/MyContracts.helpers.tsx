import React from 'react';

import {
  IGetContractsCrowdsaleContract,
  IGetContractsLostKeyContract,
  IGetContractsTokenContract,
  IGetContractsWeddingContract,
  IGetContractsWillContract,
} from 'store/api/apiRequestBuilder.types';
import {
  ContractToken as ContractTokenIcon,
  CrowdsaleIcon,
  KeyIcon,
  WeddingRingIcon,
  WillContract,
} from 'theme/icons';
import { ISpecificWeddingContractData, TMyContracts, TSpecificContractData } from 'types';
import { formattedDate } from 'utils';
import { getDivorceStatus, getWithdrawalStatus } from './hooks/useMyWeddingContract.helpers';

export type TContractButtonsTypes =
  | 'viewContract'
  | 'setUp'
  | 'requestDivorce'
  | 'divorceApprove'
  | 'divorceReject'
  | 'requestWithdrawal'
  | 'withdrawalApprove'
  | 'withdrawalReject'
  | 'getFunds'
  | 'confirmLiveStatus'
  | 'confirmActiveStatus';

export type TAdditionalContentRenderType =
  | 'weddingRequestDivorce'
  | 'weddingRequestWithdrawal'
  | 'weddingSuccessfulDivorce'
  | 'weddingSuccessfulWithdrawal';

interface IContractButton {
  type: TContractButtonsTypes;
  title: string;
}

type TContractButtons = IContractButton[];
type TContractType =
  | 'Crowdsale contract'
  | 'Token contract'
  | 'Lostkey contract'
  | 'Will contract'
  | 'Wedding contract';

export interface IContractCreationField {
  contractCreationData?: TMyContracts;
}

export interface ISpecificContractData {
  specificContractData: TSpecificContractData;
}
export interface IContractsCard extends IContractCreationField, ISpecificContractData {
  contractKey?: string;
  address: string;
  contractDate: string;
  isTestnet: boolean;
  contractType: TContractType;
  contractName: string;
  contractButtons: TContractButtons;
  additionalContentRenderType?: TAdditionalContentRenderType;
}

export interface ICreatedAtField {
  createdAt: string | number;
}

export interface IGetContractsTokenContractWithCreatedAtField
  extends IGetContractsTokenContract,
  ICreatedAtField {}
export interface IGetContractsLostKeyContractWithCreatedAtField
  extends IGetContractsLostKeyContract,
  ICreatedAtField {}
export interface IGetContractsWillContractWithCreatedAtField
  extends IGetContractsWillContract,
  ICreatedAtField {}
export interface IGetContractsCrowdsaleContractWithCreatedAtField
  extends IGetContractsCrowdsaleContract,
  ICreatedAtField {}
export interface IGetContractsWeddingContractWithCreatedAtField
  extends IGetContractsWeddingContract,
  ICreatedAtField {}
export interface IGetContractsWithCreatedAtField {
  tokens: IGetContractsTokenContractWithCreatedAtField[];
  lostkeys: IGetContractsLostKeyContractWithCreatedAtField[];
  lastwills: IGetContractsWillContractWithCreatedAtField[];
  crowdsales: IGetContractsCrowdsaleContractWithCreatedAtField[];
  weddings: IGetContractsWeddingContractWithCreatedAtField[];
}
export type TGetContractsWithCreatedAtField =
  & IGetContractsTokenContractWithCreatedAtField
  & IGetContractsLostKeyContractWithCreatedAtField
  & IGetContractsWillContractWithCreatedAtField
  & IGetContractsCrowdsaleContractWithCreatedAtField
  & IGetContractsWeddingContractWithCreatedAtField;

export interface IGetContractsTokenContractWithContractCreationField
  extends IGetContractsTokenContractWithCreatedAtField,
  IContractCreationField {}
export interface IGetContractsLostKeyContractWithContractCreationField
  extends IGetContractsLostKeyContractWithCreatedAtField,
  IContractCreationField {}
export interface IGetContractsWillContractWithContractCreationField
  extends IGetContractsWillContractWithCreatedAtField,
  IContractCreationField {}
export interface IGetContractsCrowdsaleContractWithContractCreationField
  extends IGetContractsCrowdsaleContractWithCreatedAtField,
  IContractCreationField {}
export interface IGetContractsWeddingContractWithContractCreationField
  extends IGetContractsWeddingContractWithCreatedAtField,
  IContractCreationField {}

export interface IGetContractsWithContractCreationField {
  tokens: IGetContractsTokenContractWithContractCreationField[];
  lostkeys: IGetContractsLostKeyContractWithContractCreationField[];
  lastwills: IGetContractsWillContractWithContractCreationField[];
  crowdsales: IGetContractsCrowdsaleContractWithContractCreationField[];
  weddings: IGetContractsWeddingContractWithContractCreationField[];
}
// With Specific ISpecificContractData
export interface IGetContractsTokenContractWithSpecificField
  extends IGetContractsTokenContractWithContractCreationField,
  ISpecificContractData {}
export interface IGetContractsLostKeyContractWithSpecificField
  extends IGetContractsLostKeyContractWithContractCreationField,
  ISpecificContractData {}
export interface IGetContractsWillContractWithSpecificField
  extends IGetContractsWillContractWithContractCreationField,
  ISpecificContractData {}
export interface IGetContractsCrowdsaleContractWithSpecificField
  extends IGetContractsCrowdsaleContractWithContractCreationField,
  ISpecificContractData {}
export interface IGetContractsWeddingContractWithSpecificField
  extends IGetContractsWeddingContractWithContractCreationField,
  ISpecificContractData {}

export interface IGetContractsWithSpecificField {
  tokens: IGetContractsTokenContractWithSpecificField[];
  lostkeys: IGetContractsLostKeyContractWithSpecificField[];
  lastwills: IGetContractsWillContractWithSpecificField[];
  crowdsales: IGetContractsCrowdsaleContractWithSpecificField[];
  weddings: IGetContractsWeddingContractWithSpecificField[];
}

export const contractButtonsHelper: Partial<
Record<TContractButtonsTypes, IContractButton>
> = {
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

export const isFoundContractKey = (
  card: IContractsCard,
  contractKeyToBeFound: string,
) => card.contractKey === contractKeyToBeFound;

export const isFoundContract = (
  card: IContractsCard,
  contractAddress: string,
) => card.address.toLowerCase() === contractAddress.toLowerCase();

const createContractCard = (
  contractName: string,
  address: string,
  isTestnet: boolean,
  createdAt: string | number,
  contractCreationData: TMyContracts,
  specificContractData: TSpecificContractData,
) => ({
  contractName,
  address,
  contractDate: formattedDate('.', new Date(+createdAt * 1000)),
  isTestnet,
  contractCreationData,
  specificContractData,
});

const createCrowdsaleCard = ({
  name,
  address,
  test_node,
  createdAt,
  contractCreationData,
  specificContractData,
}: IGetContractsCrowdsaleContractWithSpecificField) => ({
  ...createContractCard(
    name,
    address,
    test_node,
    createdAt,
    contractCreationData,
    specificContractData,
  ),
  contractType: 'Crowdsale contract',
  contractButtons: [contractButtonsHelper.viewContract],
} as IContractsCard);

const createTokenCard = ({
  name,
  address,
  test_node,
  createdAt,
  contractCreationData,
  specificContractData,
}: IGetContractsTokenContractWithSpecificField) => ({
  ...createContractCard(
    name, address, test_node, createdAt, contractCreationData, specificContractData,
  ),
  contractType: 'Token contract',
  contractButtons: [contractButtonsHelper.viewContract],
} as IContractsCard);

const createLostkeyCard = ({
  name,
  address,
  test_node,
  createdAt,
  contractCreationData,
  specificContractData,
}: IGetContractsLostKeyContractWithSpecificField) => ({
  ...createContractCard(
    name, address, test_node, createdAt, contractCreationData, specificContractData,
  ),
  contractType: 'Lostkey contract',
  contractButtons: [
    contractButtonsHelper.viewContract,
    contractButtonsHelper.setUp,
    contractButtonsHelper.confirmActiveStatus,
  ],
} as IContractsCard);

const createWillCard = ({
  name,
  address,
  test_node,
  createdAt,
  contractCreationData,
  specificContractData,
}: IGetContractsWillContractWithSpecificField) => ({
  ...createContractCard(
    name, address, test_node, createdAt, contractCreationData, specificContractData,
  ),
  contractType: 'Will contract',
  contractButtons: [
    contractButtonsHelper.viewContract,
    contractButtonsHelper.setUp,
    contractButtonsHelper.confirmLiveStatus,
  ],
} as IContractsCard);

const createWeddingCard = ({
  name,
  address,
  test_node,
  createdAt,
  contractCreationData,
  specificContractData,
}: IGetContractsWeddingContractWithSpecificField) => {
  const {
    activeWithdrawalProposal,
    withdrawalProposalPending,
  } = specificContractData as ISpecificWeddingContractData;
  const withdrawalStatus = getWithdrawalStatus(
    withdrawalProposalPending, activeWithdrawalProposal,
  );

  const { divorceTimestamp } = specificContractData as ISpecificWeddingContractData;
  const divorceStatus = getDivorceStatus(+divorceTimestamp);

  console.log(withdrawalStatus, divorceStatus);

  const anotherContractButtons: TContractButtons = [
    // FOR DEBUG: TODO:
    // contractButtonsHelper.requestWithdrawal,
    // contractButtonsHelper.requestDivorce,
  ];
  if (divorceStatus === 'DIVORCE_NOT_STARTED' && withdrawalStatus === 'WITHDRAWAL_NOT_STARTED') {
    anotherContractButtons.push(contractButtonsHelper.requestWithdrawal);
  }

  switch (divorceStatus) {
    case 'DIVORCE_NOT_STARTED':
      anotherContractButtons.push(contractButtonsHelper.requestDivorce);
      break;
    case 'DIVORCE_DONE':
      anotherContractButtons.push(contractButtonsHelper.getFunds);
      break;
    default:
      break;
  }

  const additionalContentRenderType = (() => {
    if (divorceStatus === 'DIVORCE_DONE') {
      return 'weddingSuccessfulDivorce';
    }
    if (withdrawalStatus === 'WITHDRAWAL_DONE') {
      return 'weddingSuccessfulWithdrawal';
    }
    if (divorceStatus === 'DIVORCE_PENDING') {
      return 'weddingRequestDivorce';
    }
    if (withdrawalStatus === 'WITHDRAWAL_PENDING') {
      return 'weddingRequestWithdrawal';
    }
    return undefined;
  })() as TAdditionalContentRenderType;

  return {
    ...createContractCard(
      name, address, test_node, createdAt, contractCreationData, specificContractData,
    ),
    contractType: 'Wedding contract',
    additionalContentRenderType,
    contractButtons: [
      contractButtonsHelper.viewContract,
      ...anotherContractButtons,
    ],
  } as IContractsCard;
};

export const createContractCards = (data: IGetContractsWithSpecificField) => [
  ...data.crowdsales.map((crowdsale) => createCrowdsaleCard(crowdsale)),
  ...data.tokens.map((token) => createTokenCard(token)),
  ...data.lostkeys.map((lostkey) => createLostkeyCard(lostkey)),
  ...data.lastwills.map((lastwill) => createWillCard(lastwill)),
  ...data.weddings.map((wedding) => createWeddingCard(wedding)),
].map(
  (data) => ({
    ...data,
    contractKey: JSON.stringify(data),
  } as IContractsCard),
);

const contractLogos: Record<TContractType, React.ReactElement> = {
  'Crowdsale contract': <CrowdsaleIcon />,
  'Lostkey contract': <KeyIcon />,
  'Token contract': <ContractTokenIcon />,
  'Wedding contract': <WeddingRingIcon />,
  'Will contract': <WillContract />,
};
export const getContractLogo = (contractType: TContractType) => contractLogos[contractType];

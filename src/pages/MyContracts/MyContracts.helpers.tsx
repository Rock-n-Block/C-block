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
import { TMyContracts, TSpecificContractData } from 'types';
import { formattedDate } from 'utils';

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
  contractLogo: React.ReactElement;
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
  contractLogo: <CrowdsaleIcon />,
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
  contractLogo: <ContractTokenIcon />,
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
  contractLogo: <KeyIcon />,
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
  contractLogo: <WillContract />,
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
  // const specificWeddingContractData = specificContractData as ISpecificWeddingContractData;
  const anotherContractButtons: TContractButtons = [
    contractButtonsHelper.requestWithdrawal,
    contractButtonsHelper.requestDivorce,
  ];
  // if (!specificWeddingContractData.withdrawalProposalPending &&
  //   !specificWeddingContractData.divorceDisputed) {
  //   anotherContractButtons.push(contractButtonsHelper.requestWithdrawal);
  // }

  // if (!specificWeddingContractData.divorceDisputed) {
  //   anotherContractButtons.push(contractButtonsHelper.requestDivorce);
  // }

  return {
    ...createContractCard(
      name, address, test_node, createdAt, contractCreationData, specificContractData,
    ),
    contractType: 'Wedding contract',
    contractLogo: <WeddingRingIcon />,
    contractButtons: [
      contractButtonsHelper.viewContract,
      ...anotherContractButtons,
    ],
  } as IContractsCard;
};

export const createContractCards = (data: IGetContractsWithSpecificField) => [
  ...data.crowdsales.map((crowdsale) => createCrowdsaleCard(crowdsale)),
  createCrowdsaleCard({
    // TODO: remove this when cb-132 is ready
    name: 'MOCK_CROWDSALE',
    createdAt: Date.now() / 1000,
    tx_hash: '0x000000',
    address: '0x11111',
    test_node: false,
    // contractCreationData: {},
    specificContractData: {},
  }),
  ...data.tokens.map((token) => createTokenCard(token)),
  ...data.lostkeys.map((lostkey) => createLostkeyCard(lostkey)),
  ...data.lastwills.map((lastwill) => createWillCard(lastwill)),
  ...data.weddings.map((wedding) => createWeddingCard(wedding)),
].map(
  ({ contractLogo, ...dataForIndexKey }) => ({
    ...dataForIndexKey,
    contractLogo,
    contractKey: JSON.stringify(dataForIndexKey),
  } as IContractsCard),
);

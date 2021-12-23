import React from 'react';
import {
  ContractToken, CrowdsaleIcon, WeddingRingIcon, WillContract,
} from 'theme/icons';
import { formattedDate } from 'utils';

interface ContractsCardsI {
  contractKey: string;
  contractDate: string;
  contractType: string;
  contractLogo: React.ReactElement;
  contractName: string;
  contractButtons: ContractButtonsT,
  isRequestBlockActive?: boolean;
}

interface ContractButtonsI {
  type: string;
  title: string;
}

type ContractButtonsT = ContractButtonsI[];
type ContractCardsT = ContractsCardsI[];

const currentDate = formattedDate('.');

export const contractsCards: ContractCardsT = [
  {
    contractKey: '0',
    contractDate: currentDate,
    contractType: 'Token contract',
    contractLogo: <WeddingRingIcon />,
    contractName: 'Name contract',
    isRequestBlockActive: false,
    contractButtons: [
      {
        type: 'viewContract',
        title: 'View contract',
      },
    ],
  },
  {
    contractKey: '1',
    contractDate: currentDate,
    contractType: 'Wedding contract',
    contractLogo: <ContractToken />,
    contractName: 'Wedding contract',
    isRequestBlockActive: false,
    contractButtons: [
      {
        type: 'viewContract',
        title: 'View contract',
      },
      {
        type: 'setUp',
        title: 'Set up',
      },
      {
        type: 'confirmLiveStatus',
        title: 'Confirm live status',
      },
    ],
  },
  {
    contractKey: '2',
    contractDate: currentDate,
    contractType: 'Crowdsale contract',
    contractLogo: <CrowdsaleIcon />,
    contractName: 'Crowdsale contract',
    isRequestBlockActive: false,
    contractButtons: [
      {
        type: 'viewContract',
        title: 'View contract',
      },
      {
        type: 'requestDivorce',
        title: 'Request divorce',
      },
      {
        type: 'requestWithdrawal',
        title: 'Request withdrawal',
      },
    ],
  },
  {
    contractKey: '3',
    contractDate: currentDate,
    contractType: 'Will Contract',
    contractLogo: <WillContract />,
    contractName: 'Will contract',
    isRequestBlockActive: false,
    contractButtons: [
      {
        type: 'viewContract',
        title: 'View contract',
      },
    ],
  },
];

import { ICrowdsaleContract, ICrowdsaleContractDynamicForm } from 'types';

export type CrowdsaleContractPreviewHelperType = {
  key?: keyof ICrowdsaleContract | keyof ICrowdsaleContractDynamicForm;
  label: string;
  valueSuffix?: string;
};

export const dynamicCrowdsaleContractPreviewHelpers: CrowdsaleContractPreviewHelperType[] = [
  {
    key: 'rate',
    label: 'Token rate',
    valueSuffix: '',
  },
];

export const staticCrowdsaleContractPreviewHelpers: Record<'mixedSection' | 'minMaxInvestmentsSection' | 'amountBonusSection', CrowdsaleContractPreviewHelperType[][]> = {
  mixedSection: [
    [
      {
        key: 'saleDuration',
        label: 'Duration of Sale',
        valueSuffix: 'days',
      },
      {
        key: 'softcapTokens',
        label: 'Soft cap tokens',
        valueSuffix: 'HARDCODE',
      },
    ],
    [
      {
        key: 'changingDates',
        label: 'Changing dates',
      },
    ],
  ],
  minMaxInvestmentsSection: [
    [
      {
        key: 'minInvestments',
        label: 'Minimum',
        valueSuffix: 'HARDCODE',
      },
      {
        key: 'maxInvestments',
        label: 'Maximum',
        valueSuffix: 'HARDCODE',
      },
    ],
  ],
  amountBonusSection: [
    [
      {
        key: 'amountBonus',
        label: 'Bonus',
        valueSuffix: '%',
      },
      {
        key: 'minimumContribution',
        label: 'Minimum',
      },
    ],
  ],
};

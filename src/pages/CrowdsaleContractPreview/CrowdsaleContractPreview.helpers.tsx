import { ICrowdsaleContract, ICrowdsaleContractDynamicForm } from 'types';

export type CrowdsaleContractPreviewHelperType = {
  key?: keyof ICrowdsaleContract | keyof ICrowdsaleContractDynamicForm;
  label: string;
  valueLabel?: string;
};

export const dynamicCrowdsaleContractPreviewHelpers: CrowdsaleContractPreviewHelperType[] = [
  {
    key: 'rate',
    label: 'Token rate',
    valueLabel: '',
  },
];

export const staticCrowdsaleContractPreviewHelpers: Record<'mixedSection' | 'minMaxInvestmentsSection' | 'amountBonusSection', CrowdsaleContractPreviewHelperType[][]> = {
  mixedSection: [
    [
      {
        key: 'saleDuration',
        label: 'Duration of Sale',
        valueLabel: 'days',
      },
      {
        key: 'softcapTokens',
        label: 'Soft cap tokens',
        valueLabel: 'HARDCODE',
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
        valueLabel: 'HARDCODE',
      },
      {
        key: 'maxInvestments',
        label: 'Maximum',
        valueLabel: 'HARDCODE',
      },
    ],
  ],
  amountBonusSection: [
    [
      {
        key: 'amountBonus',
        label: 'Bonus',
        valueLabel: '%',
      },
      {
        key: 'minimumContribution',
        label: 'Minimum',
      },
    ],
  ],
};

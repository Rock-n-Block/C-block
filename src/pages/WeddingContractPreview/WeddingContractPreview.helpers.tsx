import { ReactNode } from 'react';

export type WeddingContractPreviewHelperType = {
  key?: string;
  name?: string;
  label: string;
  shouldSkipObjectValue?: boolean;
  value?: string;
  icon?: ReactNode;
  partnerEmailKey?: PartnerEmailT;
  partnerSliderValueKey?: PartnerSliderValueT;
  bottomInfo?: BottomInfoI;
};

export interface BottomInfoItemI {
  title: BottomInfoTitleT;
  daysKey: DaysKeyT;
}

type BottomInfoI = BottomInfoItemI[];

type BottomInfoTitleT = 'Divorce approval' | 'Withdrawal approval';
export type DaysKeyT = 'daysForDivorceApproval' | 'daysForWithdrawalApproval';

type PartnerEmailT = 'partnerOneEmail' | 'partnerTwoEmail';
type PartnerSliderValueT = 'partnerOneSliderValue' | 'partnerTwoSliderValue';

export const staticWeddingContractPreviewHelpers: WeddingContractPreviewHelperType[][] = [
  [
    {
      key: 'partnerOneAddress',
      name: 'partnerOneAddress',
      label: 'Partner 1 address',
      partnerEmailKey: 'partnerOneEmail',
      partnerSliderValueKey: 'partnerOneSliderValue',
    },
  ],
  [
    {
      key: 'partnerTwoAddress',
      name: 'partnerTwoAddress',
      label: 'Partner 2 address',
      partnerEmailKey: 'partnerTwoEmail',
      partnerSliderValueKey: 'partnerTwoSliderValue',
      bottomInfo: [
        {
          title: 'Divorce approval',
          daysKey: 'daysForDivorceApproval',
        },
        {
          title: 'Withdrawal approval',
          daysKey: 'daysForWithdrawalApproval',
        },
      ],
    },
  ],
];

export type WeddingContract = {
  contractName: string;
  partnerOneAddress: string;
  partnerTwoAddress: string;
  partnerOneEmail: string;
  partnerTwoEmail: string;
  daysForDivorceApproval: string;
  partnerOneSliderValue: number;
  partnerTwoSliderValue: number;
  daysForWithdrawalApproval: string;
};

export type WeddingFormsState = {
  weddingContract: WeddingContract
};

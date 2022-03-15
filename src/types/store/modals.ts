export enum Modals {
  // ApprovePending = 'ApprovePending',
  // ApproveRejected = 'ApproveRejected',
  SendTxPending = 'SendTxPending',
  SendTxRejected = 'SendTxRejected',
  SendTxSuccess = 'SendTxSuccess',
  // BidSuccess = 'BidSuccess',
  // CreatedLotSuccess = 'CreatedLotSuccess',
  // CreatedLotError = 'CreatedLotError',
  none = '',
}

export type ModalsState = {
  activeModal: Modals;
  // txHash: string;
  open: boolean;
};

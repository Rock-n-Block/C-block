export enum Modals {
  FullscreenLoader = 'FullscreenLoader',
  SendTxPending = 'SendTxPending',
  SendTxRejected = 'SendTxRejected',
  SendTxSuccess = 'SendTxSuccess',
  Init = 'Init',
}

export type ModalsState = {
  activeModal: Modals;
  open: boolean;
};

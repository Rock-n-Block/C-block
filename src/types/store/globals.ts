export type TPingIntervalUnit = 'Day' | 'Month' | 'Year';

export type TRequestUiCallbacks = {
  onRequestTx?: () => void;
  onSuccessTx?: () => void;
  onErrorTx?: () => void;
  onFinishTx?: () => void;
};

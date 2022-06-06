import React, {
  FC,
} from 'react';

import modalsSelector from 'store/modals/selectors';
import {
  CompleteModal,
  FullscreenLoader,
  SendTransactionModal,
} from 'components';
import {
  useShallowSelector,
} from 'hooks';
import { Modals } from 'types';

export const ModalsContainer: FC = () => {
  const activeModal = useShallowSelector(modalsSelector.getActiveModal);
  const isOpen = useShallowSelector(modalsSelector.getIsOpenModal);

  if (activeModal === Modals.FullscreenLoader) {
    return isOpen && <FullscreenLoader />;
  }

  if (activeModal === Modals.SendTxPending) {
    return <SendTransactionModal open={isOpen} />;
  }

  if (activeModal === Modals.SendTxSuccess) {
    return <CompleteModal open={isOpen} result />;
  }

  if (activeModal === Modals.SendTxRejected) {
    return <CompleteModal open={isOpen} result={false} />;
  }
  return null;
};

import React, {
  FC, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';

import { CreateContract } from 'pages';
import { setActiveModal } from 'store/modals/reducer';
import { Modals } from 'types';
import { setNotification } from 'utils';

export const ConfirmEmail: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setNotification({
      type: 'success',
      message: 'Email confirmed, you can log in',
    });
    dispatch(
      setActiveModal({
        modals: {
          [Modals.Login]: true,
        },
      }),
    );
  }, [dispatch]);
  return (
    <CreateContract />
  );
};

import React, {
  FC, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { CreateContract } from 'pages/CreateContract';
import { setActiveModal } from 'store/modals/reducer';
import { Modals } from 'types';

export const ConfirmEmail: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    toast.success('Email confirmed, you can log in');
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

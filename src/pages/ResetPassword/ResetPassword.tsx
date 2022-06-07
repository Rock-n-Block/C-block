import React, {
  FC, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';

import { CreateContract } from 'pages';
import { setActiveModal } from 'store/modals/reducer';
import { Modals } from 'types';

export const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setActiveModal({
        modals: {
          [Modals.PasswordReset]: true,
        },
      }),
    );
  }, [dispatch]);
  return (
    <CreateContract />
  );
};

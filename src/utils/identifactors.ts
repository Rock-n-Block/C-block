import { IGetFundsModalTokenAddressField } from 'components/GetFundsModal/GetFundsModal.helpers';
import { ISetUpModalTokenAddressField } from 'types';

export const incrementLastId = (addresses: ISetUpModalTokenAddressField[] | IGetFundsModalTokenAddressField[]) => {
  if (!addresses.length) {
    return 0;
  }
  return addresses[addresses.length - 1].id + 1;
};

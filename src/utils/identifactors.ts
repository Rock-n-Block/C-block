import { IGetFundsModalTokenAddressField } from 'components/GetFundsModal/GetFundsModal.helpers';
import { ISetUpModalTokenAddressField } from 'components/SetUpModal/SetUpModal.helpers';

export const incrementLastId = (addresses: ISetUpModalTokenAddressField[] | IGetFundsModalTokenAddressField[]) => {
  if (!addresses.length) {
    return 0;
  }
  return addresses[addresses.length - 1].id + 1;
};

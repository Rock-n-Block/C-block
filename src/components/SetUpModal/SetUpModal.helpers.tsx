import {
  ISetUpModalTokenAddressField,
  ISetUpModalTokenAddress,
} from 'types';

export const createAddressesArr = (
  tokensAddresses: ISetUpModalTokenAddress[],
) => tokensAddresses.map((item, id) => ({
  ...item,
  id,
})) as ISetUpModalTokenAddressField[];

import {
  all, call, select, put, takeLatest,
} from '@redux-saga/core/effects';

import userSelector from 'store/user/selectors';
import { setUpModalSetAddresses } from 'store/myContracts/reducer';
import { contractsHelper } from 'utils';
import { TOKEN_ADDRESSES_MAX_COUNT } from 'appConstants';
import {
  ISetUpModalTokenAddressField,
  UserState,
} from 'types';
import { getSetUpModalTokenAddresses } from '../actions';
import actionTypes from '../actionTypes';

function* getSetUpModalTokenAddressesSaga({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type,
  payload: {
    provider,
    contractAddress,
  },
}: ReturnType<typeof getSetUpModalTokenAddresses>) {
  try {
    const contract = contractsHelper.getLostKeyContract(provider, contractAddress);
    const tokensAddressesPromises = new Array(TOKEN_ADDRESSES_MAX_COUNT)
      .fill('')
      .map((_, index) => contract.methods.tokensToSend(index).call());
    const settledTokensAddresses: PromiseSettledResult<string>[] = yield Promise.allSettled(
      tokensAddressesPromises,
    );
    const tokensAddresses = settledTokensAddresses
      .filter(({ status }) => status === 'fulfilled')
      .map((item) => item.status === 'fulfilled' && item.value);

    const { address: userWalletAddress }: UserState = yield select(userSelector.getUser);
    const allowances = yield all(
      tokensAddresses.map((address) => {
        const tokenContract = contractsHelper.getBep20Contract(provider, address);
        return call(
          tokenContract.methods.allowance(userWalletAddress, contractAddress).call,
        );
      }),
    );

    yield put(
      setUpModalSetAddresses({
        contractAddress,
        addresses: tokensAddresses.map((address, index) => ({
          id: index,
          address,
          allowance: allowances[index],
          isAdded: true,
        } as ISetUpModalTokenAddressField)),
      }),
    );
  } catch (err) {
    console.log(err);
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_SETUP_MODAL_TOKEN_ADDRESSES, getSetUpModalTokenAddressesSaga);
}

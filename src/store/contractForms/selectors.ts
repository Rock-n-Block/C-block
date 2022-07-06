import type {
  ICrowdsaleContract, ILostKeyContract, IWeddingContract, IWillContract, State, TokenContract,
} from 'types';
import { IconType } from 'components/Preview/Preview.helpers';
import { Tokens } from 'types/utils/contractsHelper';

const getContractForms = (state: State) => state.contractForms;

export default {
  getContractForms,

  getTokenContract: (state: State): TokenContract => state.contractForms.tokenContract,
  getLostKeyContract: (state: State): ILostKeyContract => state.contractForms.lostKeyContract,
  getWillContract: (state: State): IWillContract => state.contractForms.willContract,
  getCrowdsaleContract: (state: State): ICrowdsaleContract => state.contractForms.crowdsaleContract,
  getWeddingContract: (state: State): IWeddingContract => state.contractForms.weddingContract,

  selectBuyTokenName: (contractType: IconType) => (state: State) => {
    const contractForms = getContractForms(state);
    let ret: Tokens;
    switch (contractType) {
      case 'token': {
        ret = contractForms.tokenContract.additional.selectedBuyToken;
        break;
      }
      case 'lostkey': {
        ret = contractForms.lostKeyContract.additional.selectedBuyToken;
        break;
      }
      case 'will': {
        ret = contractForms.willContract.additional.selectedBuyToken;
        break;
      }
      case 'crowdsale': {
        ret = contractForms.crowdsaleContract.additional.selectedBuyToken;
        break;
      }
      case 'weddingRing': {
        ret = contractForms.weddingContract.additional.selectedBuyToken;
        break;
      }
      default:
        break;
    }
    return ret;
  },
};

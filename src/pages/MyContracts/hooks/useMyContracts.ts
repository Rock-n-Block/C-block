import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CROWDSALE_CONTRACT, LOSTKEY_CONTRACT, routes, TOKEN_CONTRACT, WEDDING_CONTRACT, WILL_CONTRACT,
} from 'appConstants';
import {
  TPreviewContractNavigationState,
  ILostKeyContract, ICrowdsaleContract, IWeddingContract, IWillContract, TokenContract,
} from 'types';
import {
  IContractsCard,
} from '../MyContracts.helpers';

export const useMyContracts = () => {
  const navigate = useNavigate();
  const handleViewContract = useCallback((card: IContractsCard) => {
    const routeState = {
      contractPreview: {
        isReadonly: true,
      },
    } as TPreviewContractNavigationState;
    let routeParam = '';
    const { contractType, contractCreationData } = card;
    switch (contractType) {
      case 'Token contract': {
        routeParam = TOKEN_CONTRACT;
        routeState.contractPreview.data = contractCreationData as TokenContract;
        break;
      }
      case 'Crowdsale contract': {
        routeParam = CROWDSALE_CONTRACT;
        routeState.contractPreview.data = contractCreationData as ICrowdsaleContract;
        break;
      }
      case 'Lostkey contract': {
        routeParam = LOSTKEY_CONTRACT;
        routeState.contractPreview.data = contractCreationData as ILostKeyContract;
        break;
      }
      case 'Will contract': {
        routeParam = WILL_CONTRACT;
        routeState.contractPreview.data = contractCreationData as IWillContract;
        break;
      }
      case 'Wedding contract': {
        routeParam = WEDDING_CONTRACT;
        routeState.contractPreview.data = contractCreationData as IWeddingContract;
        break;
      }
      default: throw new Error('wrong param for handle view contract');
    }
    navigate(routes['my-contracts'][`preview-${routeParam}`].root, {
      state: { ...routeState },
    });
  }, [navigate]);

  return {
    handleViewContract,
  };
};

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { noop } from 'lodash';

import {
  CROWDSALE_CONTRACT, LOSTKEY_CONTRACT, routes, TOKEN_CONTRACT, WEDDING_CONTRACT, WILL_CONTRACT,
} from 'appConstants';
import {
  TPreviewContractNavigationState,
  ILostKeyContract, ICrowdsaleContract, IWeddingContract, IWillContract, TokenContract, RequestStatus,
  TRequestUiCallbacks,
} from 'types';
import useShallowSelector from 'hooks/useShallowSelector';
import uiSelector from 'store/ui/selectors';
import actionTypes from 'store/myContracts/actionTypes';
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

  const getMyContractsRequestStatus = useShallowSelector(
    uiSelector.getProp(actionTypes.GET_MY_CONTRACTS),
  );
  const getMyContractsRequestUi = useCallback(
    ({
      onRequestTx = noop, onSuccessTx = noop, onErrorTx = noop, onFinishTx = noop,
    }: TRequestUiCallbacks) => {
      switch (getMyContractsRequestStatus) {
        case RequestStatus.REQUEST: {
          onRequestTx();
          break;
        }
        case RequestStatus.SUCCESS: {
          onSuccessTx();
          onFinishTx();
          break;
        }
        case RequestStatus.ERROR: {
          onErrorTx();
          onFinishTx();
          break;
        }
        default: {
          break;
        }
      }
    }, [getMyContractsRequestStatus],
  );

  return {
    handleViewContract,
    getMyContractsRequestUi,
  };
};

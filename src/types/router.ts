import { TNullable } from './base';
import {
  TMyContracts,
} from './store';

interface IPreviewContractNavigationState {
  contractPreview: {
    isReadonly: boolean;
    data: TMyContracts;
  };
}
export type TPreviewContractNavigationState =
  TNullable<IPreviewContractNavigationState>;

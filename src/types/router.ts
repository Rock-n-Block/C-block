import { TNullable } from './base';
import {
  TMyContracts,
} from './store';

interface IPreviewContractNavigationState {
  contractPreview: {
    readonly: boolean;
    data: TMyContracts;
  };
}
export type TPreviewContractNavigationState =
  TNullable<IPreviewContractNavigationState>;

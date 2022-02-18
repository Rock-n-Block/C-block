import { FC } from 'react';
import { routes } from 'appConstants';
import {
  FileTextIcon, PlusCircleIcon, SettingGearIcon, UsdIcon, AtIcon,
} from 'theme/icons';
import { BaseSVGIconProps } from 'theme/icons/components/BaseSVGIcon';

type TNavigationTabsLabels = 'Create Contract' | 'My contracts' | 'Earn' | 'Custom development' | 'Support';

interface INavigationTab {
  Icon: FC<Partial<BaseSVGIconProps>>;
  label: TNavigationTabsLabels;
  link: string;
  isExternal?: boolean;
}

export const navigationTabs: INavigationTab[] = [
  {
    Icon: PlusCircleIcon,
    label: 'Create Contract',
    link: routes.root,
  },
  {
    Icon: FileTextIcon,
    label: 'My contracts',
    link: routes['my-contracts'].root,
  },
  {
    Icon: UsdIcon,
    label: routes['earn'].title as 'Earn',
    link: routes['earn'].root,
  },
  {
    Icon: SettingGearIcon,
    label: 'Custom development',
    link: routes['custom-development'].root,
  },
  {
    Icon: AtIcon,
    label: 'Support',
    link: 'https://stackoverflow.com/questions/17492888/how-to-place-a-div-over-a-image',
    isExternal: true,
  },
];

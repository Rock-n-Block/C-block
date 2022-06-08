import { FC } from 'react';
import { PRIVACY_SUPPORT_EMAIL, routes } from 'appConstants';
import {
  FileTextIcon, PlusCircleIcon, SettingGearIcon, UsdIcon, AtIcon, PersonIcon,
} from 'theme/icons';
import { BaseSVGIconProps } from 'theme/icons/components/BaseSVGIcon';

type TNavigationTabsLabels = 'Admin panel' | 'Create Contract' | 'My contracts' | 'Earn' | 'Custom development' | 'Support';

interface INavigationTab {
  Icon: FC<Partial<BaseSVGIconProps>>;
  label: TNavigationTabsLabels;
  link: string;
  isExternal?: boolean;
}

export const navigationTabs: INavigationTab[] = [
  {
    Icon: PersonIcon,
    label: 'Admin panel',
    link: routes['admin-panel'].root,
  },
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
    link: `mailto:${PRIVACY_SUPPORT_EMAIL}`,
    isExternal: true,
  },
];

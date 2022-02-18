import { routes } from 'appConstants';
import {
  FileTextIcon, PlusCircleIcon, SettingGearIcon, UsdIcon, AtIcon,
} from 'theme/icons';

export const navigationTabs = [
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
    label: routes['earn'].title,
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

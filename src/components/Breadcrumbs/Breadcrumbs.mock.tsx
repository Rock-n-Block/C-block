import { BreadcrumbsProps } from '.';

export const breadcrumbsListMocked: BreadcrumbsProps[] = [
  {
    paths: [{
      label: 'SomePage1',
      path: 'path1',
    }, {
      label: 'SomePage2',
      path: 'path2',
    }],
  },
  {
    paths: [
      {
        label: 'a',
        path: 'path1',
      },
      {
        label: 'b',
        path: 'path2',
      },
      {
        label: 'c',
        path: 'path3',
      },
    ],
  },
];

export const breadcrumbsPropsMocked: BreadcrumbsProps = {
  paths: [],
};

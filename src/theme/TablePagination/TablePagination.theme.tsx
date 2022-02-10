import { ComponentsProps } from '@material-ui/core/styles/props';
import { Overrides } from '@material-ui/core/styles/overrides';

export const getMuiTablePaginationDefaultProps = (): ComponentsProps['MuiTablePagination'] => ({});

export const getMuiTablePagination = (): Overrides['MuiTablePagination'] => ({
  actions: {
    '& > button': {
      background: 'unset',
    },
  },
});

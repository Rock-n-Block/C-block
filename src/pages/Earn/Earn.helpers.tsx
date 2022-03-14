interface IPageMainConfig {
  description: string;
}

export interface IRowData {
  userAddress: string;
  reward: string;
}

type TRowsData = keyof IRowData;

export interface IColumn {
  renderProps: {};
  text?: string;
  content?: TRowsData | 'transferButton';
}

interface ITableConfig {
  headColumns: IColumn[];
  bodyColumns: IColumn[];
}

export const pageMainConfig: IPageMainConfig = {
  description: 'You can earn CELO rewards for sending transactions and paying for gas. The transaction will transfer tokens from lost wallet to reserve address of user',
};

export const tableConfig: ITableConfig = {
  headColumns: [
    {
      renderProps: {
        component: 'th',
        scope: 'row',
        align: 'left',
        style: {
          marginRight: 'auto',
        },
      },
      text: 'User',
    },
    {
      renderProps: {
        component: 'th',
        scope: 'row',
        align: 'left',
      },
      text: 'Reward (Celo)',
    },
    {
      renderProps: {
        component: 'th',
        scope: 'row',
        align: 'right',
      },
      text: '',
    },
  ],
  bodyColumns: [
    {
      renderProps: {
        scope: 'row',
        align: 'left',
      },
      content: 'userAddress',
    },
    {
      renderProps: {
        scope: 'row',
        align: 'left',
      },
      content: 'reward',
    },
    {
      renderProps: {
        scope: 'row',
        align: 'right',
      },
      content: 'transferButton',
    },
  ],
};

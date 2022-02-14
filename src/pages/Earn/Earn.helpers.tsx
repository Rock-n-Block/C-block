interface IPageMainConfig {
  description: string;
}

export interface IRowData {
  userAddress: string;
  reward: number;
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

export const mockPageData: IRowData[] = [
  {
    userAddress: '0x3a9A34d723f080a4f0B2fA72fc9F497028dA6414',
    reward: 40,
  },
  {
    userAddress: '0x3a9A34d723f080a4f0B2fA72fc9F497028dA6414',
    reward: 10,
  },
  {
    userAddress: '0x3a9A34d723f080a4f0B2fA72fc9F497028dA6414',
    reward: 33,
  },
  {
    userAddress: '0x3a9A34d723f080a4f0B2fA72fc9F497028dA6414',
    reward: 123,
  },
  {
    userAddress: '0x3a9A34d723f080a4f0B2fA72fc9F497028dA6414',
    reward: 1,
  },
  {
    userAddress: 'Just for test amigo',
    reward: 10,
  },
];

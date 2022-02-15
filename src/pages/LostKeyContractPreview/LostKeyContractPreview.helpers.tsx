import {
  managementAddressSectionConfig,
  confirmLiveStatusSectionFieldsConfig,
  rewardAmountSectionConfig,
  dynamicSectionFormConfig,
  IFieldsFormConfigKeys,
} from '../LostKeyContract/LostKeyContract.helpers';

const MAIN_TOKEN_DATA = {
  symbol: 'CELO',
};

interface ITableColumnRenderProps {
  header?: string;
  valueSuffix?: string;
}

interface ITextRenderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sourceArray?: any[];
  currentIdx?: number,
}

interface ISectionContentReturnType {
  key: string;
  componentType: 'copyable' | 'tableColumn' | 'helperText' | 'singleHelperText';
  renderProps: ITableColumnRenderProps & ITextRenderProps;
  dataFields?: IFieldsFormConfigKeys[],
}

export const staticLostKeyContractPreviewHelpers: {
  key: string;
  title: string;
  content: ISectionContentReturnType[] | (<T>(items: T[]) => ISectionContentReturnType[]);
}[][] = [
  managementAddressSectionConfig.slice(0, 1).map(({ key, title }) => ({
    key,
    title,
    content: [
      ...managementAddressSectionConfig.map(({ key: fieldKey }, index) => ({
        key: fieldKey,
        componentType: index === 0 ? 'copyable' : 'singleHelperText',
        renderProps: {},
      } as ISectionContentReturnType)),
    ],
  })),

  [
    {
      key: dynamicSectionFormConfig.key,
      title: 'Reserve address',
      content: (items) => items.reduce((acc: ISectionContentReturnType[], item, reservesConfigIdx, sourceArray) => {
        const elements: ISectionContentReturnType[] = [
          {
            key: '',
            componentType: 'copyable',
            renderProps: {
              sourceArray,
              currentIdx: reservesConfigIdx,
            },
            dataFields: ['reserveAddress'],
          },
          {
            key: '',
            componentType: 'helperText',
            renderProps: {
              sourceArray,
              currentIdx: reservesConfigIdx,
            },
            dataFields: ['percents', 'email'],
          },
        ];
        acc.push(...elements.map((el) => ({
          ...el,
          key: `reservesConfigs[${reservesConfigIdx}].${el.dataFields[0]}`,
        })));
        return acc;
      }, []) as ISectionContentReturnType[]
      ,
    },
  ],

  [
    {
      key: 'confirmLiveStatusSection',
      title: 'Confirm Live Status',
      content: [
        confirmLiveStatusSectionFieldsConfig.reduce((acc: ISectionContentReturnType, item) => {
          acc.key = item.key;
          acc.dataFields.push(item.key);
          return acc;
        }, {
          key: '',
          dataFields: [],
          componentType: 'tableColumn',
          renderProps: {
            header: 'Check every',
            valueSuffix: 's',
          },
        }),

        rewardAmountSectionConfig.reduce((acc, item) => {
          acc.key = item.key;
          acc.dataFields.push(item.key);
          return acc;
        }, {
          key: '',
          dataFields: [],
          componentType: 'tableColumn',
          renderProps: {
            header: `Reward ${MAIN_TOKEN_DATA.symbol}`,
            valueSuffix: '',
          },
        }),
      ],
    },
  ],
];

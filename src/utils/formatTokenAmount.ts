import BigNumber from 'bignumber.js';
import { formatNumber } from './numberFormatter';

/**
 * @example getTokenAmount('1', 18) => '1000000000000000000'
 */
export const getTokenAmount = (
  balance: string | number | BigNumber,
  decimals = 18,
  shouldFormatNumber = true,
): string => {
  if (balance === '') {
    return '0';
  }

  const displayValue = new BigNumber(balance)
    .decimalPlaces(decimals, 1)
    .multipliedBy(
      new BigNumber(10).pow(decimals),
    );

  if (shouldFormatNumber) {
    const formattedValue = formatNumber(+displayValue.toFixed());

    return formattedValue;
  }

  return displayValue.toFixed();
};

export const getTokenAmountDisplay = (
  balance: string | number | BigNumber,
  decimals = 18,
): string => {
  if (balance === '') {
    return '0';
  }

  const displayValue = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals));

  return displayValue.toFixed();
};

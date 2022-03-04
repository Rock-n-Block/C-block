/**
 * Takes Result{} object and makes this plain JS Object
 * @param input Result{} object like { 0: 'zxc', 1: '123', name: 'zxc', amount: '123' }
 * @example
 * getRidOfIndexesInResultObject({
 *    0: '0x0000000000000000000000000000000000000000',
 *    1: '0x0000000000000000000000000000000000000000',
 *    2: '0',
 *    3: '0x0000000000000000000000000000000000000000',
 *    4: '0',
 *    amount: '0',
 *    proposedBy: '0x0000000000000000000000000000000000000000',
 *    receiver: '0x0000000000000000000000000000000000000000',
 *    timestamp: '0',
 *    token: '0x0000000000000000000000000000000000000000'
 * }) => {
 *    amount: '0',
 *    proposedBy: '0x0000000000000000000000000000000000000000',
 *    receiver: '0x0000000000000000000000000000000000000000',
 *    timestamp: '0',
 *    token: '0x0000000000000000000000000000000000000000'
 * }
 */
export const getRidOfIndexesInResultObject = (input: {}) => Object.keys(input)
  .filter((key) => Number.isNaN(Number(key)))
  .reduce((accumulator, filteredKey) => {
    accumulator[filteredKey] = input[filteredKey];
    return accumulator;
  }, {});

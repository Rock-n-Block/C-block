/**
 * Gets 2 objects a and b
 * @example
 * const a = { isFoo: true, isSwag: false, isBar: false };
 * const b = { isFoo: true, isSwag: true, isBar: false };
 * Converts them like
 * @example
 * const aConverted = ['isFootrue', 'isSwagfalse', 'isBarfalse'];
 * const bConverted = ['isFootrue', 'isSwagtrue', 'isBarfalse'];
 * Finds difference and returns resulting object
 * @example
 * shallowDifference(a, b); // {isSwag: true }
 */
export const shallowDifference = (a: Record<string, boolean>, b: Record<string, boolean>) => {
  // eslint-disable-next-line arrow-body-style
  const [convertedA, convertedB] = [a, b].map((obj) => {
    return Object.entries(obj).map(([key, value]) => key + value.toString());
  });
  const differenceArray = convertedB.filter((item) => !convertedA.includes(item));
  const constructedSourceObj = differenceArray.reduce((accumulator, item) => {
    if (item.includes('true')) {
      const key = item.replace(/true$/g, '');
      accumulator[key] = true;
    } else {
      const key = item.replace(/false/g, '');
      accumulator[key] = false;
    }
    return accumulator;
  }, {} as Record<string, boolean>);
  return constructedSourceObj;
};

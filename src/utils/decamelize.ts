/**
 * Convert a camelized string into words separated by white space.
 * @example "deployERC20CamelCaseString" -> "deploy ERC20 Camel Case String".
 */
export const decamelize = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

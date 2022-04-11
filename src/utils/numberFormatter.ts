// makes 1433434343.234353534324 => '1 433 434 343,234'
export const formatNumber = (number: number, params = []) => new Intl.NumberFormat(...params).format(number);

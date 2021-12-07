import BigNumber from 'bignumber.js';

export const base = new BigNumber(10).pow(18);

export const formatCurrency = (
  amount: BigNumber | string | number | undefined,
  digits?: number,
) => {
  try {
    if (amount) {
      const value = BigNumber.isBigNumber(amount)
        ? amount
        : new BigNumber(amount).dividedBy(base);
      const result =
        typeof digits !== 'undefined'
          ? value?.toFormat(digits, 1)
          : value?.toFormat();
      return removeTrailZero(result);
    }
  } catch (error) {
    console.log(error);
  }
  return '--';
};

export const currencyToBigNumber = (value: string): BigNumber => {
  return new BigNumber(value).dividedBy(base);
};

export const amountToBigNumber = (amount: string): BigNumber => {
  return new BigNumber(amount).multipliedBy(base);
};

export const bigNumberToAmount = (value: BigNumber, digits: number = 18) => {
  return value.decimalPlaces(digits, 1).toString();
};

export const currencyToFixed = (value: string, digits: number = 18) => {
  if (!value) return '--';
  const currencyBigNumber = currencyToBigNumber(value);
  const result = currencyBigNumber.decimalPlaces(digits, 1).toString();
  return result;
};

export const toFixed = (value: string, digits: number = 2) => {
  if (!value) return '--';
  const result = new BigNumber(value).decimalPlaces(digits, 1).toString();
  return result;
};

export const removeTrailZero = (value: string) => {
  if (value.indexOf('.') === -1) {
    return value;
  }

  var cutFrom = value.length - 1;

  do {
    if (value[cutFrom] === '0') {
      cutFrom--;
    }
  } while (value[cutFrom] === '0');

  if (value[cutFrom] === '.') {
    cutFrom--;
  }

  return value.substr(0, cutFrom + 1);
};

const ZERO = new BigNumber(0);

export const isGreaterThanZero = (value: string | number) => {
  if (!value) return false;
  return ZERO.isLessThanOrEqualTo(value);
};

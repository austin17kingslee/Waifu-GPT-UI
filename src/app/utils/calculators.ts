import BigNumber from "bignumber.js";

/**
 * 1 = bigger; -1 = smaller; 0 = equal
 */
export function compareNumbers(firstNumber: string | number, secondNumber: string | number): number {
  const firstBigNumber = new BigNumber(firstNumber);
  return firstBigNumber.comparedTo(secondNumber);
}

export function multiplyNumbers(firstNumber: number | string, secondNumber: number | string) {
  const firstBigNumber = new BigNumber(firstNumber);
  const secondBigNumber = new BigNumber(secondNumber);

  return firstBigNumber.multipliedBy(secondBigNumber).toString();
}

export function divideNumbers(firstNumber: number | string, secondNumber: number | string) {
  const firstBigNumber = new BigNumber(firstNumber);
  const secondBigNumber = new BigNumber(secondNumber);

  return firstBigNumber.div(secondBigNumber).toString();
}

export function plusNumbers(firstNumber: number | string, secondNumber: number | string) {
  const firstBigNumber = new BigNumber(firstNumber);
  const secondBigNumber = new BigNumber(secondNumber);

  return firstBigNumber.plus(secondBigNumber).toString();
}

export function minusNumbers(firstNumber: number | string, secondNumber: number | string) {
  const firstBigNumber = new BigNumber(firstNumber);
  const secondBigNumber = new BigNumber(secondNumber);

  return firstBigNumber.minus(secondBigNumber).toString();
}
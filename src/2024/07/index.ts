function checkEquation(result: number, total: number, numbers: number[], checkConcatenate = false): boolean {
  if (numbers.length === 0) {
    return total === result;
  }

  const [num, ...rest] = numbers;

  let res = false;
  if (total + num <= result) {
    res = checkEquation(result, total + num, rest, checkConcatenate);
  }
  if (total * num <= result && !res) {
    res = checkEquation(result, total * num, rest, checkConcatenate);
  }
  if (!checkConcatenate) {
    return res;
  }
  const concatenatedNumber = Number(`${total}${num}`);
  if (concatenatedNumber <= result && !res) {
    res = checkEquation(result, concatenatedNumber, rest, checkConcatenate);
  }

  return res;
}

export function main(input: string): number {
  const res = input.split("\n").flatMap((row) => {
    const [resultStr, numbersStr] = row.split(": ");
    const result = Number(resultStr);
    const [first, ...rest] = numbersStr.split(" ").map(Number);

    if (!checkEquation(result, first, rest)) {
      return [];
    }

    return [result];
  });
  return res.reduce((acc, cur) => acc + cur, 0);
}

export function main2(input: string): number {
  const res = input.split("\n").flatMap((row) => {
    const [resultStr, numbersStr] = row.split(": ");
    const result = Number(resultStr);
    const [first, ...rest] = numbersStr.split(" ").map(Number);

    if (!checkEquation(result, first, rest, true)) {
      return [];
    }

    return [result];
  });
  return res.reduce((acc, cur) => acc + cur, 0);
}

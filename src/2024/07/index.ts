function checkEquation(result: number, total: number, numbers: number[]): boolean {
  if (numbers.length === 0) {
    return total === result;
  }

  const [num, ...rest] = numbers;

  let res = false;
  if (total + num <= result) {
    res = checkEquation(result, total + num, rest);
  }
  if (total * num <= result && !res) {
    res = checkEquation(result, total * num, rest);
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

export function main2(_input: string): number {
  return 0;
}

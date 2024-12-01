export const main = (input: string): number => {
  const [leftArr, rightArr] = input
    .split('\n')
    .map((row) => row.split(/\s+/g))
    .reduce<number[][]>(
      (acc, [left, right]) => {
        acc[0].push(Number(left));
        acc[1].push(Number(right));
        return acc;
      },
      [[], []],
    );
  leftArr.sort();
  rightArr.sort();
  const nums: number[] = [];
  for (let i = 0; i < leftArr.length; i++) {
    nums.push(Math.abs(leftArr[i] - rightArr[i]));
  }
  return nums.reduce((acc, cur) => acc + cur);
};
export const main2 = (input: string): number => {
  const [leftMap, rightMap] = input
    .split('\n')
    .map((row) => row.split(/\s+/g))
    .reduce<[Record<number, number>, Record<number, number>]>(
      (acc, [left, right]) => {
        const leftNum = Number(left);
        const rightNum = Number(right);

        acc[0][leftNum] ??= 0;
        acc[0][leftNum] += 1;
        acc[1][rightNum] ??= 0;
        acc[1][rightNum] += 1;

        return acc;
      },
      [{}, {}],
    );
  return Object.entries(leftMap).reduce((acc, [num, count]) => {
    const number = Number(num);
    return acc + number * count * (rightMap[number] ?? 0);
  }, 0);
};

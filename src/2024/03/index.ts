export function main(input: string): number {
  const regex = /mul\((?<left>\d+),(?<right>\d+)\)/g;

  let res = regex.exec(input);

  let sum = 0;
  while (res !== null) {
    if (res?.groups) {
      const {
        groups: { left, right },
      } = res;
      sum += Number(left) * Number(right);
    }
    res = regex.exec(input);
  }
  return sum;
}

export function main2(_input: string): number {
  return 0;
}

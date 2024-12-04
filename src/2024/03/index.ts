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

export function main2(input: string): number {
  const mulRegex = /^mul\((?<left>\d+),(?<right>\d+)\)/g;
  const doRegex = /^do\(\)/g;
  const doNotRegex = /^don't\(\)/g;

  let sum = 0;
  let doMul = true;
  for (let i = 0; i < input.length; i++) {
    mulRegex.lastIndex = 0;
    if (doMul) {
      const res = mulRegex.exec(input.substring(i));
      if (res?.groups) {
        const {
          groups: { left, right },
        } = res;
        sum += Number(left) * Number(right);
      }
      doMul = !input.substring(i).match(doNotRegex);
    } else {
      doMul = !!input.substring(i).match(doRegex);
    }
  }

  return sum;
}

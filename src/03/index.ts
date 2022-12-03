const sumCharCode = (acc: number, cur: string) => {
  let num;
  if (/[A-Z]/.test(cur)) {
    num = cur.charCodeAt(0) - 38;
  } else {
    num = cur.charCodeAt(0) - 96;
  }
  return acc + num;
};

export const main = (input: string): number =>
  input
    .split('\n')
    .map((rucksack) => {
      const center = rucksack.length / 2;
      const secondHalfHalf = rucksack.slice(center);
      return rucksack
        .slice(0, center)
        .split('')
        .find((letter) => secondHalfHalf.includes(letter));
    })
    .filter((s): s is string => Boolean(s))
    .reduce(sumCharCode, 0);

export const main2 = (input: string): unknown => {
  let index = 0;
  return input
    .split('\n')
    .filter(Boolean)
    .reduce<string[][]>((acc, cur, i) => {
      if (i % 3 === 0 && i !== 0) {
        index += 1;
      }
      if (!Array.isArray(acc[index])) {
        acc[index] = [];
      }
      acc[index].push(cur);

      return acc;
    }, [])
    .map(([a, b, c]) =>
      a.split('').find((letter) => b.includes(letter) && c.includes(letter)),
    )
    .filter((s): s is string => Boolean(s))
    .reduce(sumCharCode, 0);
};

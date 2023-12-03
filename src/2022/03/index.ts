const sumCharCode = (acc: number, cur: string) =>
  /[A-Z]/.test(cur)
    ? acc + cur.charCodeAt(0) - 38
    : acc + cur.charCodeAt(0) - 96;

const filterUndefined = (str: string | undefined): str is string =>
  Boolean(str);

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
    .filter(filterUndefined)
    .reduce(sumCharCode, 0);

export const main2 = (input: string): unknown =>
  input
    .split('\n')
    .reduce<string[][]>((acc, cur, i) => {
      if (i % 3 === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(cur);

      return acc;
    }, [])
    .map(([a, b, c]) =>
      a.split('').find((letter) => b.includes(letter) && c.includes(letter)),
    )
    .filter(filterUndefined)
    .reduce(sumCharCode, 0);

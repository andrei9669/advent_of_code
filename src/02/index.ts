const pointMap = {
  A: {
    // Rock
    X: 1 + 3, // Rock
    Y: 2 + 6, // Paper
    Z: 3 + 0, // Scissors
  },
  B: {
    // Paper
    X: 1 + 0,
    Y: 2 + 3,
    Z: 3 + 6,
  },
  C: {
    // Scissors
    X: 1 + 6,
    Y: 2 + 0,
    Z: 3 + 3,
  },
};
const pointMap2 = {
  A: {
    // Rock
    X: 3 + 0, // Lose
    Y: 1 + 3, // Draw
    Z: 2 + 6, // Win
  },
  B: {
    // Paper
    X: 1 + 0,
    Y: 2 + 3,
    Z: 3 + 6,
  },
  C: {
    // Scissors
    X: 2 + 0,
    Y: 3 + 3,
    Z: 1 + 6,
  },
};
type Elf = 'A' | 'B' | 'C';
type Me = 'X' | 'Y' | 'Z';

export const main = (input: string): number =>
  input
    .split('\n')
    .filter(Boolean)
    .map((row) => {
      const [elf, me] = row.split(' ') as [Elf, Me];
      return pointMap[elf][me];
    })
    .reduce((acc, cur) => acc + cur);

export const main2 = (input: string): number => {
  const res = input
    .split('\n')
    .filter(Boolean)
    .map((row) => {
      const [elf, me] = row.split(' ') as [Elf, Me];

      return pointMap2[elf][me];
    });
  return res.reduce((acc, cur) => acc + cur);
};

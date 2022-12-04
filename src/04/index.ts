export const main = (input: string): unknown =>
  input
    .split('\n')
    .filter(Boolean)
    .filter((row) => {
      const [a, b] = row.split(',');
      const [aStart, aEnd] = a.split('-').map(Number);
      const [bStart, bEnd] = b.split('-').map(Number);
      return (
        (aStart <= bStart && aEnd >= bEnd) || (aStart >= bStart && aEnd <= bEnd)
      );
    })
    .reduce((acc) => acc + 1, 0);

export const main2 = (input: string): unknown =>
  input
    .split('\n')
    .filter(Boolean)
    .filter((row) => {
      const [a, b] = row.split(',');
      const [aStart, aEnd] = a.split('-').map(Number);
      const [bStart, bEnd] = b.split('-').map(Number);
      const cA = bStart <= aStart && aStart <= bEnd;
      const cB = bStart <= aEnd && aEnd <= bEnd;
      const cC = aStart <= bStart && bStart <= aEnd;
      const cD = aStart <= bEnd && bEnd <= aEnd;
      return cA || cB || cC || cD;
    })
    .reduce((acc) => acc + 1, 0);

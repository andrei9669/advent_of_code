export const main = (input: string): number => {
  const data = input
    .split("\n")
    .map((row) => row.split(" ").map((str) => Number(str)));

  const res = data.filter(([first, ...row]) => {
    let prev = first;
    let directionIsIncreasing: boolean | null = null;

    return row.every((num) => {
      const cur = prev - num;
      if (
        cur >= 1 &&
        cur <= 3 &&
        (directionIsIncreasing === null || !directionIsIncreasing)
      ) {
        directionIsIncreasing = false;
        prev = num;
        return true;
      } else if (
        cur <= -1 &&
        cur >= -3 &&
        (directionIsIncreasing === null || directionIsIncreasing)
      ) {
        directionIsIncreasing = true;
        prev = num;
        return true;
      }
      return false;
    });
  });

  return res.length;
};

const validateNumbers =
  (isDampenerTriggered = false) =>
  (row: number[]): boolean => {
    let directionIsIncreasing: boolean | null = null;
    let prev: number = row[0];

    for (let i = 1; i < row.length; i++) {
      const num = row[i];
      const diff = prev - num;

      if (
        diff >= 1 &&
        diff <= 3 &&
        (directionIsIncreasing === null || !directionIsIncreasing)
      ) {
        directionIsIncreasing = false;
        prev = num;
      } else if (
        diff <= -1 &&
        diff >= -3 &&
        (directionIsIncreasing === null || directionIsIncreasing)
      ) {
        directionIsIncreasing = true;
        prev = num;
      } else if (!isDampenerTriggered) {
        const removedCurrent = [...row].toSpliced(i, 1);
        const removedPrevious = [...row].toSpliced(i - 1, 1);
        return (
          validateNumbers(true)(removedCurrent) ||
          validateNumbers(true)(removedPrevious)
        );
      } else {
        return false;
      }
    }

    return true;
  };

export const main2 = (input: string): number => {
  const data = input
    .split("\n")
    .map((row) => row.split(" ").map((str) => Number(str)));

  const res = data.filter((row)=>validateNumbers()(row) || validateNumbers()(row.toReversed()));

  return res.length;
};

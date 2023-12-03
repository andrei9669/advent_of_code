const getNumbers = (input: string): number[] =>
  input.split('\n\n').map((elfCalories) =>
    elfCalories
      .split('\n')
      .map(Number)
      .reduce((acc, cur) => acc + cur),
  );
export const main = (input: string): number => {
  const data = getNumbers(input);
  return Math.max(...data);
};

export const main2 = (input: string): number => {
  const [one, two, three] = getNumbers(input).sort((a, b) => b - a);
  return one + two + three;
};

const getStackAndInstructions = (input: string): [string[][], string] => {
  const [crates, instructions] = input.split('\n\n');
  const stackArray = crates
    .split('\n')
    .map((row) => row.match(/.{3,4}/g)?.map((s) => s.trim()));
  const columns = stackArray.pop();
  const stacks =
    columns
      ?.map((column, i) =>
        stackArray
          .map((row) => row?.[i])
          .reverse()
          .filter(Boolean),
      )
      .map((s) => s.filter((ss): ss is string => ss !== undefined)) ?? [];
  return [stacks, instructions];
};

const getInstruction = (s: string): [number, number, number] => {
  const [, a, b, c] = [...s.matchAll(/move (\d+) from (\d+) to (\d+)/g)][0];
  const move = Number(a);
  const from = Number(b) - 1;
  const to = Number(c) - 1;
  return [move, from, to];
};
const getResult = (stacks: string[][]): string =>
  stacks
    .map((s) => s.pop())
    .join()
    .replaceAll(/[[\],]/g, '');

export const main = (input: string): unknown => {
  const [stacks, instructions] = getStackAndInstructions(input);

  instructions.split('\n').forEach((instruction) => {
    const [move, from, to] = getInstruction(instruction);
    for (let i = 0; i < move; i++) {
      stacks[to].push(stacks[from].pop() || '');
    }
  });
  return getResult(stacks);
};

export const main2 = (input: string): unknown => {
  const [stacks, instructions] = getStackAndInstructions(input);

  instructions.split('\n').forEach((instruction) => {
    const [move, from, to] = getInstruction(instruction);

    const stack = [];
    for (let i = 0; i < move; i++) {
      stack.push(stacks[from].pop() || '');
    }
    stack.reverse();
    stacks[to].push(...stack);
  });
  return getResult(stacks);
};

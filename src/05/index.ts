export const main = (input: string): unknown => {
  const [crates, instructions] = input.split('\n\n');
  const stackArray = crates
    .split('\n')
    .map((row) => row.match(/.{3,4}/g)?.map((s) => s.trim()));
  const columns = stackArray.pop();
  const stacks = columns?.map((column, i) =>
    stackArray
      .map((row) => row?.[i])
      .reverse()
      .filter(Boolean),
  );

  instructions?.split('\n').forEach((instruction) => {
    const [, a, b, c] = [
      ...instruction.matchAll(/move (\d+) from (\d+) to (\d+)/g),
    ][0];
    const move = Number(a);
    const from = Number(b) - 1;
    const to = Number(c) - 1;
    for (let i = 0; i < move; i++) {
      stacks?.[to].push(stacks?.[from].pop());
    }
  });
  return stacks
    ?.map((s) => s.pop())
    .join()
    .replaceAll(/\[|\]|,/g, '');
};

export const main2 = (input: string): unknown => {
  const [crates, instructions] = input.split('\n\n');
  const stackArray = crates
    .split('\n')
    .map((row) => row.match(/.{3,4}/g)?.map((s) => s.trim()));
  const columns = stackArray.pop();
  const stacks = columns?.map((column, i) =>
    stackArray
      .map((row) => row?.[i])
      .reverse()
      .filter(Boolean),
  );

  instructions?.split('\n').forEach((instruction) => {
    const [, a, b, c] = [
      ...instruction.matchAll(/move (\d+) from (\d+) to (\d+)/g),
    ][0];
    const move = Number(a);
    const from = Number(b) - 1;
    const to = Number(c) - 1;
    const stack = [];
    for (let i = 0; i < move; i++) {
      stack.push(stacks?.[from].pop());
    }
    stack.reverse();
    stacks?.[to].push(...stack);
  });
  return stacks
    ?.map((s) => s.pop())
    .join()
    .replaceAll(/\[|\]|,/g, '');
};

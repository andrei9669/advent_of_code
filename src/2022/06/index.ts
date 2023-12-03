export const main = (input: string): unknown =>
  input.split('').findIndex((value, i, arr) => {
    const elements = arr.slice(i, i + 4);
    return elements.every((e, ei) => elements.indexOf(e) === ei);
  }) + 4;

export const main2 = (input: string): unknown =>
  input.split('').findIndex((value, i, arr) => {
    const elements = arr.slice(i, i + 14);
    return elements.every((e, ei) => elements.indexOf(e) === ei);
  }) + 14;

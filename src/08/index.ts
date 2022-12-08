const getLine = (
  map: number[][],
  x: number,
  y: number,
  direction?: 'top' | 'left' | 'right' | 'bottom',
): (number | undefined)[] => {
  const value = map[y]?.[x];
  if (value === undefined) {
    return [undefined];
  }
  if (direction === 'top') {
    return [value, ...getLine(map, x, y - 1, direction)];
  }
  if (direction === 'bottom') {
    return [value, ...getLine(map, x, y + 1, direction)];
  }
  if (direction === 'left') {
    return [value, ...getLine(map, x - 1, y, direction)];
  }
  if (direction === 'right') {
    return [value, ...getLine(map, x + 1, y, direction)];
  }
  throw new Error('invalid dir');
};
const isVisible = (map: number[][], x: number, y: number) => {
  const curEl = map[y][x];

  const top = getLine(map, x, y - 1, 'top');
  const isTopVisible = top.every((el) => el === undefined || el < curEl);

  const right = getLine(map, x + 1, y, 'right');
  const isRightVisible = right.every((el) => el === undefined || el < curEl);

  const bottom = getLine(map, x, y + 1, 'bottom');
  const isBottomVisible = bottom.every((el) => el === undefined || el < curEl);

  const left = getLine(map, x - 1, y, 'left');
  const isLeftVisible = left.every((el) => el === undefined || el < curEl);
  return isBottomVisible || isRightVisible || isLeftVisible || isTopVisible;
};

const getScenicScore = (map: number[][], x: number, y: number): number => {
  const curEl = map[y][x];
  let tDistance = 0;
  getLine(map, x, y - 1, 'top').some((el) => {
    if (el === undefined) {
      tDistance += 0;
      return true;
    }
    tDistance += 1;
    return el >= curEl;
  });

  let rDistance = 0;
  getLine(map, x + 1, y, 'right').some((el) => {
    if (el === undefined) {
      rDistance += 0;
      return true;
    }
    rDistance += 1;
    return el >= curEl;
  });

  let bDistance = 0;
  getLine(map, x, y + 1, 'bottom').some((el) => {
    if (el === undefined) {
      bDistance += 0;
      return true;
    }
    bDistance += 1;
    return el >= curEl;
  });

  let lDistance = 0;
  getLine(map, x - 1, y, 'left').some((el) => {
    if (el === undefined) {
      lDistance += 0;
      return true;
    }
    lDistance += 1;
    return el >= curEl;
  });
  return tDistance * lDistance * bDistance * rDistance;
};

export const main = (input: string): unknown => {
  const map = input.split('\n').map((row) => row.split('').map(Number));

  const res = map.flatMap((row, iy) =>
    row.filter((col, ix) => isVisible(map, ix, iy)),
  );

  return res.length;
};
export const main2 = (input: string): unknown => {
  const map = input.split('\n').map((row) => row.split('').map(Number));

  return map
    .flatMap((row, iy) => row.map((col, ix) => getScenicScore(map, ix, iy)))
    .filter(Boolean)
    .sort((a, b) => b - a)[0];
};

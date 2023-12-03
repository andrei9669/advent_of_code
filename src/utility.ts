export const sum = (acc: number, cur: number, _i: number): number => acc + cur;
export const multiply = (acc: number, cur: number, _i: number): number =>
  acc * cur;

type GetNeighboursProps = {
  directions?: {
    left?: boolean;
    right?: boolean;
    up?: boolean;
    down?: boolean;
  };
};

// eslint-disable-next-line complexity -- complex func
export function* getNeighbours<T>(
  input: T[][],
  x: number,
  y: number,
  {
    directions: { left, down, up, right } = {
      left: true,
      up: true,
      down: true,
      right: true,
    },
  }: GetNeighboursProps = {},
): Generator<T, void> {
  if (input[y]?.[x - 1] !== undefined && left) {
    // left
    yield input[y][x - 1];
  }
  if (input[y - 1]?.[x - 1] !== undefined && left && up) {
    // left-up
    yield input[y - 1][x - 1];
  }
  if (input[y - 1]?.[x] !== undefined && up) {
    // up
    yield input[y - 1][x];
  }
  if (input[y - 1]?.[x + 1] !== undefined && up && right) {
    // up-right
    yield input[y - 1][x + 1];
  }
  if (input[y]?.[x + 1] !== undefined && right) {
    // right
    yield input[y][x + 1];
  }
  if (input[y + 1]?.[x + 1] !== undefined && right && down) {
    // right-down
    yield input[y + 1][x + 1];
  }
  if (input[y + 1]?.[x] !== undefined && down) {
    // down
    yield input[y + 1][x];
  }
  if (input[y + 1]?.[x - 1] !== undefined && down && left) {
    // down-left
    yield input[y + 1][x - 1];
  }
}

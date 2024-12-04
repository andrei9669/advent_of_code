export const sum = (acc: number, cur: number, _i: number): number => acc + cur;
export const multiply = (acc: number, cur: number, _i: number): number =>
  acc * cur;

export interface GetNeighboursProps {
  directions?: {
    left?: boolean;
    leftUp?: boolean;
    up?: boolean;
    upRight?: boolean;
    right?: boolean;
    rightDown?: boolean;
    down?: boolean;
    downLeft?: boolean;
  };
}

interface GetNeighboursResult<T> {
  value: T;
  indexes: [y: number, x: number];
  direction: GetNeighboursProps;
}

// eslint-disable-next-line complexity -- complex func
export function* getNeighbours<T>(
  input: T[][],
  x: number,
  y: number,
  {
    directions: {
      left,
      down,
      up,
      right,
      downLeft,
      leftUp,
      upRight,
      rightDown,
    } = {
      left: true,
      up: true,
      down: true,
      right: true,
    },
  }: GetNeighboursProps = {},
): Generator<GetNeighboursResult<T>, void> {
  if (input[y - 1]?.[x - 1] !== undefined && leftUp) {
    // left-up
    yield {
      indexes: [y - 1, x - 1],
      value: input[y - 1][x - 1],
      direction: { directions: { leftUp } },
    };
  }

  if (input[y - 1]?.[x] !== undefined && up) {
    // up
    yield {
      indexes: [y - 1, x],
      value: input[y - 1][x],
      direction: { directions: { up } },
    };
  }

  if (input[y - 1]?.[x + 1] !== undefined && upRight) {
    // up-right
    yield {
      indexes: [y - 1, x + 1],
      value: input[y - 1][x + 1],
      direction: { directions: { upRight } },
    };
  }

  if (input[y]?.[x + 1] !== undefined && right) {
    // right
    yield {
      indexes: [y, x + 1],
      value: input[y][x + 1],
      direction: { directions: { right } },
    };
  }

  if (input[y + 1]?.[x + 1] !== undefined && rightDown) {
    // right-down
    yield {
      indexes: [y + 1, x + 1],
      value: input[y + 1][x + 1],
      direction: { directions: { rightDown } },
    };
  }

  if (input[y + 1]?.[x] !== undefined && down) {
    // down
    yield {
      indexes: [y + 1, x],
      value: input[y + 1][x],
      direction: { directions: { down } },
    };
  }

  if (input[y + 1]?.[x - 1] !== undefined && downLeft) {
    // down-left
    yield {
      indexes: [y + 1, x - 1],
      value: input[y + 1][x - 1],
      direction: { directions: { downLeft } },
    };
  }
  if (input[y]?.[x - 1] !== undefined && left) {
    // left
    yield {
      indexes: [y, x - 1],
      value: input[y][x - 1],
      direction: { directions: { left } },
    };
  }
}

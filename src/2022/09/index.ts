const getDistance = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
): number => Math.floor(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
const pull = (a: [number, number], rope: [number, number][], i = 1) => {
  if (i === rope.length) {
    return;
  }
  const b = rope[i];
  const distance = getDistance(a, b);
  if (distance > 1) {
    if (a[0] === b[0]) {
      const m = a[1] - b[1];
      b[1] += m > 1 ? 1 : -1;
    } else if (a[1] === b[1]) {
      const m = a[0] - b[0];
      b[0] += m > 1 ? 1 : -1;
    } else if (a[0] > b[0] && a[1] > b[1]) {
      b[0] += 1;
      b[1] += 1;
    } else if (a[0] > b[0] && a[1] < b[1]) {
      b[0] += 1;
      b[1] -= 1;
    } else if (a[0] < b[0] && a[1] > b[1]) {
      b[0] -= 1;
      b[1] += 1;
    } else if (a[0] < b[0] && a[1] < b[1]) {
      b[0] -= 1;
      b[1] -= 1;
    }

    pull(rope[i], rope, i + 1);
  }
};

// doesn't work well with negatives
(() => {
  let width = 1;
  let height = 1;
  return (rope: [number, number][]) => {
    rope.forEach((el) => {
      if (el[0] >= width) {
        width = el[0] + 1;
      }
      if (el[1] >= height) {
        height = el[1] + 1;
      }
    });

    const grid = new Array(height * 2 + 1)
      .fill('')
      .map(() => new Array(width * 2 + 1).fill('.'));
    // console.log(grid);
    const [x1, y1] = rope[rope.length - 1];
    grid[Math.floor(y1 + height / 2)][Math.floor(x1 + width / 2)] = '#';
    [...rope].reverse().forEach(([x, y], i) => {
      grid[Math.floor(y + height / 2)][Math.floor(x + width / 2)] =
        rope.length - i - 1;
    });
    const [x2, y2] = rope[0];
    grid[Math.floor(y2 + height / 2)][Math.floor(x2 + width / 2)] = 'H';
    let table = '';
    grid.reverse().forEach((row) => {
      table = `${table}${row.join('')}\n`;
    });
    console.log(table);
  };
})();

export const main = (input: string): unknown => {
  const steps: [string, number][] = input.split('\n').map((s) => {
    const [a, b] = s.split(' ');
    return [a, Number(b)];
  });

  const grid = new Set();
  grid.add('0.0');
  const rope: [number, number][] = [
    [0, 0],
    [0, 0],
  ];

  steps.forEach(([direction, distance]) => {
    new Array(distance).fill('').forEach(() => {
      const [head, tail] = rope;
      switch (direction) {
        case 'U': {
          head[1] += 1;
          break;
        }
        case 'R': {
          head[0] += 1;
          break;
        }
        case 'D': {
          head[1] -= 1;
          break;
        }
        case 'L': {
          head[0] -= 1;
          break;
        }
        default: {
          throw new Error('invalid direction');
        }
      }
      pull(head, rope);
      grid.add(`${tail[0]}.${tail[1]}`);
      // print(rope);
    });
  });

  return [...grid].length;
};

export const main2 = (input: string): unknown => {
  const steps: [string, number][] = input.split('\n').map((s) => {
    const [a, b] = s.split(' ');
    return [a, Number(b)];
  });

  const grid = new Set();
  const rope: [number, number][] = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  steps.forEach(([direction, distance]) => {
    new Array(distance).fill('').forEach(() => {
      const [head] = rope;
      switch (direction) {
        case 'U': {
          head[1] += 1;
          break;
        }
        case 'R': {
          head[0] += 1;
          break;
        }
        case 'D': {
          head[1] -= 1;
          break;
        }
        case 'L': {
          head[0] -= 1;
          break;
        }
        default: {
          throw new Error('invalid direction');
        }
      }
      pull(head, rope);
      const tail = rope[rope.length - 1];
      grid.add(`${tail[0]}.${tail[1]}`);
      // print(rope);
    });
  });
  return [...grid].length;
};

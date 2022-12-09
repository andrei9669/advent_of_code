const getDistance = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
): number => Math.floor(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
export const main = (input: string): unknown => {
  const steps: [string, number][] = input.split('\n').map((s) => {
    const [a, b] = s.split(' ');
    return [a, Number(b)];
  });

  const grid = new Set();
  grid.add('0.0');
  let head: [number, number] = [0, 0];
  let headPrev: [number, number] = [0, 0];
  let tail: [number, number] = [0, 0];

  steps.forEach(([direction, distance]) => {
    new Array(distance).fill('').forEach(() => {
      headPrev = [...head];
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
      const pointDistance = getDistance(head, tail);
      if (pointDistance > 1) {
        grid.add(`${tail[0]}.${tail[1]}`);
        tail = [...headPrev];
      }
    });
  });

  return [...grid].length + 1;
};
export const main2 = (input: string): unknown => 0;

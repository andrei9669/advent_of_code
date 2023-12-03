import { getNeighbours, multiply, sum } from '../../utility';

const isSymbol = (s: string) => !!s.match(/([^0-9.])/);

export const main = (input: string): number => {
  const map = input.split('\n').map((row) => row.split(''));
  const partNumbers: number[] = [];

  map.forEach((row, y) => {
    let currentNumber = '';
    let isPartNumber = false;
    row.forEach((el, x) => {
      if (Number.isInteger(Number(el))) {
        currentNumber += el;
        // eslint-disable-next-line no-restricted-syntax -- generator
        for (const neighbourEl of getNeighbours(map, x, y)) {
          if (isSymbol(neighbourEl)) {
            isPartNumber = true;
          }
        }
      } else if (currentNumber.length > 0) {
        if (isPartNumber) {
          partNumbers.push(Number(currentNumber));
        }
        currentNumber = '';
        isPartNumber = false;
      }
    });
    if (isPartNumber) {
      partNumbers.push(Number(currentNumber));
    }
    currentNumber = '';
    isPartNumber = false;
  });
  return partNumbers.reduce(sum);
};

type NumberHolder = { value: '' };
export const main2 = (input: string): number => {
  const map = input.split('\n').map((row) => row.split(''));
  const numberMap: (NumberHolder | string)[][] = [];

  map.forEach((row, y) => {
    numberMap[y] = [];
    let currentNumber: NumberHolder = { value: '' };
    row.forEach((el, x) => {
      if (Number.isInteger(Number(el))) {
        currentNumber.value += el;
        numberMap[y][x] = currentNumber;
      } else {
        numberMap[y][x] = '';
        currentNumber = { value: '' };
      }
    });
    currentNumber = { value: '' };
  });

  return map
    .flatMap((row, y) =>
      row.map((el, x) => {
        if (el === '*') {
          let neighbourNumbers: Set<number> = new Set();
          // eslint-disable-next-line no-restricted-syntax -- generator
          for (const neighbourEl of getNeighbours(numberMap, x, y)) {
            if (typeof neighbourEl !== 'string') {
              neighbourNumbers.add(Number(neighbourEl.value));
            }
          }
          if (neighbourNumbers.size < 2) {
            return 0;
          }
          return [...neighbourNumbers].reduce(multiply);
        }
        return 0;
      }),
    )
    .reduce(sum);
};

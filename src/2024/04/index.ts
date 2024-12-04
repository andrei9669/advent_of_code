import { getNeighbours, GetNeighboursProps } from "../../utility";

const fullWord = "XMAS";

const directions = {
  directions: {
    left: true,
    right: true,
    down: true,
    up: true,
    downLeft: true,
    rightDown: true,
    upRight: true,
    leftUp: true,
  },
} satisfies GetNeighboursProps;

function iterate(x: number, y: number, map: string[][], word: string, direction: GetNeighboursProps): boolean {
  if (word.length === 0) {
    return true;
  }
  for (const {
    indexes: [nextY, nextX],
    value,
  } of getNeighbours(map, x, y, direction)) {
    if (word.startsWith(value)) {
      return iterate(nextX, nextY, map, word.substring(1), direction);
    }
  }
  return false;
}

export function main(input: string): number {
  const lettersRows = input.split("\n").map((row) => row.split(""));
  let sum = 0;
  lettersRows.forEach((row, y) => {
    row.forEach((char, x) => {
      if (fullWord.startsWith(char)) {
        for (const { direction } of getNeighbours(lettersRows, x, y, directions)) {
          if (iterate(x, y, lettersRows, fullWord.substring(1), direction)) {
            sum += 1;
          }
        }
      }
    });
  });

  return sum;
}

function checkMAS(map: string[][], x: number, y: number) {
  if (map[y][x] !== "A") {
    return false;
  }
  if (
    !(
      (map[y - 1]?.[x - 1] === "M" && map[y + 1]?.[x + 1] === "S") ||
      (map[y - 1]?.[x - 1] === "S" && map[y + 1]?.[x + 1] === "M")
    )
  ) {
    return false;
  }
  if (
    !(
      (map[y + 1]?.[x - 1] === "M" && map[y - 1]?.[x + 1] === "S") ||
      (map[y + 1]?.[x - 1] === "S" && map[y - 1]?.[x + 1] === "M")
    )
  ) {
    return false;
  }
  return true;
}

export function main2(input: string): number {
  const lettersRows = input.split("\n").map((row) => row.split(""));
  let sum = 0;

  lettersRows.forEach((row, y) => {
    row.forEach((letter, x) => {
      if (letter === "A" && checkMAS(lettersRows, x, y)) {
        sum += 1;
      }
    });
  });

  return sum;
}

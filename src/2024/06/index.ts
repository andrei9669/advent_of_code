import { getNeighbours, GetNeighboursProps } from "../../utility";

function turnRight(directions: GetNeighboursProps): GetNeighboursProps["directions"] {
  if (directions.directions?.up) {
    return { right: true };
  } else if (directions.directions?.right) {
    return { down: true };
  } else if (directions.directions?.down) {
    return { left: true };
  } else if (directions.directions?.left) {
    return { up: true };
  }
  throw new Error("invalid path");
}

export function main(
  input: string,
  getMap = false,
):
  | number
  | {
      value: string;
      visited: boolean;
      start: boolean;
      x: number;
      y: number;
    }[][] {
  const map = input.split("\n").map((row, y) =>
    row.split("").map((cell, x) => ({
      value: cell,
      visited: false,
      start: false,
      y,
      x,
    })),
  );
  let startCoords: null | [number, number] = null;
  main: for (const [currentY, row] of map.entries()) {
    for (const [currentX, cell] of row.entries()) {
      if (cell.value === "^") {
        startCoords = [currentY, currentX];
        break main;
      }
    }
  }
  const directions: GetNeighboursProps = {
    directions: {
      up: true,
    },
  };

  if (!startCoords) {
    return 0;
  }

  map[startCoords[0]][startCoords[1]] = {
    value: ".",
    visited: true,
    start: true,
    y: startCoords[0],
    x: startCoords[1],
  };

  let inMap = true;
  let pathWalkedSum = 1;
  while (inMap) {
    inMap = false;
    for (const { indexes, value } of getNeighbours(map, startCoords[1], startCoords[0], directions)) {
      inMap = true;
      if (value.value === "#") {
        directions.directions = turnRight(directions);
        break;
      } else if (value.value === ".") {
        pathWalkedSum += value.visited ? 0 : 1;
        value.visited = true;
        startCoords = indexes;
        break;
      }
    }
  }
  if (getMap) {
    return map;
  }
  return pathWalkedSum;
}

interface Cell {
  value: string;
  directions?: { up: boolean; right: boolean; down: boolean; left: boolean };
}

export function main2(input: string): number {
  const map = input.split("\n").map((row) =>
    row.split("").map(
      (cell): Cell => ({
        value: cell,
        directions:
          cell === "#"
            ? {
                up: false,
                right: false,
                down: false,
                left: false,
              }
            : undefined,
      }),
    ),
  );
  let startCoords: null | [number, number] = null;
  main: for (const [currentY, row] of map.entries()) {
    for (const [currentX, cell] of row.entries()) {
      if (cell.value === "^") {
        startCoords = [currentY, currentX];
        break main;
      }
    }
  }
  const directions: GetNeighboursProps = {
    directions: {
      up: true,
    },
  };

  if (!startCoords) {
    return 0;
  }

  map[startCoords[0]][startCoords[1]] = { value: "." };
  let loops = 0;

  const mainRes = main(input, true);
  if (!Array.isArray(mainRes)) {
    throw new Error("unknown main");
  }

  const defaultPath = mainRes.reduce((acc, cur) => {
    cur.forEach((cell) => {
      if (cell.visited && !cell.start && cell.value === ".") {
        acc.push(cell);
      }
    });
    return acc;
  }, []);
  const res: [number, number][] = [];

  defaultPath.forEach(({ y, x }, i) => {
    console.log("Progress", i, "/", defaultPath.length - 1);
    let newStart = structuredClone(startCoords);
    const mapClone = structuredClone(map);
    const clonedDirection = structuredClone(directions);
    mapClone[y][x] = {
      value: "#",
      directions: {
        up: false,
        right: false,
        down: false,
        left: false,
      },
    };

    let inMap = true;
    while (inMap) {
      inMap = false;
      for (const { indexes, value } of getNeighbours(mapClone, newStart[1], newStart[0], clonedDirection)) {
        inMap = true;
        if (value.value !== "#") {
          newStart = indexes;
          break;
        }
        clonedDirection.directions = turnRight(clonedDirection);

        if (haveVisited(value, clonedDirection)) {
          inMap = false;
          loops += 1;
          res.push([y + 1, x + 1]);
          break;
        }
        setUpdatedDirections(value, clonedDirection);
      }
    }
  });

  console.log(res);

  return loops;
}

function setUpdatedDirections(cell: Cell, guardDirection: GetNeighboursProps): Cell {
  (["up", "right", "down", "left"] as const).forEach((direction) => {
    if (cell.directions && guardDirection.directions) {
      cell.directions[direction] = !!guardDirection.directions[direction] || cell.directions[direction];
    }
  });
  return cell;
}

function haveVisited(cell: Cell, guardDirection: GetNeighboursProps): boolean {
  return (["up", "right", "down", "left"] as const).some(
    (direction) => guardDirection.directions?.[direction] && cell.directions?.[direction],
  );
}

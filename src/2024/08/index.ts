interface Node {
  x: number;
  y: number;
}

function* getCoords(nodeOne: Node, nodeTwo: Node): Generator<[number, number]> {
  const differenceX = Math.abs(nodeOne.x - nodeTwo.x);
  const differenceY = Math.abs(nodeOne.y - nodeTwo.y);

  if (nodeOne.x < nodeTwo.x) {
    if (nodeOne.y < nodeTwo.y) {
      yield [nodeOne.x - differenceX, nodeOne.y - differenceY];
      yield [nodeTwo.x + differenceX, nodeTwo.y + differenceY];
    }
  }
  if (nodeOne.x >= nodeTwo.x) {
    yield [nodeOne.x + differenceX, nodeOne.y - differenceY];
    yield [nodeTwo.x - differenceX, nodeTwo.y + differenceY];
  }
  if (nodeOne.y === nodeTwo.y) {
    yield [nodeOne.x - differenceX, nodeOne.y];
    yield [nodeTwo.x + differenceX, nodeTwo.y];
  }
}

export function main(input: string): number {
  const map = input.split("\n").map((row) => row.split(""));

  const matchingNodes = map.reduce<Record<string, Node[]>>((acc, row, y) => {
    row.forEach((cell, x) => {
      if (cell === ".") return;
      if (acc[cell] === undefined) {
        acc[cell] = [];
      }
      acc[cell].push({ x, y });
    });
    return acc;
  }, {});
  Object.values(matchingNodes).forEach((nodes) => {
    for (const [i, nodeOne] of Object.entries(nodes)) {
      for (const nodeTwo of nodes.slice(Number(i) + 1)) {
        for (const [x, y] of getCoords(nodeOne, nodeTwo)) {
          if (map[y]?.[x]) {
            map[y][x] = "#";
          }
        }
      }
    }
  });
  let sum = 0;
  let log = "";

  map.forEach((row) => {
    row.forEach((cell) => {
      if (cell === "#") {
        sum += 1;
      }
      log += cell;
    });
    log += "\n";
  });
  console.log(log);
  return sum;
}

export function main2(_input: string): number {
  return 0;
}

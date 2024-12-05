function getMiddlePart<T>(arr: T[]): T {
  const mid = Math.floor(arr.length / 2);

  // For odd length arrays, return the middle element
  return arr.slice(mid, mid + 1)[0];
}

export function main(input: string): number {
  const [orderingRulesStr, updatePagesStr] = input.split("\n\n");
  const orderingRules = orderingRulesStr.split("\n").map((row) => row.split("|").map(Number));
  const updatePages = updatePagesStr.split("\n").map((row) => row.split(",").map(Number).reverse());

  const rulesMap = orderingRules.reduce<Record<string, Set<number>>>((acc, [start, end]) => {
    if (acc[end] === undefined) {
      acc[end] = new Set();
    }
    acc[end].add(start);
    return acc;
  }, {});

  const correctUpdates = updatePages.filter((updatePage) => {
    let isValid = true;
    updatePage.forEach((num, idx) => {
      for (let i = idx + 1; i < updatePage.length; i++) {
        const val = updatePage[i];
        if (!rulesMap[num]?.has(val)) {
          isValid = false;
          break;
        }
      }
    });
    return isValid;
  });

  return correctUpdates.reduce((acc, cur) => acc + getMiddlePart(cur), 0);
}

export function main2(input: string): number {
  const [orderingRulesStr, updatePagesStr] = input.split("\n\n");
  const orderingRules = orderingRulesStr.split("\n").map((row) => row.split("|").map(Number));
  const updatePages = updatePagesStr.split("\n").map((row) => row.split(",").map(Number).reverse());

  const rulesMap = orderingRules.reduce<Record<string, Set<number>>>((acc, [start, end]) => {
    if (acc[end] === undefined) {
      acc[end] = new Set();
    }
    acc[end].add(start);
    return acc;
  }, {});

  const incorrectUpdates = updatePages.filter((updatePage) => {
    let isValid = true;
    updatePage.forEach((num, idx) => {
      for (let i = idx + 1; i < updatePage.length; i++) {
        const val = updatePage[i];
        if (!rulesMap[num]?.has(val)) {
          isValid = false;
          break;
        }
      }
    });
    return !isValid;
  });

  incorrectUpdates.forEach((updatePage)=>{
    updatePage.sort((a,b)=>{
      return rulesMap[a]?.has(b) ? 1 : -1
    })
  })

  return incorrectUpdates.reduce((acc, cur) => acc + getMiddlePart(cur), 0);
}

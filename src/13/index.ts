type NestedArray = number | Array<NestedArray | number>;

const isLeftSmallerOrEqual = (A: NestedArray, B: NestedArray): number => {
  if (!Array.isArray(A) || !Array.isArray(B)) {
    throw new Error(`invalid input: ${A} ${B}`);
  }
  const longest: number = A.length > B.length ? A.length : B.length;

  for (let i = 0; i < longest; i++) {
    const l = A[i];
    const r = B[i];

    if (typeof l === 'number' && typeof r === 'number') {
      if (l < r) return -1;
      if (l > r) return 1;
    } else if (typeof l === 'object' && typeof r === 'object') {
      const test = isLeftSmallerOrEqual(l, r);
      if (test !== 0) return test;
    } else if (typeof l === 'number' && typeof r === 'object') {
      const test = isLeftSmallerOrEqual([l], r);
      if (test !== 0) return test;
    } else if (typeof l === 'object' && typeof r === 'number') {
      const test = isLeftSmallerOrEqual(l, [r]);
      if (test !== 0) return test;
    } else if (l === undefined && r !== undefined) {
      return -1;
    } else if (l !== undefined && r === undefined) {
      return 1;
    }
  }

  return 0;
};
export const main = (input: string): unknown => {
  const groups = input.split('\n\n');

  return groups
    .map((group) => {
      const [A, B] = group.split('\n').map<NestedArray>((s) => JSON.parse(s));
      const val = isLeftSmallerOrEqual(A, B);
      return val === -1;
    })
    .reduce((acc, cur, i) => (cur ? acc + i + 1 : acc), 0);
};

export const main2 = (input: string): unknown => {
  const data = input.split('\n').filter(Boolean);
  data.push('[[2]]', '[[6]]');
  const sortedData = data
    .map((el) => JSON.parse(el))
    .sort(isLeftSmallerOrEqual)
    .map((el) => JSON.stringify(el));
  const indexOfSix = sortedData.indexOf('[[6]]') + 1;
  const indexOfTwo = sortedData.indexOf('[[2]]') + 1;
  return indexOfSix * indexOfTwo;
};

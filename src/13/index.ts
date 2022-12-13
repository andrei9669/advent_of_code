type NestedArray = number | Array<NestedArray | number>;

const isNumber = (el: unknown | number): el is number =>
  Number.isFinite(Number(el)) && !Array.isArray(el);

const isLeftSmallerOrEqual = (A: NestedArray, B: NestedArray): boolean => {
  if (!Array.isArray(A) || !Array.isArray(B)) {
    throw new Error(`invalid input: ${A} ${B}`);
  }
  let bump = false;
  if (A.length === 0) {
    return true;
  }
  const isSorE = A.every((a, i) => {
    const b = B[i];
    if (b === undefined) {
      return bump;
    }
    let left: NestedArray = a;
    let right: NestedArray = b;

    if (isNumber(left) && isNumber(right)) {
      return left <= right;
    }
    if (!isNumber(left) && isNumber(right)) {
      bump = true;
      return left[0] <= right;
      // right = [right];
    }
    if (!isNumber(right) && isNumber(left)) {
      left = [left];
    }
    return isLeftSmallerOrEqual(left, right);
  });
  return A.length <= B.length && isSorE;
};
export const main = (input: string): unknown => {
  const groups = input.split('\n\n');

  return groups
    .map((group) => {
      const [A, B] = group.split('\n').map<NestedArray>((s) => JSON.parse(s));
      return isLeftSmallerOrEqual(A, B);
    })
    .map((el, i) => ({ i: i + 1, el }))
    .filter((el) => el.el)
    .reduce((acc, cur) => acc + cur.i, 0);
};

export const main2 = (input: string): unknown => 0;

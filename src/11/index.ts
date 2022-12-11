const calculate = (a: number, b: number, operation: string): number => {
  switch (operation) {
    case '-':
      return a - b;
    case '+':
      return a + b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      throw new Error('invalid operation');
  }
};
export const main = (input: string): unknown => {
  const monkeys = input.split('\n\n').map((monkey) => {
    const [, startingItemsStr, operationStr, testStr, ifTrueStr, ifFalseStr] =
      monkey.split('\n');
    const [, , , , operationSymbol, operationParam] = operationStr
      .trim()
      .split(' ');
    const [, , ...startingItemsArr] = startingItemsStr.trim().split(' ');
    const items = startingItemsArr.join('').split(',').map(Number);

    const ifTrueArr = ifTrueStr.trim().split(' ');
    const ifTrue = Number(ifTrueArr[ifTrueArr.length - 1]);
    const ifFalseStrArr = ifFalseStr.trim().split(' ');
    const ifFalse = Number(ifFalseStrArr[ifFalseStrArr.length - 1]);
    const testArr = testStr.trim().split(' ');
    const test = Number(testArr[testArr.length - 1]);

    return {
      items,
      operationSymbol,
      operationParam,
      ifTrue,
      ifFalse,
      test,
      inspection: 0,
    };
  });

  new Array(20).fill('').forEach(() => {
    monkeys.forEach((monkey, i, arr) => {
      const { items, ifTrue, ifFalse, operationSymbol, operationParam, test } =
        monkey;
      let item = items.shift();
      while (item !== undefined) {
        let currentItem = item;
        // inspect
        monkey.inspection++;
        let param = currentItem;
        if (Number.isFinite(Number(operationParam))) {
          param = Number(operationParam);
        }
        // operation
        currentItem = calculate(currentItem, param, operationSymbol);
        // bored / relief
        currentItem = Math.floor(currentItem / 3);
        // test
        if (currentItem % test === 0) {
          arr[ifTrue].items.push(currentItem);
        } else {
          arr[ifFalse].items.push(currentItem);
        }
        item = items.shift();
      }
    });
  });
  const [one, two] = monkeys
    .map((monkey) => monkey.inspection)
    .sort((a, b) => b - a);
  return one * two;
};

export const main2 = (input: string): unknown => {
  const monkeys = input.split('\n\n').map((monkey) => {
    const [, startingItemsStr, operationStr, testStr, ifTrueStr, ifFalseStr] =
      monkey.split('\n');
    const [, , , , operationSymbol, operationParam] = operationStr
      .trim()
      .split(' ');
    const [, , ...startingItemsArr] = startingItemsStr.trim().split(' ');
    const items = startingItemsArr.join('').split(',').map(Number);

    const ifTrueArr = ifTrueStr.trim().split(' ');
    const ifTrue = Number(ifTrueArr[ifTrueArr.length - 1]);
    const ifFalseStrArr = ifFalseStr.trim().split(' ');
    const ifFalse = Number(ifFalseStrArr[ifFalseStrArr.length - 1]);
    const testArr = testStr.trim().split(' ');
    const test = Number(testArr[testArr.length - 1]);

    return {
      items,
      operationSymbol,
      operationParam,
      ifTrue,
      ifFalse,
      test,
      inspection: 0,
    };
  });

  new Array(10000).fill('').forEach((_, round) => {
    console.log(round);
    monkeys.forEach((monkey, i, arr) => {
      const { items, ifTrue, ifFalse, operationSymbol, operationParam, test } =
        monkey;
      let item = items.shift();
      while (item !== undefined) {
        // inspect
        monkey.inspection++;
        let currentItem = item;
        let param = currentItem;
        if (Number.isFinite(Number(operationParam))) {
          param = Number(operationParam);
        }
        // operation
        currentItem = calculate(currentItem, param, operationSymbol);
        // test
        if (currentItem % test === 0) {
          arr[ifTrue].items.push(currentItem);
        } else {
          arr[ifFalse].items.push(currentItem);
        }
        item = items.shift();
      }
    });
  });
  const inspections = monkeys
    .map((monkey) => monkey.inspection)
    .sort((a, b) => b - a);
  const [one, two] = inspections;
  return one * two;
};

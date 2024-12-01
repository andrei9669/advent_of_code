const wordToNumber: Record<string, string> = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

export const main = (input: string): number =>
  input
    .split('\n')
    .map((row) => {
      const rowRes = row.replace(/[^0-9]/g, '');
      return Number(`${rowRes.charAt(0)}${rowRes.charAt(rowRes.length - 1)}`);
    })
    .reduce((acc, cur) => acc + cur);

export const main2 = (input: string): number =>
  input
    .split('\n')
    .map((str) => {
      const regex =
        /(?=(zero|one|two|three|four|five|six|seven|eight|nine|[0-9]))/gi;
      const matches: string[] = [];
      let index = 0;

      while (index < str.length) {
        const match = regex.exec(str);
        if (match !== null) {
          const match1 = match[1];
          matches.push(wordToNumber[match1] ?? match1);
          index = match.index + 1;
          regex.lastIndex = index;
        } else {
          break;
        }
      }
      return Number(`${matches[0]}${matches[matches.length - 1]}`);
    })
    .reduce((acc, cur) => acc + cur);

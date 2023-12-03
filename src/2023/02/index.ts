import { multiply, sum } from '../../utility';

export const main = (input: string): number =>
  input
    .split('\n')
    .map((row) => {
      const rowMatch = row.match(/(Game (?<game>\d+):) (.+)/);
      if (!rowMatch) {
        return 0;
      }
      const [, , , rest] = rowMatch;
      const game = rowMatch.groups?.game;
      const isPossible = rest
        .split(';')
        .map((round) => {
          const [, red] = round.match(/(\d+) red/) ?? [];
          const [, green] = round.match(/(\d+) green/) ?? [];
          const [, blue] = round.match(/(\d+) blue/) ?? [];

          return !(
            Number(red ?? 0) > 12 ||
            Number(blue ?? 0) > 14 ||
            Number(green ?? 0) > 13
          );
        })
        .every(Boolean);
      return isPossible ? Number(game) : 0;
    })
    .reduce(sum);

export const main2 = (input: string): number =>
  input
    .split('\n')
    .map((row) => {
      const rowMatch = row.match(/(Game (?<game>\d+):) (?<rest>.+)/);
      if (!rowMatch?.groups) {
        return 0;
      }
      const { game, rest } = rowMatch.groups;
      const res = rest
        .split(';')
        .map((round) => {
          const [, red] = (round.match(/(\d+) red/) ?? []).map(Number);
          const [, green] = (round.match(/(\d+) green/) ?? []).map(Number);
          const [, blue] = (round.match(/(\d+) blue/) ?? []).map(Number);
          return { red, green, blue };
        })
        .reduce(
          (acc, { red, blue, green }) => {
            if (red > acc.red) {
              acc.red = red;
            }
            if (blue > acc.blue) {
              acc.blue = blue;
            }
            if (green > acc.green) {
              acc.green = green;
            }
            return acc;
          },
          { red: 0, green: 0, blue: 0 },
        );
      return Object.values(res).reduce(multiply);
    })
    .reduce(sum);

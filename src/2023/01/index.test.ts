import fs from 'fs';
import path from 'path';

import { main, main2 } from '.';

const testInput = fs.readFileSync(
  path.join(__dirname, 'testInput.txt'),
  'utf-8',
);
const testInput2 = fs.readFileSync(
  path.join(__dirname, 'testInput2.txt'),
  'utf-8',
);
const mainInput = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

describe('main', () => {
  it('test input', () => {
    expect(main(testInput)).toBe(142);
  });
  it('main input', () => {
    expect(main(mainInput)).toBe(54338);
  });
});
describe('main2', () => {
  it('test input', () => {
    expect(main2(testInput2)).toBe(281);
  });
  it('main input', () => {
    expect(main2(mainInput)).toBe(53389);
  });
});

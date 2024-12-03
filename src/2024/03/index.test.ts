import fs from 'fs';
import path from 'path';

import { main, main2 } from '.';

const testInput = fs.readFileSync(
  path.join(__dirname, 'testInput.txt'),
  'utf-8',
);
const mainInput = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

describe('main', () => {
  it('test input', () => {
    expect(main(testInput)).toBe(161);
  });
  it('main input', () => {
    expect(main(mainInput)).toBe(171183089);
  });
});
describe('main2', () => {
  it('test input', () => {
    expect(main2(testInput)).toBe(48);
  });
  it('main input', () => {
    expect(main2("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don't()do()mul(1,2)don't()do()mul(1,2)")).not.toBe(52);
    expect(main2(mainInput)).not.toBe(63247111);
    expect(main2(mainInput)).toBeGreaterThan(57374242);
    expect(main2(mainInput)).toBe(0);
  });
});

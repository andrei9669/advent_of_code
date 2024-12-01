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
    expect(main(testInput)).toBe(11);
  });
  it('main input', () => {
    expect(main(mainInput)).toBe(2769675);
  });
});
describe('main2', () => {
  it('test input', () => {
    expect(main2(testInput)).toBe(31);
  });
  it('main input', () => {
    expect(main2(mainInput)).toBe(24643097);
  });
});

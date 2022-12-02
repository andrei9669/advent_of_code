import fs from 'fs';
import path from 'path';

import { main, main2 } from '.';

const testInput = fs.readFileSync(
  path.join(__dirname, 'testInput.txt'),
  'utf-8',
);
const mainInput = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

describe('main1', () => {
  it('test input', () => {
    expect(main(testInput)).toBe(15);
  });
  it('main input', () => {
    expect(main(mainInput)).toBe(14375);
  });
});
describe('main2', () => {
  it('test input', () => {
    expect(main2(testInput)).toBe(12);
  });
  it('main input', () => {
    expect(main2(mainInput)).toBe(10274);
  });
});

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
    expect(main(testInput)).toBe(24000);
  });
  it('main input', () => {
    expect(main(mainInput)).toBe(71023);
  });
});
describe('main2', () => {
  it('test input', () => {
    expect(main2(testInput)).toBe(45000);
  });
  it('main input', () => {
    expect(main2(mainInput)).toBe(206289);
  });
});

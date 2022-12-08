import fs from 'fs';
import path from 'path';

import { main, main2 } from '.';

const testInput = fs.readFileSync(
  path.join(__dirname, 'testInput.txt'),
  'utf-8',
);

const mainInput = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

describe('day 8', () => {
  describe('part 1', () => {
    it('test input', () => {
      expect(main(testInput)).toBe(21);
    });
    it('main input', () => {
      expect(main(mainInput)).toBe(1546);
    });
  });
  describe('part 2', () => {
    it('test input', () => {
      expect(main2(testInput)).toBe(8);
    });
    it('main input', () => {
      expect(main2(mainInput)).toBe(519064);
    });
  });
});

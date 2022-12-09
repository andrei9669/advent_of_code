import fs from 'fs';
import path from 'path';

import { main, main2 } from '.';

const testInput = fs
  .readFileSync(path.join(__dirname, 'testInput.txt'), 'utf-8')
  .split('\n\n');

const mainInput = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

describe('day 9', () => {
  describe('part 1', () => {
    it('test input', () => {
      expect(main(testInput[0])).toBe(13);
    });
    it('main input', () => {
      expect(main(mainInput)).toBe(6018);
    });
  });
  describe('part 2', () => {
    it('test input1', () => {
      expect(main2(testInput[0])).toBe(1);
    });
    it('test input2', () => {
      // 31
      expect(main2(testInput[1])).toBe(36);
    });
    it('main input', () => {
      expect(main2(mainInput)).toBe(2619);
    });
  });
});

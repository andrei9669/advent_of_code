import fs from 'fs';
import path from 'path';

import { main, main2 } from '.';

const testInput = fs.readFileSync(
  path.join(__dirname, 'testInput.txt'),
  'utf-8',
);

const mainInput = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
jest.setTimeout(999999999);

describe('day 9', () => {
  describe('part 1', () => {
    it('test input', async () => {
      expect(await main(testInput)).toBe(31);
    });
    it('main input', async () => {
      // 212 too low
      expect(await main(mainInput)).toBe(520);
    });
  });
  describe('part 2', () => {
    it('test input1', () => {
      expect(main2(testInput)).toBe(0);
    });
    it('main input', () => {
      expect(main2(mainInput)).toBe(0);
    });
  });
});

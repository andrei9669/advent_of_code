import fs from 'fs';
import path from 'path';

import { main, main2 } from './index';

const testInput = fs.readFileSync(
  path.join(__dirname, 'testInput.txt'),
  'utf-8',
);

const mainInput = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
jest.setTimeout(999999999);

describe('day 9', () => {
  describe('part 1', () => {
    it('test input', () => {
      expect(main(testInput)).toBe(13);
    });
    it('main input', () => {
      expect(main(mainInput)).toBe(6101);
    });
  });
  describe('part 2', () => {
    it('test input1', () => {
      expect(main2(testInput)).toBe(140);
    });
    it('main input', () => {
      expect(main2(mainInput)).toBe(21909);
    });
  });
});

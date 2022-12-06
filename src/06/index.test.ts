import fs from 'fs';
import path from 'path';

import { main, main2 } from '.';

const [testInput, testInput1, testInput2, testInput3, testInput4] = fs
  .readFileSync(path.join(__dirname, 'testInput.txt'), 'utf-8')
  .split('\n');

const mainInput = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

describe('main1', () => {
  it('test input1', () => {
    expect(main(testInput1)).toBe(5);
  });
  it('test input2', () => {
    expect(main(testInput2)).toBe(6);
  });
  it('test input3', () => {
    expect(main(testInput3)).toBe(10);
  });
  it('test input4', () => {
    expect(main(testInput4)).toBe(11);
  });
  it('main input', () => {
    expect(main(mainInput)).toBe(1658);
  });
});
describe('main2', () => {
  it('test input', () => {
    expect(main2(testInput)).toBe(19);
  });
  it('test input1', () => {
    expect(main2(testInput1)).toBe(23);
  });
  it('test input2', () => {
    expect(main2(testInput2)).toBe(23);
  });
  it('test input3', () => {
    expect(main2(testInput3)).toBe(29);
  });
  it('test input4', () => {
    expect(main2(testInput4)).toBe(26);
  });
  it('main input', () => {
    expect(main2(mainInput)).toBe(2260);
  });
});

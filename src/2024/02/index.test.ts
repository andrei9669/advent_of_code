import fs from "fs";
import path from "path";

import { main, main2 } from ".";

const testInput = fs.readFileSync(
  path.join(__dirname, "testInput.txt"),
  "utf-8",
);
const mainInput = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

describe("main", () => {
  it("test input", () => {
    expect(main(testInput)).toBe(2);
  });
  it("main input", () => {
    expect(main(mainInput)).toBe(402);
  });
});
describe("main2", () => {
  it("test input", () => {
    expect(main2(testInput)).toBe(4);
  });
  it("main input", () => {
    expect(main2("5 4 3 2 1 2")).toBe(1);
    expect(main2("4 5 4 3 2 1")).toBe(1);

    expect(main2("58 59 62 63 64 63")).toBe(1);
    expect(main2("89 92 95 93 94 97 98")).toBe(1);

    expect(main2("1 1 2 3 4")).toBe(1);
    expect(main2("1 2 3 3 4")).toBe(1);
    expect(main2("1 2 3 4 4")).toBe(1);

    expect(main2("4 4 3 2 1")).toBe(1);
    expect(main2("4 3 3 2 1")).toBe(1);
    expect(main2("4 3 2 1 1")).toBe(1);

    expect(main2("1 2 6 4 5")).toBe(1);
    expect(main2("6 2 3 4 5")).toBe(1);
    expect(main2("1 2 3 4 9")).toBe(1);

    expect(main2("5 4 3 2 6")).toBe(1);
    expect(main2("1 2 3 4 9")).toBe(1);
    expect(main2("9 2 3 4 5")).toBe(1);

    expect(main2("1 2 3 500 4")).toBe(1);
    expect(main2("1 2 3 0 4")).toBe(1);
    expect(main2("1 9 10 11")).toBe(1);

    expect(main2(mainInput)).toBeGreaterThan(418);
    expect(main2(mainInput)).toBeGreaterThan(434);
    expect(main2(mainInput)).toBeGreaterThan(436);
    expect(main2(mainInput)).toBeGreaterThan(452);
    expect(main2(mainInput)).toBe(455);
  });
});

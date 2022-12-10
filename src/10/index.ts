const cycleMeasurementPoints = [20, 60, 100, 140, 180, 220];
export const main = (input: string): unknown => {
  const rows = input.split('\n').map((row) => row.split(' '));
  let registry = 1;
  let cycle = 0;
  const strengths: number[] = [];
  rows.forEach(([command, num]) => {
    cycle++;
    if (cycleMeasurementPoints.includes(cycle)) {
      strengths.push(cycle * registry);
    }
    if (command === 'addx') {
      cycle++;
      if (cycleMeasurementPoints.includes(cycle)) {
        strengths.push(cycle * registry);
      }
      registry += Number(num);
    }
  });
  return strengths.reduce((acc, cur) => acc + cur);
};
class CRT {
  cycle: Cycle;

  screen: string[][] = [];

  row = 0;

  pointer = 1;

  constructor(cycle: Cycle) {
    this.cycle = cycle;
  }

  draw() {
    const x = (this.cycle.cycle - 1) % 40;
    const draw = Math.abs(x - this.pointer) < 2;
    if (this.screen[this.row] === undefined) {
      this.screen[this.row] = [];
    }

    this.screen[this.row][x] = draw ? '#' : '.';
  }
}
class Cycle {
  crt = new CRT(this);

  private _cycle = 0;

  get cycle(): number {
    return this._cycle;
  }

  set cycle(value: number) {
    this._cycle = value;
    if (this._cycle % 40 === 0) {
      this.crt.row++;
    }
  }
}

export const main2 = (input: string): unknown => {
  const cycle = new Cycle();
  const { crt } = cycle;
  const rows = input.split('\n').map((row) => row.split(' '));
  rows.forEach(([command, num]) => {
    cycle.cycle++;
    if (command === 'addx') {
      crt.draw();
      cycle.cycle++;
      crt.draw();
      crt.pointer += Number(num);
    } else {
      crt.draw();
    }
  });
  let res = '';
  crt.screen.forEach((row) => {
    res += `${row.join('')}\n`;
  });
  return res;
};

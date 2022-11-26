import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const [a, b] = input.split('\n').map(Number);

export const sum = (): number => a + b;

/*
.js --> utiliza CommonJS
.mjs --> utiliza ES Modules
.cjs --> utiliza CommonJS
*/

import { sum, sub, mult } from './operations.mjs';

console.log(sum(1, 2)); // 3
console.log(sub(1, 2)); // -1
console.log(mult(1, 2)); // 2
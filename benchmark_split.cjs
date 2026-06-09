const { performance } = require('perf_hooks');

const runs = 10000000;
const str = "123.45";

console.time('split');
for (let i = 0; i < runs; i++) {
  const parts = str.split('.');
  const a = Number(parts[0]);
  const b = Number(parts[1]);
}
console.timeEnd('split');

console.time('indexOf');
for (let i = 0; i < runs; i++) {
  const dotIdx = str.indexOf('.');
  const a = parseInt(str, 10);
  const b = Number(str.slice(dotIdx + 1));
}
console.timeEnd('indexOf');

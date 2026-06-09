const runs = 10000000;
const keys = ["12.34", "1.2", "999.888"];

console.time('split');
for (let i = 0; i < runs; i++) {
  const targetCompKey = keys[i % 3];
  let targetCompIdx = null;
  const parts = targetCompKey.split('.');
  if (parts.length === 2) {
    const parsed = Number(parts[1]);
    if (Number.isFinite(parsed)) targetCompIdx = parsed;
  }
}
console.timeEnd('split');

console.time('indexOf');
for (let i = 0; i < runs; i++) {
  const targetCompKey = keys[i % 3];
  let targetCompIdx = null;
  const dotIdx = targetCompKey.indexOf('.');
  if (dotIdx !== -1) {
    const parsed = Number(targetCompKey.slice(dotIdx + 1));
    if (Number.isFinite(parsed)) targetCompIdx = parsed;
  }
}
console.timeEnd('indexOf');

const runs = 10000000;
const keys = ["12.34", "1.2", "999.888"];

console.time('split');
for (let i = 0; i < runs; i++) {
  const partnerKey = keys[i % 3];
  const [partnerMolStr] = partnerKey.split('.');
  const partnerMolIdx = Number(partnerMolStr);
}
console.timeEnd('split');

console.time('parseInt');
for (let i = 0; i < runs; i++) {
  const partnerKey = keys[i % 3];
  const partnerMolIdx = parseInt(partnerKey, 10);
}
console.timeEnd('parseInt');

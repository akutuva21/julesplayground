const runs = 10000000;
const names = ["Species@Compartment(state=1)", "SimpleSpecies", "Complex(a=1,b=2)@Membrane"];

console.time('split');
for (let i = 0; i < runs; i++) {
  const name = names[i % 3];
  const cleaned = name.split('@')[0].split('(')[0];
}
console.timeEnd('split');

console.time('indexOf');
for (let i = 0; i < runs; i++) {
  const name = names[i % 3];
  let cleaned = name;
  const atIdx = cleaned.indexOf('@');
  if (atIdx !== -1) cleaned = cleaned.slice(0, atIdx);
  const parenIdx = cleaned.indexOf('(');
  if (parenIdx !== -1) cleaned = cleaned.slice(0, parenIdx);
}
console.timeEnd('indexOf');

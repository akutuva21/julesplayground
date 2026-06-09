const runs = 10000000;
const names = ["@Compartment", "Species@Compartment", "SimpleSpecies"];

console.time('split');
for (let i = 0; i < runs; i++) {
  const speciesName = names[i % 3];
  let compName = null;
  if (speciesName.startsWith('@')) {
    const colonIdx = speciesName.indexOf(':');
    if (colonIdx > 0) compName = speciesName.substring(1, colonIdx);
  }
  if (!compName) {
    const parts = speciesName.split('@');
    if (parts.length > 1) compName = parts[parts.length - 1].trim();
  }
}
console.timeEnd('split');

console.time('lastIndexOf');
for (let i = 0; i < runs; i++) {
  const speciesName = names[i % 3];
  let compName = null;
  if (speciesName.startsWith('@')) {
    const colonIdx = speciesName.indexOf(':');
    if (colonIdx > 0) compName = speciesName.substring(1, colonIdx);
  }
  if (!compName) {
    const atIdx = speciesName.lastIndexOf('@');
    if (atIdx !== -1 && atIdx < speciesName.length - 1) {
      compName = speciesName.slice(atIdx + 1).trim();
    }
  }
}
console.timeEnd('lastIndexOf');

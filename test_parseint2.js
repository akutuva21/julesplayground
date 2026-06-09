const targetCompKey = "12.34";
const dotIdx = targetCompKey.indexOf('.');
const parsed = Number(targetCompKey.slice(dotIdx + 1));
console.log(parsed); // 34

const mIdx = parseInt(targetCompKey, 10);
console.log(mIdx); // 12

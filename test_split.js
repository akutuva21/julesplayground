const str = "123.45";
console.log(parseInt(str, 10)); // 123
const dotIdx = str.indexOf('.');
console.log(Number(str.slice(dotIdx + 1))); // 45

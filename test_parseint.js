const str = "123.45";
console.log(parseInt(str, 10)); // 123
console.log(Number.isFinite(parseInt(str, 10)));
console.log(parseInt("123", 10)); // 123
console.log(parseInt("abc.45", 10)); // NaN

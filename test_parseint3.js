const str = "12";
const mIdx = parseInt(str, 10);
console.log(mIdx); // 12
const dotIdx = str.indexOf('.');
console.log(dotIdx); // -1
if (dotIdx !== -1) {
    console.log(Number(str.slice(dotIdx + 1)));
}

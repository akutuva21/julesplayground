const Benchmark = require('benchmark'); // Might not be available, let's just use console.time
const iterations = 1000000;
const str = "A, B, C , D ,E  , F,  G  , H, I, J, K";

function splitMapFilter() {
    return str.split(',').map(p => p.trim()).filter(Boolean);
}

function indexOfSlice() {
    let patterns = [];
    let start = 0;
    while (true) {
        let comma = str.indexOf(',', start);
        if (comma === -1) {
            let p = str.slice(start).trim();
            if (p) patterns.push(p);
            break;
        }
        let p = str.slice(start, comma).trim();
        if (p) patterns.push(p);
        start = comma + 1;
    }
    return patterns;
}

console.log(splitMapFilter());
console.log(indexOfSlice());

const t1 = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
    splitMapFilter();
}
const t2 = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
    indexOfSlice();
}
const t3 = process.hrtime.bigint();

console.log(`splitMapFilter: ${Number(t2 - t1) / 1000000} ms`);
console.log(`indexOfSlice: ${Number(t3 - t2) / 1000000} ms`);

console.log('>> MAPS');
// Order guaranteed
const profiles = new Map();
profiles.set('email', 'victor@email.com');
profiles.set('facebook', 'victoraweb');
console.log(profiles.has('email'));
console.log(profiles.size);

console.log('Result from Map of properties');
for(const entry of profiles) {
    console.log(entry);
}

const funcs = new Map();

const double = (number) => number * number;
const cube = (number) => number * number * number;

funcs.set(double, 3);
funcs.set(cube, 2);

console.log('Result from map of functions');
for(const entry of funcs) {
    console.log(entry[0](entry[1]));
}

console.log('>> SETS');
// Unique values only
const set = new Set([0, 1, 2, 3]);
set.add(4);
set.add(4);
set.add(double);
console.log(set);
set.delete(1);
console.log(set.has(1));
for(const entry of set) {
    console.log(entry);
}

console.log('>> WEAKMAP')
// WeakMap has the same methods of a Map
// There is no way to iterate over all items
// It can only have objects as keys
// Gets removed by garbage collector when the only element inside is inside WeakMap
let person = {};
const wMap = new WeakMap();
wMap.set(person, { name: 'victor' });
console.log(wMap.get(person));
console.log(wMap.has(person));
person = undefined;
console.log(wMap.has(person));
// To allow this run: node --expose-gc <file>.js
// global.gc(); // Forces gc
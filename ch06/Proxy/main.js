const person = require('./Person');

const px = new Proxy(person('victor'), {
    get: (target) => target.name.toUpperCase()
});

console.log(px.name);
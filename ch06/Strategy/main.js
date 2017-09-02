const Config     = require('./ConfigContext');
const strategies = require('./strategies');

const c = new Config(strategies.json);
const r = c.read('/Users/victoraweb/node-design-patterns-book-lab/ch06/Strategy/sampleFile.json');
console.log(r);
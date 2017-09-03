const jsonConfig = require('./JsonConfig');

const j = jsonConfig();
const data = JSON.stringify({ name: 'victor' });
console.log(j._deserialize(data));
console.log(j.hello());
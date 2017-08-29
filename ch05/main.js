const WriteHere = require('./WriteHere');
const ReadFromHere = require('./ReadFromHere');
const stream    = require('stream');

const writeHere = new WriteHere();
const myObj = { id: 1, name: 'Victor Augusto', age: 26 };

writeHere.on('data', chunk => console.log(chunk));

// writeHere.write(myObj);
// writeHere.end();

const myObjAsBuffer = new Buffer(JSON.stringify(myObj));
const reader = new ReadFromHere();

reader.read(myObj)

reader.pipe(writeHere);

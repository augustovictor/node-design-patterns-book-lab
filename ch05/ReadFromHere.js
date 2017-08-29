const stream = require('stream');

class ReadFromHere extends stream.Readable {
    constructor() {
        super({ objectMode: true });
    }

    _read(chunk) {
        this.push(chunk);
    }
}

module.exports = ReadFromHere;
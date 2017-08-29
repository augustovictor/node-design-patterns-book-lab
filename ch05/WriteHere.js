const stream = require('stream');

class WriteHere extends stream.Transform {
    constructor() {
        super({ objectMode: true });
        this.tailPiece = '';
    }

    _transform(chunk, encoding, done) {
        chunk.name = chunk.name + ' (Changed)';
        chunk = JSON.stringify(chunk);
        this.push(chunk);
        done();
    }
}

module.exports = WriteHere;
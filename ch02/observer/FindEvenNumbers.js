const EventEmitter = require('events').EventEmitter;

class FindEvenNumbers extends EventEmitter {
    constructor(numbersArr) {
        super();
        this.numbersArr = numbersArr;
    }

    find() {
        setImmediate(() => {
            for(const el of this.numbersArr) {
                if(el >= 7) {
                    return this.emit('error', new Error('Numbers higher than 6 are not allowed.'));
                }
                if(el % 2 === 0) this.emit('even', el);
            }
        });
        return this;
    }
}

module.exports = FindEvenNumbers;
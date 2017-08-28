class AsyncOperation {
    constructor() {}

    execute(func) {
        return setImmediate(func);
    }

    executeLongOperation(secondsItWillTake, error = null, param = null, callback = null) {
        console.log(`Scheduling operation that takes ${secondsItWillTake} sec`);
        return setTimeout(() => {
            console.log(`Running operation ${ secondsItWillTake }`);
            (callback && param) ? callback(error, param) : false;
            if(param) return param;
        }, 1000 * secondsItWillTake);
    }

    executeLog(value) {
        return setImmediate(() => {
            console.log(value);
        });
    }
}

module.exports = AsyncOperation;
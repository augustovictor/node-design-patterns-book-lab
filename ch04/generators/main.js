const fs = require('fs');
const processes = require('./processes');
const database = require('./all');

const getDataAsync = (data, cb) => {
    process.nextTick(() => cb(data));
};

const res = getDataAsync(processes, console.log);
console.log(`Result of res: ${res}`);

const getTasksByProcessId = function* (processId) {
    const tasks = yield getDataAsync(database);
};
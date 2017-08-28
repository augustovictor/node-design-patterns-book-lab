const fs = require('fs');
const processesDb = require('./processes');
const database = require('./all');

const fetchData = data => new Promise(resolve => process.nextTick(resolve(data)));

// const processes = fetchData(processesDb);

// processes.then(console.log);

const execAsync = function* (func) {
    const result = yield func;
    yield result;
};

const getTasksFromFirstProcess = () => {
    const tasks = execAsync(fetchData(processesDb)).next();
    tasks.value.then(console.log)
    console.log(tasks.done);
    console.log('done');
};

getTasksFromFirstProcess();
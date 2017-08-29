const fs = require('fs');
const processesDb = require('./processes');
const database = require('./all');

const fetchData = data => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => resolve(data));
        // process.nextTick(() => reject('An error occurred'));
    });
};

const getTasksFromFirstProcess = async () => {
    try{
        return await fetchData(processesDb);
    } catch(e) {
        return e;
    }
};

getTasksFromFirstProcess()
    .then(console.log)
    .catch(console.log);

// nodemon --exec node_modules/.bin/babel-node --plugins "syntax-async-functions,transform-async-to-generator" ch04/generators/main.js
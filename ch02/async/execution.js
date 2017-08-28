// Simulating async operations in series
// One executing after other finishes
// One error will stop all execution

const AsyncOperation = require('../../AsyncOperation');
const async = require('async');
const a = new AsyncOperation();
let error;
error = new Error('Some error occurred');

// The problem with the following approach is that we can invoke the operations as many
// times as we want. Until the SO run out of resources
// a.execute(() => console.log('a'));
// a.executeLog('asdfasf');
// a.executeLongOperation(1);
// a.executeLongOperation(2);

// By using async.series we can run one operation at a time
// To this method we have to know in advance which methods we want to execute
// async.series({
//     firOp: callback => a.executeLongOperation(1, null, 'func 1', callback),
//     secOp: callback => a.executeLongOperation(1, error, 'func 2', callback),
//     thiOp: callback => a.executeLongOperation(1, null, 'func 3', callback)
// }, (err, results) => {
//     console.log('All finished.');
//     console.log(results);
// });

// To run an unlimited parallel flow we must use async.each
let values   = [];
let randomNumber = Math.floor(Math.random() * 10) + 1;
for(let i = 0; i < randomNumber; i++) {
    const random = Math.floor(Math.random() * 10) + 1;
    values.push(() => i * random);
}
async.each(values, (value, callback) => {
    a.executeLog(value);
}, callback);
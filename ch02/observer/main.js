const EventEmitter = require('events').EventEmitter;
const FindEvenNumbers = require('./FindEvenNumbers');

const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
const findEvenNumbersInstance = new FindEvenNumbers(numbers);

findEvenNumbersInstance.find()
    .on('even', el => console.log(`This number is even: ${el}`))
    .on('error', err => console.log(`We also handled this error: ${err}`));

process.on('uncaughtException', err => {
    console.log(`This is an uncaughtException: ${err}`);
    process.exit(1);
});


// const findEvenNumbers = (arr) => {
//     const emitter = new EventEmitter();
//     // Async operation
//     setImmediate(function() {
//         for(const el of arr) {
//             if(el === 7) return emitter.emit('error', new Error('Error throw by us'));
//             if(el % 2 === 0) {
//                 emitter.emit('even', el);
//             }
//         }
//     });
//     return emitter;
// };

// findEvenNumbers(numbers)
//     .on('even', el => {
//         console.log(`This number is even: ${el}`);
//     }).on('error', e => console.log(`Custom error: ${e}`));
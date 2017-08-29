const co = require('co');

co(function *() {
    const res = yield Promise.resolve();
});
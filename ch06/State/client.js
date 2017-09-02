const failsafeSocket = require('./FailsafeSocket');

const f = failsafeSocket({ port: 5000 });

setInterval(() => {
    f.send(process.memoryUsage());
}, 1000);
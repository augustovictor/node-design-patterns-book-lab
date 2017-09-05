const zmq = require('zmq');

const ZmqMiddlewareManager = require('./ZmqMiddlewareManager');
const jsonMiddleware = require('./jsonMiddleware');

const request = zmq.socket('req');
request.connect('tcp://127.0.0.1:5000');

const zmqm = ZmqMiddlewareManager(request);
zmqm.use(jsonMiddleware.json());

zmqm.use({
    inbound: function (msg, next) {
        console.log(`Echoed back: ${ msg.data }`);
        next();
    }
});

setInterval(() => {
    zmqm.send({
        action: 'ping',
        echo: Date.now()
    });
}, 1000);
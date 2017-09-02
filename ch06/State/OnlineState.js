const jot = require('json-over-tcp');

function onlineState(failSafeSocket) {
    function OnlineState(failSafeSocket) {
        this.failSafeSocket = failSafeSocket;
    }

    OnlineState.prototype.send = function(data) {
        console.log(`Sending data (Online): ${data}`);
        this.failSafeSocket.socket.write(data);
    }

    OnlineState.prototype.activate = function() {
        this.failSafeSocket.queue.forEach(el => {
            this.send(el);
        });
        this.failSafeSocket.queue = [];

        this.failSafeSocket.socket.once('error', () => {
            this.failSafeSocket.changeState('offline');
        });
    }

    return new OnlineState(failSafeSocket);
}

module.exports = onlineState;
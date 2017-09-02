const jot = require('json-over-tcp');

function offlineState(failSafeSocket) {
    function OfflineState(failSafeSocket) {
        this.failSafeSocket = failSafeSocket;
    }
    
    OfflineState.prototype.send = function(data) {
        console.log(`Sending data (Offline): ${data}`);
        this.failSafeSocket.queue.push(data);
    }
    
    OfflineState.prototype.activate = function () {
        const retry = () => setTimeout(() => this.activate(), 500);

        this.failSafeSocket.socket = jot.connect(
            this.failSafeSocket.options,
            () => {
                this.failSafeSocket.socket.removeListener('error', retry);
                this.failSafeSocket.changeState('online');
            }
        );

        this.failSafeSocket.socket.once('error', retry);
    }

    return new OfflineState(failSafeSocket);
}

module.exports = offlineState;
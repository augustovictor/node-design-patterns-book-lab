const OfflineState = require('./OfflineState');
const OnlineState  = require('./OnlineState');

function failSafeSocket(options) {
    function FailSafeSocket(options) {
        this.options      = options;
        this.queue        = [];
        this.currentState = null;
        this.socket       = null;
        this.states       = {
            offline: OfflineState(this),
            online : OnlineState(this)
        };
        this.changeState('offline');
    }

    FailSafeSocket.prototype.changeState = function(state) {
        console.log(`Activating state ${ state }`);
        this.currentState = this.states[state];
        this.currentState.activate();
    }

    FailSafeSocket.prototype.send = function(data) {
        this.currentState.send(data);
    }

    return new FailSafeSocket(options);
}

module.exports = failSafeSocket;
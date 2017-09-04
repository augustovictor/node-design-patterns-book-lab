function zmqMiddlewareManager(socket) {
    function ZmqMiddlewareManager(socket) {
        this.socket = socket;
        this.inboundMiddleware = [];
        this.outboundMiddleware = [];

        socket.on('message', data => {
            this.executeMiddleware(this.inboundMiddleware, { data });
        });
    }

    ZmqMiddlewareManager.prototype.send = function(data) {
        const msg = { data };

        this.executeMiddleware(this.outboundMiddleware, msg, () => {
            this.socket.send(msg.data);
        });
    }

    ZmqMiddlewareManager.prototype.use = function(middleware) {
        if(middleware.inbound) this.inboundMiddleware.push(middleware.inbound);
        if(middleware.outbound) this.outboundMiddleware.unshift(middleware.outbound);
    }

    ZmqMiddlewareManager.prototype.executeMiddleware = function(middleware, arg, finish) {
        function iterator(index) {
            if(index === middleware.length) {
                return finish && finish();
            }
            middleware[index].call(this, arg, err => {
                if(err) return console.log(`We got an error when executing middleware: ${err}`);
                iterator.call(this, ++index);
            });
        }

        iterator.call(this, 0);
    }

    return new ZmqMiddlewareManager(socket);
}

module.exports = zmqMiddlewareManager;
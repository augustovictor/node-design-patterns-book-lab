module.exports = () => {
    return {
        inbound: function(msg, next) {
            msg.data = JSON.parse(msg.data.toString());
            next();
        },
        outbound: function(msg, next) {
            msg.data = new Buffer(JSON.stringify(msg.data));
            next();
        }
    };
}
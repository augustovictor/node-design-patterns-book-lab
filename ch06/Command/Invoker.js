function invoker() {
    function Invoker() {
        this.history = [];
    };

    Invoker.prototype.run = function (cmd) {
        this.history.push(cmd);
        cmd();
        console.log('Command executed: ', cmd.serialize());
    };

    Invoker.prototype.delay = function (cmd, delay) {
        setTimeout(() => {
            this.run(cmd);
        }, delay);
    };

    Invoker.prototype.undo = function () {
        const cmd = this.history.pop();
        cmd.undo();
        console.log('Command undone: ', cmd.serialize());
    }

    Invoker.prototype.runRemotely = function (cmd) {
        const cmdSerialized = { json: cmd.serialize() };
        request.post('http://localhost:3000/cmd', cmdSerialized, (err) => {
            console.log('Command executed remotely: ', cmd.serialize());
        });
    }

    return new Invoker();
};

module.exports = invoker;
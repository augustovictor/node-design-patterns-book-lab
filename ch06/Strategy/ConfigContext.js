const fs = require('fs');

function config(strategy) {
    function Config(strategy) {
        this._data = {};
        this._strategy = strategy;
    }

    Config.prototype.read = function(file) {
        console.log(`Deserializing file: ${file}`)
        this._data = this._strategy.deserialize(fs.readFileSync(file, 'utf-8'));
        return this._data;
    }

    return new Config(strategy);
};

module.exports = config;
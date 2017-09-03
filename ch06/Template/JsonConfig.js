const configTemplate = require('./ConfigTemplate');

function jsonConfig() {
    const proto = Object.getPrototypeOf(configTemplate());
    function JsonConfig() {}

    JsonConfig.prototype = Object.create(proto);
    
    JsonConfig.prototype._deserialize = function(data) {
        return JSON.parse(data);
    }

    return new JsonConfig();
}

module.exports = jsonConfig;
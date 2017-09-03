const fs = require('fs');

function configTemplate() {
    function ConfigTemplate() {}

    ConfigTemplate.prototype.read = function(file) {
        console.log(`Deserializing file ${ file }`);
        this.data = this._deserialize(fs.readFileSync(file, 'utf-8'));
    }

    ConfigTemplate.prototype.hello = function() {
        return 'Hello';
    }

    ConfigTemplate.prototype._deserialize = function() {
        throw new Error('_deserialize must be implemented');
    }

    return new ConfigTemplate();
}

module.exports = configTemplate;
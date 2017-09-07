const level = require('level');
const subLevel = require('level-sublevel');

module.exports = serviceLocator => {
    const dbName = serviceLocator.get('dbName');
    return subLevel(level(dbName, { valueEncoding: 'json' }));
};
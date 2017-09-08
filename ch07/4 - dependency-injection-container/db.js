const level = require('level');
const subLevel = require('level-sublevel');

module.exports = dbName => subLevel(level(dbName, { valueEncoding: 'json' }))
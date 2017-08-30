const stampit = require('stampit');

const character = stampit().props({
    name: 'anonym',
    lifePoinst: 100,
    x: 0,
    y: 0
});

module.exports = character;
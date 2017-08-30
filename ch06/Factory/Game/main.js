// BEHAVIORS:

// Character: base character that has life points, a position, and a name
// Mover: character that is able to move
// Slasher: character that is able to slash
// Shooter: character that is able to shoot (as long as it has bullets!)

// CLASSES
// Runner: a character that can move
// Samurai: a character that can move and slash
// Sniper: a character that can shoot (it doesn't move)
// Gunslinger: a character that can move and shoot
// Western Samurai: a character that can move, slash, and shoot

const s = require('stampit');
const character = require('./Behaviors/Character');
const mover = require('./Behaviors/Mover');

const c = character();
c.name = 'Victor';
console.log(c);

const runner = s.compose(character, mover);

const r = runner();
r.name = 'Victor Runner';
r.move(2, 2);
console.log(r);
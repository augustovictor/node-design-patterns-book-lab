const s = require('stampit');

const mover = s().methods({
    move(xInc, yInc) {
        this.x += xInc;
        this.y += yInc;
        console.log(`${ this.name } moved to [${ this.x }, ${ this.y }]`)
    }
});

module.exports = mover;
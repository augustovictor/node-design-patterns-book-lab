const Roee = require('./Roee');

const r = new Roee(emit => {
    let tickCount = 0;
    setInterval(() => emit('tick', tickCount++), 1000);
});
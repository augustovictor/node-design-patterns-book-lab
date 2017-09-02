const DecoratorComp = require('./Decorator-composition');
const DecoratorAugm = require('./Decorator-augmenting');
const Greeter       = require('../../Greeter');

const g = Greeter();
g.hello();

const d = DecoratorComp(g);
d.hello();
d.bye();

const aug = DecoratorAugm(g);
aug.bye();
aug.yell();
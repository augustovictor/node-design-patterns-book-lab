function decorator(component) {
    const proto = Object.getPrototypeOf(component);
    
    function Decorator(component) {
        this.component = component;
    }

    Decorator.prototype = Object.create(proto);

    Decorator.prototype.hello = function() {
        console.log(`Hello`);
    }

    Decorator.prototype.bye = function() {
        this.component.bye.apply(this.component, arguments);
    }

    return new Decorator(component);
}

module.exports = decorator;
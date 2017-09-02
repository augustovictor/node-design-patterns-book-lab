class Greeter {
    hello() {
        console.log('Hello from greeter');
    }

    bye() {
        console.log('Bye from greeter');
    }
};

module.exports = () => new Greeter();
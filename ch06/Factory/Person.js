class Person {
    constructor(name) {
        this._name = name;
    }
};

module.exports = (name) => {
    return new Person(name);
};
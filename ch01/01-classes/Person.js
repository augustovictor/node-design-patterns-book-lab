class Person {
    constructor(name, lastName) {
        this.name     = name;
        this.lastName = lastName;
    }

    get fullName() {
        return this.name + ' ' + this.lastName;
    }

    set fullName(fullName) {
        this.name = fullName.split(' ')[0];
        this.lastName = fullName.split(' ')[1];
    }
    
}

const p = new Person('victor', 'augusto');
// const p2 = Person('lero', 'biruta');
p.fullName = 'Victor 2';
console.log(p.fullName);
// console.log(p2.fullName);
const fnArgs = require('parse-parse-fn-args');

module.exports = () => {
    const dependencies = {};
    const factories    = {};
    const diContainer  = {};


    diContainer.register = (name, dep) => {
        dependencies[name] = dep;
    }
    
    diContainer.factory = (name, factory) => {
        factories[name] = factory;
    };

    diContainer.get = (name) => {
        if (!dependencies[name]) {
            const factory = factories[name];
            dependencies[name] = factory && diContainer.inject(factory);
            if (!dependencies[name]) {
                throw new Error('Cannot find module: ', name);
            }
        }
        return dependencies[name];
    };

    return diContainer;
};
function decoratorAug(component) {
    
    component.yell = function() {
        console.log(`WOOHOOOO!!`);
    }
    
    return component;
}

module.exports = decoratorAug;
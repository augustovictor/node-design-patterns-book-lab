## Definitions
- Monkey patching: Modifying the existing objects at runtime to change or extend their behavior or to apply temporary fixes.
- Competitive race: When many async operations are ended as soon as one or a given number of tasks complete.

### Callback style
Continuation-passing style: Pass a result to another function through a callback received as an argument;

Direct-style: Use `return` to return a result from within a function;

Callbacks deferred with `process.nextTick()` will be processed before any other I/O. Whereas `setImmediate()` will queue the callback execution behind any I/O that is already in the queue.

#### Async lib

##### Sequential execution
- `async.series()`: Takes a list of tasks and a callback function that is invoked when all the tasks have been completed;

#### Streams
##### Approaches:
###### Spatial Efficiency
Buffered (All at once)

###### Time Efficiency
Streamed (Each part at a time)

#### Types
- Readable
    - A Readable stream represents a source of data; in Node.js, it's implemented using the Readableabstract class that is available in the stream module.
    - Non-flowing mode: Read specific a specified chunk size at a time on demand, using `.read`;
    - Flowing mode: Data is pushed to the data listener as soon as it arrives, using `.on('data', chunk => {})` listener;
- Writable
    -
- Duplex
    -
- Transform
    -

#### Operation modes
- Binary mode: Data is streamed in the form of chunks, such as buffers or strings;
- Object mode: Data is treated as a sequence of discrete objects (allowing almost any JavaScript value)

---

### Conventions
- Error first, callback last. The error returned should always be of type `Error`.
- Single Responsibility Principle (SRP): every module should have responsibility over a single functionality and that responsibility should be entirely encapsulated by the module.

### Best Practices
- Always use `process.on('uncaughtException' err => { /* logging */ process.exit(1) }`;

### Export Patterns
#### Revealing modules pattern
Self-invoking function that exports only the parts meant to be public.

#### Module definition patterns
Patterns for defining modules. Each one has its own balance of information hiding, extensibility, and code reuse.

##### Name exports
This pattern is the only one that is really compatible with the CommonJS specification.

```js
//file logger.js
exports.info = (message) => {
    console.log('info: ' + message);
};
```

```js
// main.js
const logger = require('./logger');
logger.info('This is an informational message');
```

---

##### Substack pattern
Exposes the main functionality of a module by exporting only one function. Use the exported function as namespace to expose any auxiliary functionality.

```js
//file logger.js
module.exports = (message) => {
    console.log('info: ' + message);
};

module.exports.error = (message) => {
    console.log('error: ' + message);
};
```

```js
// main.js
const logger = require('./logger');
logger('This is an informational message');
logger.error('This is an error message');
```

##### Exporting a constructor
```js
 //file logger.js
class Logger {
    constructor(name) {
        this.name = name;
    }
    log(message) {
        console.log(`[${this.name}] ${message}`);
    }
    info(message) {
        this.log(`info: ${message}`);
    }
    verbose(message) {
        this.log(`verbose: ${message}`);
    } 
}
module.exports = Logger;
```

```js
//file main.js
const Logger = require('./logger');
const dbLogger = new Logger('DB');
dbLogger.info('This is an informational message');
```

##### Exporting an instance
Define stateful instances with a state created from a constructor or a factory, which can be shared across different modules. It might seem like a singleton but it does not guarantee the uniqueness of the instance across the entire application. If this module is instaled in multiple dependencies of the application it would have multiple instances.

```js
//file logger.js
function Logger(name) {
    this.count = 0;
    this.name = name;
}
Logger.prototype.log = function(message) {
    this.count++;
    console.log('[' + this.name + '] ' + message);
};
module.exports = new Logger('DEFAULT');
```

```js
//file main.js
const logger = require('./logger');
logger.log('This is an informational message');
// [DEFAULT] This is an informational message
```

### Design Patterns

#### Observer
Defines an object (called subject), which can notify a set of observers (or listeners), when a change in its state happens. For this we'd use `EventEmitter` class which comes with two methods:
- `on(event, listener)`: Register a listener for given event;
- `once(event, listener)`: Register a listener that is removed after event is emitted for the first time;
- `emit(event, [arg1], [...])`: Emits an event with given args;
- `removeListener(event, listener)`: Removes a listener from specified event type;

PS: All methods return the `EventEmitter` instance to allow chaining.

Emitter vs Callback: callbacks should be used when a result must be returned in an asynchronous way; events should instead be used when there is a need to communicate that something has just happened.

---

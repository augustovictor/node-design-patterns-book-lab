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

### Async code options
##### Plain JavaScript
**Pros**
- Does not require any additional libraries or technology
- Offers the best performance
- Provides the best level of compatibility with third-party libraries
- Allows the creation of ad hoc and more advanced algorithms
**Cons**
- Might require extra code and relatively complex algorithms

##### Async (library)
**Pros**
- Simplifies the most common control flow patterns
- Is still a callback-based solution
- Good performance
**Cons**
- Introduces an external dependency
- Might still not be enough for advanced flows

##### Promises
**Pros**
- Greatly simplifies the most common control flow patterns
- Robust error handling
- Part of the ES2015 specification
- Guarantees deferred invocation of onFulfilled and onRejected
**Cons**
- Requires promisify callback-based APIs
- Introduces a small performance hit

##### Generators
**Pros**
- Makes non-blocking API look like a blocking one
- Simplifies error handling
- Part of ES2015 specification
**Cons**
- Requires a complementary control flow library
- Still requires callbacks or promises to implement non-sequential flows
- Requires thunkify or promisify nongenerator-based APIs

##### Async await
**Pros**
- Makes non-blocking API look like blocking
- Clean and intuitive syntax
**Cons**
- Not yet available in JavaScript and Node.js natively
- Requires Babel or other transpilers and some configuration to be used today

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

#### Factory
Definition: A generic interface for creating objects. It allows us to separate the object creation from its implementation.

#### Revealing Constructor

#### Proxy
A proxy is an object that controls access to another object, called a subject. The proxy and
the subject have an identical interface and this allows us to transparently swap one for the
other; in fact, the alternative name for this pattern is surrogate.

Involves wrapping actual instances of the subject, thus preserving its state.

Use cases:
- Data validation: The proxy validates the input before forwarding it to the subject
Security: The proxy verifies that the client is authorized to perform the operation
and it passes the request to the subject only if the outcome of the check is positive
- Caching: The proxy keeps an internal cache so that the operations are executed
on the subject only if the data is not yet present in the cache
- Lazy initialization: If the creation of the subject is expensive, the proxy can delay
it to when it's really necessary
- Logging: The proxy intercepts the method invocations and the relative
parameters, recoding them as they happen
- Remote objects: A proxy can take an object that is located remotely, and make it
appear local

Approaches:
- Object Composition: Composition is a technique whereby an object is combined with another object for the purpose of extending or using its functionality.
- Object Augmentation: Object augmentation (or monkey patching) consists of modifying the subject directly by replacing a method with its proxied implementation.

#### Decorator
Used to add functionallity to an object instance. We can do it either by composition or augmenting.

---

#### Observer
Defines an object (called subject), which can notify a set of observers (or listeners), when a change in its state happens. For this we'd use `EventEmitter` class which comes with two methods:
- `on(event, listener)`: Register a listener for given event;
- `once(event, listener)`: Register a listener that is removed after event is emitted for the first time;
- `emit(event, [arg1], [...])`: Emits an event with given args;
- `removeListener(event, listener)`: Removes a listener from specified event type;

PS: All methods return the `EventEmitter` instance to allow chaining.

Emitter vs Callback: callbacks should be used when a result must be returned in an asynchronous way; events should instead be used when there is a need to communicate that something has just happened.

---

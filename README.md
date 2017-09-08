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

#### Adapter
Allows us to access the functionality of an object using a different interface.
Operations of the Adapter can also be a composition of one or more method invocations on the Adaptee.

#### Strategy
The Strategy pattern enables an object, called the Context, to support variations in its logic by extracting the variable parts into separate, interchangeable objects called Strategies. The context implements the common logic of a family of algorithms, while a strategy implements the mutable parts, allowing the context to adapt its behavior depending on different factors such as an input value, a system configuration, or user preferences.

Approaches might have been the following:
- Creating two different strategy families: one for the deserialization and the other for the serialization. This would have allowed reading from a format and saving into another.
- Dynamically selecting the strategy, depending on the extension of the file provided; the Config object could have maintained a map extension->strategy and used it to select the right algorithm for the given extension.

#### State
State is a variation of the Strategy pattern where the strategy changes depending on the state of the context. We have seen in the previous section how a strategy can be selected based on different variables such as user preferences, a configuration parameter, and the input provided, and once this selection is done, the strategy stays unchanged for the rest of the lifespan of the context.

#### Template
It has a lot in common with `Strategy`.
Template consists of defining an abstract pseudo class that represents the skeleton of an algorithm, where some of its steps are left undefined. Subclasses can then fill the gaps in the algorithm by implementing the missing steps, called template methods.

While Strategy allows us to do it dynamically and possibly at runtime, with Template the complete algorithm is determined the moment the concrete class is defined.

#### Middleware
Works the same way Chain of Responsibility pattern does.

The essential component of the pattern is the Middleware Manager, which is responsible for organizing and executing the middleware functions.

There is no strict rule on how the data is processed and propagated in the pipeline. The strategies include:
- Augmenting the data with additional properties or functions;
- Replacing the data with the result of some kind of processing;
- Maintaining the immutability of the data and always returning fresh copies as result of processing;

#### Command
We can consider a Command as any object that encapsulates all the information necessary to perform an action at a later time. So, instead of invoking a method or a function directly, we create an object representing the intention to perform such an invocation; it will then be the responsibility of another component to materialize the intent, transforming it into an actual action.

The typical organization of the Command pattern can be described as follows:
- Command: This is the object encapsulating the information necessary to invoke a method or function.
- Client: This creates the command and provides it to the Invoker.
- Invoker: This is responsible for executing the command on the target.
- Target (or Receiver): This is the subject of the invocation. It can be a lone function or the method of an object.

Advantages:
- A command can be scheduled for execution at a later time.
- A command can be easily serialized and sent over the network. This simple property allows us to distribute jobs across remote machines, transmit commands from the browser to the server, create RPC systems, and so on.
- Commands make it easy to keep a history of all the operations executed on a system.
- Commands are an important part of some algorithms for data synchronization and conflict resolution.
- A command scheduled for execution can be cancelled if it's not yet executed. It can also be reverted (undone), bringing the state of the application to the point before the command was executed.
- Several commands can be grouped together. This can be used to create atomic transactions or to implement a mechanism whereby all the operations in the group are executed at once.
- Different kinds of transformation can be performed on a set of commands, such as duplicate removal, joining and splitting, or applying more complex algorithms such as Operational Transformation (OT), which is the base for most of today's real-time collaborative software, such as collaborative text editing.

#### Observer
Defines an object (called subject), which can notify a set of observers (or listeners), when a change in its state happens. For this we'd use `EventEmitter` class which comes with two methods:
- `on(event, listener)`: Register a listener for given event;
- `once(event, listener)`: Register a listener that is removed after event is emitted for the first time;
- `emit(event, [arg1], [...])`: Emits an event with given args;
- `removeListener(event, listener)`: Removes a listener from specified event type;

PS: All methods return the `EventEmitter` instance to allow chaining.

Emitter vs Callback: callbacks should be used when a result must be returned in an asynchronous way; events should instead be used when there is a need to communicate that something has just happened.

---

### Writing modules

Dependency: Any entity, state, or data format that affects the behavior or structure of a component;

#### Patterns:

##### Hardcoded dependency
Generates an intuitive organiation and it is easy to understand and debug.
Most disadvantages of using hardcoded dependency are associated with stateful instances.
It makes it difficult to unit test.

##### Dependency injection
Here the dependencies wiring responsability were shifted from `bottom-up`, to the `top` only.
Dependencies of a component being provided as input by external entity.
This pattern improves decoupling, specially for modules depending on stateful instances.
Thus the module can be configured to use any dependency, and therefore reused in different contexts.

Steps:
1. Load factories, which at this point are still stateless objects;
1. Instantiate each component by providing required dependencies. Here all modules are created and wired;

Types of DI:
- Constructor injection: Dependencies are passed to a constructor at its creation.
    - E.g., `const service = new Service(depA, depB, depC);`
- Property injection: Dependencies are attached to an object after its creation.
    - E.g., `const service = new Service();` `service.depA = DepA; service.depB = DepB;`
    - This is less robuts but we may need it in case there depA needs the existence of depB for example.

##### Service locator
Its core principle is to have a central registry in order to manage components and act as a mediator whenever a module needs to load a dependency.

Each component loads its dependencies explicitly from the `serviceLocator` itself.
Obs: When using `DI container`, the component has no knowledge of the container.
Noticeable difference between the two approaches:
- Reusability: A component relying on a `serviceLocator` is less reusable because it requires a `serviceLocator` to be available in the system;
- Readability: A `serviceLocator` obfuscates the dependency requirements of a component;

There are 3 types of service locator to wire components:
- Hardcoded dependency on service locator: `require(depA)`;
- Injected service locator: Referenced by a component through DI (More convenient way of injecting many dependencies at once);
- Global service locator: Same as `hardcoded`, but a real `singleton`;

##### Dependency injection containers

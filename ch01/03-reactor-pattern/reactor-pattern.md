Heart of asynchronous nature of node.

### IO patterns:
- Busy-waiting: Pool a resource within a loop until some data is returned;
- Synchronous event demultiplexer: This component collects and queues I/O events that come from a set of watched resources, and block until new events are available to process.

The asynchronous behavior is now clear: the application expresses the interest to access a resource at one point in time (without blocking) and provides a handler, which will then be invoked at another point in time when the operation completes.
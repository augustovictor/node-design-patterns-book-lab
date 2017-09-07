const statusUpdateService = require('./statusUpdateService');
const createSendStatusCmd = require('./command');
const Invoker = require('./Invoker');

const invoker = Invoker();
const command = createSendStatusCmd(statusUpdateService, 'Hello!!!');
invoker.run(command);
// invoker.delay(command, 5000); // Schedulling
invoker.undo();
// invoker.runRemotely(command);
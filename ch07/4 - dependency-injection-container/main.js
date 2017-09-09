const app = require('express')();
const diContainer = require('./diContainer')();

diContainer.register('dbName', 'db-example');
diContainer.register('tokenSecret', 'CHANGE-TOKEN');

diContainer.factory('db', require('./db'));
diContainer.factory('authService', require('./authService'));
diContainer.factory('authController', require('./authController'));

const authController = diContainer.get('authController');

app.get('/login', authController.login);

app.listen(3000);
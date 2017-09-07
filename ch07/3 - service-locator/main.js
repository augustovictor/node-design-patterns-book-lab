const app = require('express')();

const serviceLocator = require('./serviceLocator')();

serviceLocator.register('dbName', 'db-example');
serviceLocator.register('tokenSecret', 'CHANGE-SECRET');
serviceLocator.factory('db', require('./db'));
serviceLocator.factory('authService', require('./authService'));
serviceLocator.factory('authController', require('./authController'));

const authController = serviceLocator.get('authController');

app.get('/login', authController.login);

app.listen(3000);
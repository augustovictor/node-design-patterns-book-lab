const app = require('express')();

const dbFactory = require('./db');
const authServiceFactory = require('./authService');
const authControllerFactory = require('./authController');

const db = dbFactory('db-example');
const authService = authServiceFactory(db, 'CHANGE-TOKEN');
const authController = authControllerFactory(authService);

app.get('/login', authController.login);

app.listen(3000);
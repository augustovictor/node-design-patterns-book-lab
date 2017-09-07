const express = require('express');
const authController = require('./authController');

const app = express();

app.post('/login', authController.login);
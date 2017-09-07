const db = require('./db');
const users = db.sublevel('users');

const tokenSecret = 'CHANGE-TOKEN';

exports.login = (username, password, cb) => {
    users.get(username, function (err, user) {
        
    });
};

exports.checkToken = (token, cb) => {
    users.get(userData.username, function (err, user) {
        
    })
};
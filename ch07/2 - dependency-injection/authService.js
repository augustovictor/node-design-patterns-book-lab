module.exports = (db, token) => {
    const users = db.sublevel('users');
    const authService = {};

    authService.login = (username, password, cb) => {
        users.get(username, function (err, user) {
            
        });
    };
    
    authService.checkToken = (token, cb) => {
        users.get(userData.username, function (err, user) {
            
        })
    };

    return authService;
};

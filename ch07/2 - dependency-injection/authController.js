const authService = require('./authService');

module.exports = (authService) => {
    const authController =  {};
    
    authController.login = (req, res, next) => {
        authService.login(req.body.username, req.body.password, (err, result) => {
    
        });
    };
    
    authController.checkToken = (req, res, next) => {
        authService.checkToken(req.body.token, (err, result) => {
    
        });
    };

    return authController;
};

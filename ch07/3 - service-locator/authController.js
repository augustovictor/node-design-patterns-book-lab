module.exports = (serviceLocator) => {
    const authService = serviceLocator.get('authService');
    const authController =  {};
    
    authController.login = (req, res, next) => {
        return res.end();
        authService.login(req.body.username, req.body.password, (err, result) => {
    
        });
    };
    
    authController.checkToken = (req, res, next) => {
        authService.checkToken(req.body.token, (err, result) => {
    
        });
    };

    return authController;
};

const ErrorHandler = require('../errors/error-handler.js');
const authService = require('../services/AuthService');

const register = async (req, res, next) => {
    try {
        const { token, newUser: user, error } = await authService.register(req.body);
        if (error) return next(new ErrorHandler(error.message, error.statusCode));

        const { password, ...others } = user._doc;
        res.json({ message: 'Excellent process', user: others, token });
    } catch (error) {
        return next(new ErrorHandler('Internal servel error', 500));
    }
};

const login = async (req, res, next) => {
    try {
        const { token, user, error } = await authService.login(req.body);
        if (error) return next(new ErrorHandler(error.message, error.statusCode));
        const { password, ...others } = user._doc;

        res.json({ message: 'Login success!', user: others, token });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server errror,', 500));
    }
};

module.exports = {
    register,
    login,
};

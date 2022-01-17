const { date } = require('joi');
const ErrorHandler = require('../errors/error-handler.js');
const userService = require('../services/UserService');

const changeUser = async (req, res, next) => {
    try {
        const { updateUser, error } = await userService.changeUser(req.params.id, req.body);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }
        res.json({ updateUser });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error'));
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { error, message } = await userService.deleteUser(req.params.id);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }
        res.json({ message });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error', 500));
    }
};

const getUser = async (req, res, next) => {
    try {
        const { error, user } = await userService.getUser(req.params.id);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }

        const { password, ...others } = user._doc;

        res.json({ user: others });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error', 500));
    }
};

const getAllUser = async (req, res, next) => {
    const query = req.query.new;
    try {
        const { message, error, users } = await userService.getAllUser(query);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        } else if (message) {
            return res.json({ message });
        }
        return res.json({ users });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error', 500));
    }
};

const statsUser = async (req, res, next) => {
    try {
        const data = await userService.getStatsUser();
        if (data.error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }
        return res.json({ data });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Internal server error', 500));
    }
};

module.exports = {
    changeUser,
    deleteUser,
    getUser,
    getAllUser,
    statsUser,
};

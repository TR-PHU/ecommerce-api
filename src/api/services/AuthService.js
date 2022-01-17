const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errors/error-handler.js');
const User = require('../models/User');

const register = async (body) => {
    const { username, email, password } = body;
    try {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return {
                error: {
                    message: 'User is exist',
                    statusCode: 400,
                },
            };
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        const token = jwt.sign(
            { userId: newUser._id, isAdmin: newUser.isAdmin },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '3d',
            }
        );
        return { newUser, token };
    } catch (error) {
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const login = async (body) => {
    const { username, password } = body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return {
                error: {
                    message: "User doesn't exist.",
                    statusCode: 400,
                },
            };
        }
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return {
                error: {
                    message: 'Wrong crendentials.',
                    statusCode: 401,
                },
            };
        }
        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: '3d' }
        );
        return { token, user };
    } catch (error) {
        console.log(error);
        return new ErrorHandler('Internal server error');
    }
};

module.exports = {
    register,
    login,
};

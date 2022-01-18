const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errors/error-handler.js');
const User = require('../models/User');
const { sendResetLink } = require('../../common/emails/sendMail');

const { v4: uuidv4 } = require('uuid');
const bcryptjs = require('bcryptjs');

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

const forgetPassword = async (email) => {
    try {
        let info = await sendResetLink(email, uuidv4());

        return {
            meesageId: info.messageId,
            statusCode: 200,
            message: 'Send success',
        };
    } catch (error) {
        throw new ErrorHandler(error.message, 500);
    }
};

const resetPassword = async (userId, token, newPassword) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);
        const user = await User.findOneAndUpdate(
            { _id: userId, resetToken: token },
            { password: hashPassword },
            { new: true }
        );
        const { password, ...others } = user._doc;
        return {
            user: others,
            statusCode: 200,
            message: 'Reset password success',
        };
    } catch (error) {
        throw new ErrorHandler(error.message, 500);
    }
};
module.exports = {
    register,
    login,
    forgetPassword,
    resetPassword,
};

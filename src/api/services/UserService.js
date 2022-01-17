const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const ErrorHandler = require('../errors/error-handler');

const changeUser = async (id, body) => {
    try {
        const { username, password, email } = body;
        const user = await User.findOne({ username });
        if (user) {
            return {
                error: {
                    statusCode: 400,
                    message: 'Username is exist!',
                },
            };
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const updateUser = await User.findByIdAndUpdate(
            id,
            { password: hashPassword, username, email },
            { new: true }
        );
        return { updateUser };
    } catch (error) {
        console.log(error);
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const deleteUser = async (id) => {
    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return {
                error: {
                    statusCode: 400,
                    message: 'Not found user',
                },
            };
        }
        const deletedUser = await User.deleteOne({ _id: id }, { new: true });
        return {
            message: 'User has been deleted...',
        };
    } catch (error) {
        console.log(error);
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const getUser = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return {
                error: {
                    message: `Not found user with id ${id}`,
                    statusCode: 400,
                },
            };
        }
        return { user };
    } catch (error) {
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const getAllUser = async (query) => {
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(1) : await User.find();
        if (!users) {
            return {
                message: 'List user is empty',
            };
        }
        return { users };
    } catch (error) {
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const getStatsUser = async () => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: '$createdAt' } } },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 },
                },
            },
        ]);
        return data;
    } catch (error) {
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

module.exports = {
    changeUser,
    deleteUser,
    getUser,
    getAllUser,
    getStatsUser,
};

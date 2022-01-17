const Cart = require('../models/Cart');
const Order = require('../models/Order');

const createOrder = async (body) => {
    try {
        const newOrder = new Order(body);
        await newOrder.save();
        console.log(newOrder);
        return { newOrder };
    } catch (error) {
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const updateOrder = async (id, body) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { $set: body }, { new: true });
        return {
            updatedOrder,
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

const deleteOrder = async (id) => {
    try {
        const deletedOrder = await Order.deleteOne({ _id: id }, { new: true });
        if (!deletedOrder) {
            return {
                error: {
                    statusCode: 400,
                    message: 'Not found order',
                },
            };
        }
        return {
            message: 'Order has been deleted...',
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

const getOrder = async (id) => {
    try {
        const carts = await Order.find({ userId: id });
        if (!carts) {
            return {
                error: {
                    message: `Not found product`,
                    statusCode: 400,
                },
            };
        }
        return { carts };
    } catch (error) {
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const getAllOrder = async () => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        if (!orders) {
            return {
                message: 'List Order is empty',
            };
        }
        return {
            orders,
        };
    } catch (error) {
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const getStatsOrder = async () => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            { $project: { month: { $month: '$createdAt' }, sales: '$amount' } },
            { $group: { _id: '$month', total: { $sum: '$sales' } } },
        ]);
        return income;
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
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getAllOrder,
    getStatsOrder,
};

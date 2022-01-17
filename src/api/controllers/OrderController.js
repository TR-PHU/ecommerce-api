const ErrorHandler = require('../errors/error-handler');

const orderService = require('../services/OrderService');

const createOrder = async (req, res, next) => {
    try {
        const { newOrder, error } = await orderService.createOrder(req.body);
        if (error) return next(new ErrorHandler(error.message, error.statusCode));

        res.json({ newOrder });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Internal server error', 500));
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const { updatedOrder, error } = await orderService.updateOrder(req.params.id, req.body);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }
        res.json({ updatedOrder });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error'));
    }
};

const deleteOrder = async (req, res, next) => {
    try {
        const { error, message } = await orderService.deleteOrder(req.params.id);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }
        res.json({ message });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error'));
    }
};

const getOrder = async (req, res, next) => {
    try {
        const { error, carts } = await orderService.getOrder(req.params.id);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }

        res.json({ carts });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error', 500));
    }
};

const getAllOrder = async (req, res, next) => {
    try {
        const { error, message, orders } = await orderService.getAllOrder();
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        } else if (message) {
            return res.json({ message });
        }
        return res.json({ orders });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error', 500));
    }
};

const getStats = async (req, res, next) => {
    try {
        const income = await orderService.getStatsOrder();
        if (income.error) {
            return next(new ErrorHandler(income.error.message, income.error.statusCode));
        }
        return res.json({ income });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error', 500));
    }
};

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getAllOrder,
    getStats,
};

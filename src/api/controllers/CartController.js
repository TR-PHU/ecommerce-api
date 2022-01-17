const ErrorHandler = require('../errors/error-handler');

const cartService = require('../services/CartService');

const createCart = async (req, res, next) => {
    try {
        const { newCart, error } = await cartService.createCart(req.body);
        if (error) return next(new ErrorHandler(error.message, error.statusCode));

        res.json({ newCart });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Internal server error', 500));
    }
};

const updateCart = async (req, res, next) => {
    try {
        const { updatedCart, error } = await cartService.updateCart(req.params.id, req.body);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }
        res.json({ updatedCart });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error'));
    }
};

const deleteCart = async (req, res, next) => {
    try {
        const { error, message } = await cartService.deleteProduct(req.params.id);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }
        res.json({ message });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error'));
    }
};

const getCart = async (req, res, next) => {
    try {
        const { error, cart } = await cartService.getCart(req.params.id);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }

        res.json({ cart });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error', 500));
    }
};

const getAllCart = async (req, res, next) => {
    try {
        const { error, message, products } = await cartService.getAllCart();
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        } else if (message) {
            return res.json({ message });
        }
        return res.json({ products });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error', 500));
    }
};

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCart,
    getAllCart,
};

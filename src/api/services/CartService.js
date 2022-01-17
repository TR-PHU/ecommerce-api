const Cart = require('../models/Cart');

const createCart = async (body) => {
    try {
        const newCart = new Cart(body);
        await newCart.save();
        console.log(newCart);
        return { newCart };
    } catch (error) {
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const updateCart = async (id, body) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(id, { $set: body }, { new: true });
        return {
            updatedCart,
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

const deleteCart = async (id) => {
    try {
        const deletedCart = await Cart.deleteOne({ _id: id }, { new: true });
        if (!deletedCart) {
            return {
                error: {
                    statusCode: 400,
                    message: 'Not found cart',
                },
            };
        }
        return {
            message: 'Cart has been deleted...',
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

const getCart = async (id) => {
    try {
        const cart = await Cart.findOne({ userId: id });
        if (!cart) {
            return {
                error: {
                    message: `Not found product`,
                    statusCode: 400,
                },
            };
        }
        return { cart };
    } catch (error) {
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const getAllCart = async () => {
    try {
        const carts = await Cart.find().sort({ createdAt: -1 });
        if (!carts) {
            return {
                message: 'List cart is empty',
            };
        }
        return {
            carts,
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

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCart,
    getAllCart,
};

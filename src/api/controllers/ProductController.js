const ErrorHandler = require('../errors/error-handler');
const productService = require('../services/ProductService');

const createProduct = async (req, res, next) => {
    try {
        const { newProduct, error } = await productService.createProduct(req.body);
        console.log(error);

        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }
        res.json({ message: 'Add product success!', newProduct });
    } catch (error) {
        console.log(error);
    }
};

const changeProduct = async (req, res, next) => {
    try {
        const { updateProduct, error } = await productService.changeProduct(
            req.params.id,
            req.body
        );
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }
        res.json({ updateProduct });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error'));
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { error, message } = await productService.deleteProduct(req.params.id);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }
        res.json({ message });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error', 500));
    }
};

const getProduct = async (req, res, next) => {
    try {
        const { error, product } = await productService.getProduct(req.params.id);
        if (error) {
            return next(new ErrorHandler(error.message, error.statusCode));
        }

        res.json({ product });
    } catch (error) {
        console.log(error);
        next(new ErrorHandler('Internal server error', 500));
    }
};

const getAllProduct = async (req, res, next) => {
    const qNew = req.query.new;
    const qCategories = req.query.category;
    try {
        const { message, error, products } = await productService.getAllProduct(qNew, qCategories);
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
    createProduct,
    changeProduct,
    deleteProduct,
    getProduct,
    getAllProduct,
};

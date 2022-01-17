const Product = require('../models/Product');

const createProduct = async (body) => {
    const { title, description, img, categories, size, price } = body;
    try {
        const product = await Product.findOne({ title });
        if (product) {
            return {
                error: {
                    message: 'Product is exists',
                    statusCode: 400,
                },
            };
        }

        const newProduct = new Product({ title, description, img, categories, size, price });
        await newProduct.save();
        console.log(newProduct);
        return { newProduct };
    } catch (error) {
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const changeProduct = async (id, body) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, { $set: body }, { new: true });
        return {
            updateProduct,
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
const deleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.deleteOne({ _id: id }, { new: true });
        if (!deletedProduct) {
            return {
                error: {
                    statusCode: 400,
                    message: 'Not found product',
                },
            };
        }
        return {
            message: 'Product has been deleted...',
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

const getProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                error: {
                    message: `Not found product`,
                    statusCode: 400,
                },
            };
        }
        return { product };
    } catch (error) {
        return {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        };
    }
};

const getAllProduct = async (qNew, qCategory) => {
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({ categories: { $in: [qCategory] } });
        } else {
            products = await Product.find();
        }
        if (!products) {
            return {
                message: 'List product is empty',
            };
        }
        return { products };
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
    createProduct,
    changeProduct,
    deleteProduct,
    getProduct,
    getAllProduct,
};

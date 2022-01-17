const authRoute = require('./auth');
const userRoute = require('./user');
const productRoute = require('./product');
const cartRoute = require('./cart');
const orderRoute = require('./order');

const route = (app) => {
    app.use('/api/auth', authRoute);
    app.use('/api/users', userRoute);
    app.use('/api/products', productRoute);
    app.use('/api/carts', cartRoute);
    app.use('/api/orders', orderRoute);
};

module.exports = route;

require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./src/api/config-db/index');
const route = require('./src/api/routes');
const ErrorHandler = require('./src/api/errors/error-handler.js');
const PORT = 5000 || process.env.PORT;
connectDB();
app.use(express.json());
route(app);

app.get('/', (req, res, next) => {
    res.send('Hello world!');
});

app.use((req, res, next) => {
    const err = new ErrorHandler('Not found', 404);
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        err: {
            statusCode: err.statusCode || 500,
            message: err.message,
        },
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

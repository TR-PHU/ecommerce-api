const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errors/error-handler.js');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            err: {
                statusCode: 401,
                message: 'You are not authenticated!',
            },
        });
    }
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodeToken) {
        return res.status(403).json({
            err: {
                statusCode: 403,
                message: 'Token is not valid!',
            },
        });
    }

    req.user = decodeToken;
    next();
};

const verifyAuthorization = (req, res, next) => {
    if (req.user.userId === req.params.id || req.user.isAdmin) {
        return next();
    }

    return res.status(403).json({
        err: {
            statusCode: 403,
            message: "You aren't allowed to do that!",
        },
    });
};
const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({
        err: {
            statusCode: 403,
            message: "You aren't allowed to do that!",
        },
    });
};

module.exports = {
    verifyToken,
    verifyAuthorization,
    verifyAdmin,
};

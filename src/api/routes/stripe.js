const ErrorHandler = require('../errors/error-handler');

const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/payment', (req, res, next) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: 'usd',
        },
        (stripeErr, stripRes) => {
            if (stripeErr) {
                return next(new ErrorHandler('Internal server error', 500));
            }
            return res.json(stripRes);
        }
    );
});

module.exports = router;

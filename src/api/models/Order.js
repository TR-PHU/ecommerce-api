const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        amount: {
            type: String,
            required: true,
        },
        address: {
            type: Object,
        },
        status: {
            type: String,
            default: 'Pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);

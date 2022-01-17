const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(this.password, salt);
        this.password = hashPassword;
    } catch (error) {
        console.log(error);
        next(new Error('Internal server error'));
    }
});

UserSchema.methods.isValidPassword = async function (inputPass) {
    try {
        return await bcryptjs.compare(inputPass, this.password);
    } catch (error) {
        console.log(error);
        throw new Error('Internal server error');
    }
};

module.exports = mongoose.model('User', UserSchema);

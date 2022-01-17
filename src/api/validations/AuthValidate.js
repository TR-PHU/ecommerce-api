const Joi = require('joi');

const authValidate = (schema) => (req, res, next) => {
    const result = schema.validate(req.body);

    if (result.error) {
        return res.status(400).json({ message: result.error.details[0].message });
    }
    next();
};

const schema = {
    register: Joi.object({
        username: Joi.string().alphanum().min(3).max(15).required(),
        email: Joi.string().email().min(10).required(),
        password: Joi.string().min(5).required(),
    }),
    login: Joi.object({
        username: Joi.string().alphanum().min(3).max(15).required(),
        password: Joi.string().min(5).required(),
    }),
    changeUser: Joi.object({
        username: Joi.string().alphanum().min(3).max(15),
        email: Joi.string().email().min(10),
        password: Joi.string().min(5),
    }),
};

module.exports = {
    authValidate,
    schema,
};

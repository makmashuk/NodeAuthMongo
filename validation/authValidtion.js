const Joi = require('@hapi/joi');

const registerValidation = (data) => {

    const loginSchema =Joi.object({
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required(),
    });
    return loginSchema.validate(data);

};

module.exports.registerValidation=registerValidation;
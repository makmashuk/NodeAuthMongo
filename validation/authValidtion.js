const Joi = require('@hapi/joi');

const registerValidation = (data) => {

    const registrationSchema =Joi.object({
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required(),
    });
    return registrationSchema.validate(data);

};

const loginValidation = (data) => {
    const loginScema = Joi.object({
        userEmail:Joi.string().min(6).required().email(),
        userPassword:Joi.string().min(6).required()
    });
    return loginScema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
const Joi = require("joi");

class User{
    constructor(user){
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.age = user.age;
        this.phone = user.phone;
    }

    static #validationSchemaPost = Joi.object({
        id: Joi.allow(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        age: Joi.number().required().min(0).max(120),
        phone: Joi.string().required().min(2).max(50)
    });

    static #validationSchemaPut = Joi.object({
        id: Joi.number().required(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        age: Joi.number().required().min(0).max(120),
        phone: Joi.string().required().min(2).max(50)
    });

    validatePost(){
        const result = User.#validationSchemaPost.validate(this, {abortEarly: false});
        return result.error ? result.error.details.map(err => err.message) : null;
    }

    validatePut(){
        const result = User.#validationSchemaPut.validate(this, {abortEarly: false});
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports = User;
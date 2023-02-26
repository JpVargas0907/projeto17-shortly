import joi from 'joi';

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
})
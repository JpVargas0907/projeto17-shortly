import joi from "joi";

export const signInSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
});

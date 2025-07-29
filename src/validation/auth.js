import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(20).required(),
});

export const logInUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(20).required(),
});

export const requestResetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(7).max(20).required(),
  token: Joi.string().required(),
});

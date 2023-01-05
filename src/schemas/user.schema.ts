import * as Joi from 'joi';

const regName = new RegExp('(?![ .]+$)[a-zA-Z .]*$');
const regPassword = new RegExp('^[a-zA-Z0-9]{8,30}$');
const emailDomains = ['com', 'mx', 'io', 'net'];

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(90).pattern(regName).required(),
  password: Joi.string()
    .pattern(regPassword)
    .required()
    .messages({ 'string.pattern.base': 'password is not strong enough' }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: emailDomains },
    })
    .required(),
});

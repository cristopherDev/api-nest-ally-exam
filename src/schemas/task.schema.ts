import * as Joi from 'joi';

export const taskSchema = Joi.object({
  task: Joi.string().required(),
  userId: Joi.number().required(),
});

import * as Joi from 'joi';

export const taskSchema = Joi.object({
  task: Joi.string().required(),
  user_id: Joi.number().positive().required(),
});

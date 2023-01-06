import * as Joi from 'joi';

export const tasksUser = Joi.object({
  user_id: Joi.number().positive().required(),
});

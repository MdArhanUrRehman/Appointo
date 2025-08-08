import Joi from "joi";

const userSchemaValidate = () =>
  Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(5)
      .required(),
});

export default userSchemaValidate;
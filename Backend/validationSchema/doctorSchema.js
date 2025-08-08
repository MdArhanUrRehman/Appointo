import Joi from "joi";

const doctorSchemaValidate = () =>
  Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    speciality: Joi.string().required(),
    degree: Joi.string().required(),
    experience: Joi.string().required(),
    fees: Joi.number().min(0).required(),
    address: Joi.string().required(), // fixed typo
    about: Joi.string().required(),
});

export default doctorSchemaValidate;
